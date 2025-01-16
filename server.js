const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database configuration
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid token' });
  }
};

// Auth Routes
app.post('/auth/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Check if user exists
    const userExists = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
      [username, hashedPassword]
    );

    // Generate token
    const token = jwt.sign(
      { id: newUser.rows[0].id, username },
      process.env.JWT_SECRET
    );

    res.json({ token, user: { id: newUser.rows[0].id, username } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const user = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );

    if (user.rows.length === 0) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Validate password
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    // Generate token
    const token = jwt.sign(
      { id: user.rows[0].id, username },
      process.env.JWT_SECRET
    );

    res.json({ token, user: { id: user.rows[0].id, username } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Course Routes
app.get('/courses', async (req, res) => {
  try {
    const courses = await pool.query('SELECT * FROM courses');
    res.json(courses.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/courses/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const course = await pool.query('SELECT * FROM courses WHERE id = $1', [id]);
    
    if (course.rows.length === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }
    
    res.json(course.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/courses', authenticateToken, async (req, res) => {
  try {
    const { title, description } = req.body;
    const newCourse = await pool.query(
      'INSERT INTO courses (title, description, user_id) VALUES ($1, $2, $3) RETURNING *',
      [title, description, req.user.id]
    );
    res.status(201).json(newCourse.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/courses/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    
    const course = await pool.query(
      'SELECT * FROM courses WHERE id = $1', [id]
    );
    
    if (course.rows.length === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }
    
    if (course.rows[0].user_id !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to update this course' });
    }
    
    const updatedCourse = await pool.query(
      'UPDATE courses SET title = $1, description = $2 WHERE id = $3 RETURNING *',
      [title, description, id]
    );
    
    res.json(updatedCourse.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/courses/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const course = await pool.query(
      'SELECT * FROM courses WHERE id = $1', [id]
    );
    
    if (course.rows.length === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }
    
    if (course.rows[0].user_id !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this course' });
    }
    
    await pool.query('DELETE FROM courses WHERE id = $1', [id]);
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
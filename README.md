# Course Helper

A full-stack web application for managing and discovering educational courses. Built with Next.js, Express, and PostgreSQL.

## Features

### For Users
- Browse all available courses
- Search courses by title and description
- View detailed course information
- User authentication (login/register)
- Secure access to protected features

### For Course Creators
- Create new courses with title and description
- Update existing course content
- Delete courses they've created
- Protected routes ensuring creators can only modify their own content

## Technology Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **Material UI**: Component library for modern UI design
- **Axios**: HTTP client for API requests
- **Local Storage**: For maintaining authentication state

### Backend
- **Express.js**: Node.js web application framework
- **PostgreSQL**: Relational database for data persistence
- **JWT**: JSON Web Tokens for authentication
- **bcrypt**: Password hashing for security
- **cors**: Cross-Origin Resource Sharing middleware

## Installation Guide

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm (comes with Node.js)

### Step 1: Database Setup
1. Install PostgreSQL from [official website](https://www.postgresql.org/download/)
2. During installation:
   - Remember your password
   - Keep default port (5432)
   - Install pgAdmin when prompted

### Step 2: Project Setup
```bash
# Clone the repository (if using Git)
git clone [repository-url]

# Or create new directory
mkdir coursehelper
cd coursehelper

# Initialize Node.js project
npm init -y

# Install backend dependencies
npm install express cors jsonwebtoken bcrypt pg dotenv

# Install development dependencies
npm install --save-dev nodemon

# Setup Next.js
npx create-next-app@latest . --use-npm
# Choose:
# - No to TypeScript
# - Yes to ESLint
# - No to Tailwind CSS
# - No to src/ directory
# - Yes to App Router
# - No to customize import alias

# Install frontend dependencies
npm install @mui/material @emotion/react @emotion/styled axios
```

### Step 3: Environment Setup
Create a `.env` file in the root directory:
```
DB_USER=postgres
DB_HOST=localhost
DB_NAME=coursehelper
DB_PASSWORD=your_postgres_password
DB_PORT=5432
JWT_SECRET=your_secret_key_for_jwt
```

### Step 4: Database Initialization
Using pgAdmin:
1. Open pgAdmin
2. Connect to server (password required)
3. Create new database named 'coursehelper'
4. Run the schema.sql file

Or using command line:
```bash
psql -U postgres -d coursehelper -f database/schema.sql
```

### Step 5: Running the Application
1. Start the backend server:
```bash
npm run server
```

2. In a new terminal, start the frontend:
```bash
npm run dev
```

3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## Usage Guide

### For New Users
1. Visit http://localhost:3000
2. Click "Login" in the top right
3. Choose "Register" to create a new account
4. Enter username and password
5. After registration, you'll be redirected to the home page

### For Course Creators
1. Log in to your account
2. Use the course creation form to add new courses
3. Your courses will appear in the list
4. Click on your courses to edit or delete them

### For Course Browsers
1. No account needed to browse courses
2. Use the search bar to filter courses
3. Click on any course to view full details

## Security Features
- Password hashing using bcrypt
- JWT-based authentication
- Protected routes for course modification
- CORS protection
- Environment variable configuration

## API Endpoints

### Authentication
- POST `/auth/register`: Register new user
- POST `/auth/login`: Login existing user

### Courses
- GET `/courses`: Get all courses
- GET `/courses/:id`: Get specific course
- POST `/courses`: Create new course (authenticated)
- PUT `/courses/:id`: Update course (authenticated)
- DELETE `/courses/:id`: Delete course (authenticated)

## Troubleshooting

### Common Issues

1. Database Connection Failed
```
Solution: Check if:
- PostgreSQL is running
- Database credentials are correct in .env
- Database 'coursehelper' exists
```

2. CORS Errors
```
Solution:
- Ensure backend is running
- Check frontend URL matches backend port
- Verify CORS middleware is properly configured
```

3. Authentication Issues
```
Solution:
- Clear browser localStorage
- Ensure JWT_SECRET matches in .env
- Check token expiration
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

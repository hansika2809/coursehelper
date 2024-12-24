document.addEventListener('DOMContentLoaded', () => {
    const courses = [
      {
        name: 'Data Structures',
        code: 'ES2027',
        credits: 11,
        description: 'Learn about arrays, linked lists, trees, and more.',
        image: 'app\dsa.png',
      },
      {
        name: 'Fluid Mechanics',
        code: 'ME302',
        credits: 9,
        description: 'Fundamentals of fluid mechanics and applications.',
        image: 'app\fluid.png',
      },
      {
        name: 'Introduction to Electronics',
        code: 'ES2021',
        credits: 6,
        description: 'Basics of electrical circuits and applications.',
        image: 'app\electronics.png',
      },
    ];
  
    const coursesContainer = document.getElementById('coursesContainer');
  
    // Function to render courses
    const renderCourses = () => {
      coursesContainer.innerHTML = '';
      courses.forEach((course) => {
        const courseCard = document.createElement('div');
        courseCard.classList.add('course-card');
        courseCard.innerHTML = `
          <img src="${course.image}" alt="${course.name}">
          <h3>${course.name}</h3>
          <p><strong>Code:</strong> ${course.code}</p>
          <p><strong>Credits:</strong> ${course.credits}</p>
          <p>${course.description}</p>
        `;
        coursesContainer.appendChild(courseCard);
      });
    };
  
    renderCourses();
  
    // Add Course Modal Logic
    const addCourseButton = document.getElementById('addCourseButton');
    const addCourseModal = document.getElementById('addCourseModal');
    const addCourseForm = document.getElementById('addCourseForm');
    const closeButtons = document.querySelectorAll('.close-modal');
  
    addCourseButton.addEventListener('click', () => {
      addCourseModal.style.display = 'block';
    });
  
    closeButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        modal.style.display = 'none';
      });
    });
  
    // Add Course Form Submission
    addCourseForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const newCourse = {
        name: e.target.courseName.value,
        code: e.target.courseCode.value,
        credits: parseInt(e.target.credits.value, 10),
        description: e.target.description.value,
        image: e.target.imageURL.value,
      };
      courses.push(newCourse);
      renderCourses();
      addCourseModal.style.display = 'none';
      addCourseForm.reset();
    });
  
    // Login Modal Logic
    const loginButton = document.getElementById('loginButton');
    const loginModal = document.getElementById('loginModal');
  
    loginButton.addEventListener('click', () => {
      loginModal.style.display = 'block';
    });
  });
  
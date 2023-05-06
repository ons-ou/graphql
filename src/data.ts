let users = [
    {
      id: "1",
      username: "john_doe",
      password: "password123",
      email: "john_doe@example.com",
      role: "USER"
    },
    {
      id: "2",
      username: "jane_doe",
      password: "password456",
      email: "jane_doe@example.com",
      role: "ADMIN"
    },
  ];
  
  let cvs = [
    {
      id: "1",
      name: "John's CV",
      age: 28,
      job: "Software Engineer",
      user: "1"
    },
    {
      id: "2",
      name: "John's CV 2",
      age: 30,
      job: "Senior Software Engineer",
      user: "1"
    },
    {
      id: "3",
      name: "Jane's CV",
      age: 25,
      job: "Data Scientist",
      user: "2"
    },
  ];
  
  let skills = [
    { id: "1", designation: "JavaScript" },
    { id: "2", designation: "React" },
    { id: "3", designation: "Node.js" },
    { id: "4", designation: "Python" },
    { id: "5", designation: "Java" },
    { id: "6", designation: "SQL" },
    { id: "7", designation: "Data Analysis" },
    { id: "8", designation: "Machine Learning" },
    { id: "9", designation: "Statistics" },
  ];

  let cv_skills = [
    { id: "1", cv_id: "1", skill_id: "1" },
    { id: "2", cv_id: "1", skill_id: "9" },
    { id: "3", cv_id: "1", skill_id: "3" },
    { id: "4", cv_id: "2", skill_id: "4" },
    { id: "5", cv_id: "2", skill_id: "2" },
    { id: "6", cv_id: "2", skill_id: "6" },
    { id: "7", cv_id: "3", skill_id: "7" },
    { id: "8", cv_id: "3", skill_id: "8" },
    { id: "9", cv_id: "3", skill_id: "2" },
  ]

export {users, cvs, skills, cv_skills}
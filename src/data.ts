const users = [
    {
      id: "1",
      username: "john_doe",
      password: "password123",
      email: "john_doe@example.com",
      role: "USER",
      cvs: ["1", "2"],
    },
    {
      id: "2",
      username: "jane_doe",
      password: "password456",
      email: "jane_doe@example.com",
      role: "ADMIN",
      cvs: ["3"],
    },
  ];
  
  const cvs = [
    {
      id: "1",
      name: "John's CV",
      age: 28,
      job: "Software Engineer",
      user: "1",
      skills: ["1", "2", "3"],
    },
    {
      id: "2",
      name: "John's CV 2",
      age: 30,
      job: "Senior Software Engineer",
      user: "1",
      skills: ["4", "5", "6"],
    },
    {
      id: "3",
      name: "Jane's CV",
      age: 25,
      job: "Data Scientist",
      user: "2",
      skills: ["7", "8", "9"],
    },
  ];
  
  const skills = [
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

export {users, cvs, skills}
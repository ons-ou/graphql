import { GraphQLError } from "graphql";

const getCvUser = (id: string, users: any) => {
  const user = users.find((user: any) => user.id === id);
  return user;
};

const getCvSkills = (cv: any, skills: any, cv_skills: any) => {
  console.log(cv_skills);
  const ids = cv_skills
    .filter((cv_skill: any) => cv_skill.cv_id === cv.id)
    .map((cv_skill: any) => cv_skill.skill_id);
  const cvSkills = skills.filter((skill: any) => ids.includes(skill.id));
  return cvSkills;
};

const getCvs = (data: any) => {
  const { cvs, users, skills, cv_skills } = data;
  console.log(cv_skills);
  const cvsList = cvs.map((cv: any) => {
    const user = getCvUser(cv.user, users);
    const cvSkills = getCvSkills(cv, skills, cv_skills);
    return {
      ...cv,
      user: user,
      skills: cvSkills,
    };
  });
  return cvsList;
};

const getCv = (id: string, data: any) => {
  const { cvs, users, skills, cv_skills } = data;
  let cv = cvs.find((cv: any) => cv.id === id);
  const user = getCvUser(cv.user, users);
  const cvSkills = getCvSkills(cv, skills, cv_skills);
  cv = {
    ...cv,
    user: user,
    skills: cvSkills,
  };
  return cv;
};

const setCvUser = (cv: any, users: any) => {
  if (!cv.user.username) {
    throw new GraphQLError("Invalid user object in CV.");
  }

  let i = users.findIndex((user: any) => user.username === cv.user.username);
  let user;
  if (i === -1) {
    if (!cv.user.password || !cv.user.email || !cv.user.role) {
      throw new GraphQLError("Invalid user object in CV.");
    }
    user = {
      ...cv.user,
      id: (users.length + 1).toString(),
    };
    users.push(user);
  } else {
    users[i] = {
      ...users[i],
      ...cv.user,
    };
    user = users[i];
  }
  
  return user.id;
};

const setCvSkills = (cv: any, skills: any) => {
  const cvSkills = [];
  cv.map((skill: any) => {
    let s = skills.find((s: any) => s.designation === skill.designation);
    if (!s) {
      s = {
        ...skill,
        id: (skills.length + 1).toString(),
      };
      skills.push(s);
    }
    cvSkills.push(s.id);
  });
  return cvSkills;
};

const setCv_Skills = (cv_id, cvSkills, skills, cv_skills) => {
  let skillsId = setCvSkills(cvSkills, skills);
  let i = cv_skills.length;
  
  for (let i = cv_skills.length - 1; i >= 0; i--) {
    const cv_skill = cv_skills[i];
    if (cv_skill.cv_id === cv_id && !skillsId.includes(cv_skill.skill_id)) {
      cv_skills.splice(i, 1);
    }
  }
  

  skillsId = skillsId.filter(
    (skillId) =>
      !cv_skills.find(
        (cv_skill) => cv_skill.skill_id === skillId && cv_skill.cv_id === cv_id
      )
  );
  const cv_skill = skillsId.map((skillId) => {
    i++;
    return {
      id: i.toString(),
      cv_id: cv_id,
      skill_id: skillId,
    };
  });
  return cv_skill;
};

const createCv = (cv: any, data: any) => {
  let { cvs, users, skills, cv_skills, pubsub } = data;
  const userId = setCvUser(cv, users);
  skills = setCv_Skills(
    (cvs.length + 1).toString(),
    cv.skills,
    skills,
    cv_skills
  );
  cv_skills.push(...skills);
  const newCv = {
    id: (cvs.length + 1).toString(),
    name: cv.name,
    age: cv.age,
    job: cv.job,
    user: userId,
  };

  cvs.push(newCv);
  const createdCv = getCv(newCv.id, data);
  pubsub.publish("cvCreated", createdCv);
  return getCvs(data);
};

const updateCv = (id: string, cv: any, data: any) => {
  let { cvs, users, skills, cv_skills, pubsub } = data;
  const index = cvs.findIndex((cv: any) => cv.id === id);
  if (index === -1) {
    throw new GraphQLError(`Element with id '${id}' not found.`);
  }

  const newCv = {
    id: id,
    name: cv.name ?? cvs[index].name,
    age: cv.age ?? cvs[index].age,
    job: cv.job ?? cvs[index].job,
    user: cvs[index].user,
  };

  if (cv.user) {
    const userId = setCvUser(cv, users);
    newCv.user = userId;
  }

  cvs[index] = newCv;

  if (cv.skills) {
    skills = setCv_Skills(id, cv.skills, skills, cv_skills);
    cv_skills.push(...skills);
  }
  const updatedCv = getCv(id, data);

  pubsub.publish("cvUpdated", updatedCv);
  return updatedCv;
};

const deleteCv = (id: string, data: any) => {
  let { cvs, cv_skills, pubsub } = data;
  const cvIndex = cvs.findIndex((cv) => cv.id === id);
  if (cvIndex === -1) {
    throw new GraphQLError(`Cv with ID ${id} not found.`);
  }
  const deletedCv = getCv(id, data);
  pubsub.publish("cvDeleted", deletedCv);
  cvs.splice(cvIndex, 1);
  for (let i = cv_skills.length - 1; i >= 0; i--) {
    const cv_skill = cv_skills[i];
    if (cv_skill.cv_id === id) {
      cv_skills.splice(i, 1);
    }
  }
  
  return `Cv with ID ${id} has been deleted.`;
};

export { getCvs, getCv, createCv, updateCv, deleteCv };

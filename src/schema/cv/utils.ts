import { GraphQLError } from "graphql";

const getCvUser = (id: string, users: any) => {
    const user = users.find((user: any) => user.id === id);
    return user;
};

const getCvSkills = (ids: string[], skills: any) => {
    const cvSkills = skills.filter((skill: any) => ids.includes(skill.id));
    return cvSkills;
};

const getCvs = (data:any) => {
    const { cvs, users, skills } = data;
    const cvsList = cvs.map((cv: any) => {
        const user = getCvUser(cv.user, users);
        const cvSkills = getCvSkills(cv.skills, skills);
        return {
            ...cv,
            user: user,
            skills: cvSkills,
        };
    });
    return cvsList;
};

const getCv = (id: string, data: any) => {
    const { cvs, users, skills } = data;
    const cv = cvs.find((cv: any) => cv.id === id);
    const user = getCvUser(cv.user, users);
    const cvSkills = getCvSkills(cv.skills, skills);
    return {
        ...cv,
        user: user,
        skills: cvSkills,
    };
}

const setCvUser = (cv: any, users: any) => {
    if (!cv.user.username) {
        throw new GraphQLError("Invalid user object in CV.");
    }

    let user = users.find((user: any) => user.username === cv.user.username);
    
    if (!user) {
        if (!cv.user.password || !cv.user.email || !cv.user.role) {
            throw new GraphQLError("Invalid user object in CV.");
        }
        user = {
            ...cv.user,
            id: (users.length + 1).toString(),
        };
        users.push(user);
    }
    console.log(user);
    return user.id;
}

const setCvSkills = (cv: any, skills: any) => {
    const cvSkills = []
    cv.skills.map((skill: any) => {
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
}

const createCv = (cv: any, data: any) => {
    const { cvs, users, skills } = data;
    const userId = setCvUser(cv, users);
    const skillsId = setCvSkills(cv, skills);
    const newCv = {
        id: cvs.length + 1,
        name: cv.name,
        age: cv.age,
        job: cv.job,
        user: userId,
        skills: skillsId,
    };
    cvs.push(newCv);
    return getCvs(data);
}

const updateCv = (id: string, cv: any, data: any) => {
    const { cvs, users, skills } = data;
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
        skills: cvs[index].skills,
    };
    
    if (cv.user){
        const userId = setCvUser(cv, users);
        newCv.user = userId;
    }

    if (cv.skills){
        const skillsId = setCvSkills(cv, skills);
        newCv.skills = skillsId;
    }
    cvs[index] = newCv;
    return getCv(id, data);
}

export { getCvs, getCv, createCv, updateCv };


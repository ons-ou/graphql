import { createServer } from "node:http";
import { createYoga } from "graphql-yoga";
import { schema } from "./schema";
import "reflect-metadata";
import { cv_skills, cvs, skills, users } from "./data";
import { PubSub } from "graphql-subscriptions";

const yoga = createYoga({
  schema: schema,
  context: {
    cvs: cvs,
    users: users,
    skills: skills,
    cv_skills: cv_skills,
    pubsub: new PubSub(),
  },
});

const server = createServer(yoga);

server.listen(4000, () => {
  console.info(`
Server is running on
http://localhost:4000/`);
});

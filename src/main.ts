import { createServer } from "node:http";
import { createYoga } from "graphql-yoga";
import { schema } from "./schema";
import "reflect-metadata"
import { cvs, skills, users } from "./data";

const yoga = createYoga({
  schema: schema,
  context: {
  cvs : cvs,
  users : users,
  skills: skills
},
});

const server = createServer(yoga);

server.listen(4000, () => {
  console.info(`
Server is running on
http://localhost:4000/`);
});

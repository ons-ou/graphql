import { readFileSync } from "fs";
import { join } from "path";
import { GraphQLError } from "graphql";
import { createCv, getCv, getCvs, updateCv } from "./utils";

const type = readFileSync(join(__dirname, "cv.graphql")).toString();
const query = readFileSync(join(__dirname, "query.graphql")).toString();
const mutation = readFileSync(join(__dirname, "mutation.graphql")).toString();
const input = readFileSync(join(__dirname, "input.graphql")).toString();

const resolvers = {
  Query: {
    cvs: async (_, __, context) => getCvs(context)
    ,
    cv: async (_, { id }, context) => getCv(id, context)
  },
  Mutation: {
    createCv: async (_, { input }, context) => createCv(input, context),
    updateCv: async (_, { id, input }, context) => updateCv(id, input, context)
  }
};

const cvSchema = {
  typeDefs: type + ", " + query + ", " + mutation + ", " + input,
  resolvers,
};

export default cvSchema;

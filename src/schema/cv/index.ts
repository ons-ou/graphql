import { readFileSync } from "fs";
import { join } from "path";
import { createCv, deleteCv, getCv, getCvs, updateCv } from "./utils";

const type = readFileSync(join(__dirname, "cv.graphql")).toString();
const query = readFileSync(join(__dirname, "query.graphql")).toString();
const mutation = readFileSync(join(__dirname, "mutation.graphql")).toString();
const input = readFileSync(join(__dirname, "input.graphql")).toString();
const subscription = readFileSync(
  join(__dirname, "subscription.graphql")
).toString();

const resolvers = {
  Query: {
    cvs: async (_, __, context) => getCvs(context),
    cv: async (_, { id }, context) => getCv(id, context),
  },
  Mutation: {
    createCv: async (_, { input }, context) => createCv(input, context),
    updateCv: async (_, { id, input }, context) => updateCv(id, input, context),
    deleteCv: (__, { id }, context) => deleteCv(id, context),
  },
  Subscription: {
    cvDeleted: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("cvDeleted"),
      resolve: (payload) => {
        return payload;
      },
    },
    cvUpdated: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("cvUpdated"),
      resolve: (payload) => {
        return payload;
      },
    },
    cvCreated: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("cvCreated"),
      resolve: (payload) => {
        return payload;
      },
    },
  },
};

const cvSchema = {
  typeDefs:
    type + " " + query + " " + mutation + " " + input + " " + subscription,
  resolvers,
};

export default cvSchema;

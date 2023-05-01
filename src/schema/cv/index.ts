import { readFileSync } from "fs";
import { join } from "path";
import { GraphQLError } from "graphql";
import { createCv, getCv, getCvs, updateCv } from "./utils";
import { cvs } from "../../data";

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
    updateCv: async (_, { id, input }, context) => updateCv(id, input, context),
    deleteCv: (parent, args,{pubsub}) => {
      const { id } = args;
      const cvIndex = cvs.findIndex(cv => cv.id === id);
      if (cvIndex === -1) {
        throw new Error(`Cv with ID ${id} not found.`);
      }
      pubsub.publish("cvDeleted",{cv:cvs[cvIndex]});
      cvs.splice(cvIndex, 1);
      
      return `Cv with ID ${id} has been deleted.`;
    }
  },
  Subscription: {
    cvDeleted: {
      subscribe: (parent,{pubsub},info) => {
        return pubsub.asyncIterator('cvDeleted');
      }},
    cvUpdated: {
        subscribe: (parent,{pubsub},info) => {
          return pubsub.asyncIterator('cvUpdated');
        }},
    cvCreated: {
          subscribe: (parent,{pubsub},info) => {
            return pubsub.asyncIterator('cvCreated');
          }}
  
  }

};

const cvSchema = {
  typeDefs: type + ", " + query + ", " + mutation + ", " + input,
  resolvers,
};

export default cvSchema;

import { readFileSync } from 'fs';
import { join } from 'path';
import { GraphQLError } from 'graphql';

const type = readFileSync(join(__dirname, 'cv.graphql')).toString();
const query = readFileSync(join(__dirname, 'query.graphql')).toString();

const resolvers = {
  Query: {
    cvs: async (_, __, { db }) => {
      console.log(db);
      return await db.find();
    },
    cv: async (_, { id }, { db }) => {
      const cv = db.findOne(id);
      if (!cv) {
        throw new GraphQLError(`Element with id '${id}' not found.`);
    }
      return cv;
  }
}};

const cvSchema = {
  typeDefs: type + ", " + query,
  resolvers
};

export default cvSchema;
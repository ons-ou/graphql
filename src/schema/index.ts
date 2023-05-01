import { makeExecutableSchema } from '@graphql-tools/schema';
import cvSchema from './cv';
import userSchema from './user';
import skillSchema from './skill';

const generateSchema = (schemaParts: any) =>
  makeExecutableSchema({
    typeDefs: schemaParts.map((part: any) => part.typeDefs),
    resolvers: [...schemaParts.map((part: any) => part.resolvers)],
  });


export const schema = generateSchema([cvSchema, userSchema, skillSchema]);
import { readFileSync } from 'fs';
import { join } from 'path';

const typeDefs = readFileSync(join(__dirname, 'user.graphql')).toString();

const userSchema = {
  typeDefs,
};

export default userSchema;
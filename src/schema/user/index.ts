import { readFileSync } from 'fs';
import { join } from 'path';

const typeDefs = readFileSync(join(__dirname, 'user.graphql')).toString();
const input = readFileSync(join(__dirname, 'input.graphql')).toString();

const userSchema = {
  typeDefs: typeDefs + ', ' + input,
};

export default userSchema;
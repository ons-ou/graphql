import { readFileSync } from 'fs';
import { join } from 'path';

const typeDefs = readFileSync(join(__dirname, 'skill.graphql')).toString();
const input = readFileSync(join(__dirname, 'input.graphql')).toString();

const SkillSchema = {
  typeDefs: typeDefs + ', ' + input,
};

export default SkillSchema;
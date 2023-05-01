import { readFileSync } from 'fs';
import { join } from 'path';

const typeDefs = readFileSync(join(__dirname, 'skill.graphql')).toString();

const SkillSchema = {
  typeDefs,
};

export default SkillSchema;
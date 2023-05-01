import { DataSource } from "typeorm";
import { Cv } from "./entities/cv";
import { Skill } from "./entities/skill";
import { User } from "./entities/user";


async function getRepository() {
  const dataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [Cv, Skill, User],
    synchronize: true,
  });
  const db = await dataSource.getRepository(Cv);
  return db;
}

export const context = {
  db: async () => await getRepository(),
};
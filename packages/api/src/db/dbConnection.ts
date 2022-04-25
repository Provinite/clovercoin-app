import { Connection, createConnection } from "typeorm";
import { ModelsArray } from "../models";

export function createDbConnection(): Promise<Connection> {
  return createConnection({
    type: "postgres",
    port: 5432,
    host: "localhost",
    database: "postgres",
    username: "postgres",
    password: "password",
    synchronize: true,
    entities: [...ModelsArray],
    logging: "all",
  });
}

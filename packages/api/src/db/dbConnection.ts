import { Connection, createConnection } from "typeorm";
import { entities } from "../models/entities";

export function createDbConnection(): Promise<Connection> {
  return createConnection({
    type: "postgres",
    port: 5432,
    host: "localhost",
    database: "postgres",
    username: "postgres",
    password: "password",
    synchronize: true,
    entities: [...entities],
    logging: "all",
  });
}

import { DataSource } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions.js";
import { ModelsArray } from "../models/index.js";
import { migrationsArray } from "../migrations/_index.js";

export function configureDataSource(
  options: Partial<PostgresConnectionOptions> = {}
) {
  dataSource.setOptions(options);
}

export const dataSource = new DataSource({
  type: "postgres",
  port: 5432,
  host: "localhost",
  database: "postgres",
  username: "postgres",
  password: "password",
  synchronize: false,
  entities: [...ModelsArray],
  migrations: [...migrationsArray],
});

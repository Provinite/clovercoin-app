import { DataSource } from "typeorm/data-source/DataSource.js";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions.js";
import { ModelsArray } from "../models/index.js";

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
  synchronize: true,
  entities: [...ModelsArray],
});

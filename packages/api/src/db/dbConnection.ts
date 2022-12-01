import { DataSource } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { ModelsArray } from "../models";

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

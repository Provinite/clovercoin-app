import { v4 } from "uuid";
import pg from "pg";
import { dataSource } from "../../db/dbConnection.js";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions.js";
export const dbName = `integration-${v4()}`;

export const createTestDb = async () => {
  const options = dataSource.options as PostgresConnectionOptions;
  const client = new pg.Client({
    database: "postgres",
    host: options.host,
    port: options.port,
    password: options.password,
    user: options.username,
  });

  await client.connect();
  await client.query(`CREATE DATABASE "${dbName}"`);
  await client.end();
};

export const dropTestDb = async () => {
  const options = dataSource.options as PostgresConnectionOptions;
  const client = new pg.Client({
    database: "postgres",
    host: options.host,
    port: options.port,
    password: options.password,
    user: options.username,
  });

  await client.connect();
  await client.query(`DROP DATABASE "${dbName}"`);
  await client.end();
};

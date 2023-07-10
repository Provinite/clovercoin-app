// 1. Setup postgres
// 2. Start app (supertest?)
import "cross-fetch/polyfill";
import { PostgreSqlContainer } from "testcontainers";
import { dataSource } from "../db/dbConnection.js";
import { createCloverCoinAppServer } from "../server.js";
import { logger } from "../util/logger.js";

// TODO: Pin postgres, also pin postgres in the docker compose
global.ccPostgresContainer = await new PostgreSqlContainer().start();
logger.info({
  message: "Started test postgres container",
  port: global.ccPostgresContainer.getPort(),
  database: global.ccPostgresContainer.getDatabase(),
  username: global.ccPostgresContainer.getUsername(),
  password: global.ccPostgresContainer.getPassword(),
  host: global.ccPostgresContainer.getHost(),
});
if (dataSource.isInitialized) {
  throw new Error(
    "Cannot configure CloverCoin application database since it is already initialized."
  );
}
dataSource.setOptions({
  port: global.ccPostgresContainer.getPort(),
  database: global.ccPostgresContainer.getDatabase(),
  username: global.ccPostgresContainer.getUsername(),
  password: global.ccPostgresContainer.getPassword(),
  host: global.ccPostgresContainer.getHost(),
});

const { koa } = await createCloverCoinAppServer({
  db: {},
  schema: { emitFile: undefined },
});
const server = koa.listen(0);
const address = server.address();
if (!address || typeof address === "string") {
  throw new Error("Unable to resolve koa port");
}
global.ccAppAddress = address;
logger.info({
  message: "Started application",
  port: address.port,
});

export const shutdown = async () => {
  const port = global.ccPostgresContainer?.getPort();
  // shutdown app server
  await new Promise<void>((res, rej) =>
    server.close((err) => (err ? rej(err) : res()))
  );
  await global.ccPostgresContainer?.stop();
  logger.info({
    message: "Stopped postgres container",
    port,
  });

  global.ccAppAddress = undefined;
  global.ccPostgresContainer = undefined;
};

import "cross-fetch/polyfill";
import { dataSource } from "../db/dbConnection.js";
import { createCloverCoinAppServer } from "../server.js";
import { logger } from "../util/logger.js";
import { createTestDb, dbName, dropTestDb } from "./integration/db.js";

if (dataSource.isInitialized) {
  throw new Error(
    "Cannot configure CloverCoin application database since it is already initialized."
  );
}

await createTestDb();

dataSource.setOptions({
  database: dbName,
});

const { koa, rootContainer } = await createCloverCoinAppServer({
  db: {},
  schema: { emitFile: undefined },
});

await dataSource.runMigrations();

const server = koa.listen(0);
const address = server.address();
if (!address || typeof address === "string") {
  throw new Error("Unable to resolve koa port");
}
global.ccAppContainer = rootContainer;
global.ccAppAddress = address;
logger.info({
  message: "Started application",
  port: address.port,
});

export const shutdown = async () => {
  // shutdown app server
  await new Promise<void>((res, rej) =>
    server.close((err) => (err ? rej(err) : res()))
  );
  await dataSource.destroy();
  await dropTestDb();

  global.ccAppAddress = undefined;
  global.ccAppContainer = undefined;
};

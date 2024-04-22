import { setupTestClient } from "./testClient.js";
import { beforeAll, afterAll } from "@jest/globals";
import { registerAdminUser } from "./integration/register.js";
import { setAdminUser } from "./integration/integrationCache.js";
import { loginTestClient, logoutTestClient } from "./integration/login.js";
import { dataSource } from "../db/dbConnection.js";
import { createCloverCoinAppServer } from "../server.js";
import { logger } from "../util/logger.js";
import { createTestDb, dbName, dropTestDb } from "./integration/db.js";
import { Server } from "http";

let server: Server;
beforeAll(async () => {
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

  server = koa.listen(0);
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

  setupTestClient();
  const adminUser = await registerAdminUser();

  if (adminUser.register.__typename !== "LoginSuccessResponse") {
    throw new Error(
      `Failed to create Admin User in global setup. Received error from register mutation: ${adminUser.register.__typename}`
    );
  }
  setAdminUser(adminUser.register);
  loginTestClient(adminUser.register.token);
});

afterAll(async () => {
  setAdminUser(undefined);
  logoutTestClient();
  // shutdown app server
  await new Promise<void>((res, rej) =>
    server.close((err) => (err ? rej(err) : res()))
  );
  await dataSource.destroy();
  await dropTestDb();

  global.ccAppAddress = undefined;
  global.ccAppContainer = undefined;
});

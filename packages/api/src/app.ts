import { createCloverCoinAppServer, ServerOptions } from "./server.js";
import { logger } from "./util/logger.js";
import serverless from "@vendia/serverless-express";
import { build } from "./awilix/build.js";
import { getDbEnvironment, getHttpEnvironment } from "./environment.js";
import { fetchSecret } from "./secrets/fetchSecret.js";

const { listen } = getHttpEnvironment();
const { host, database, ssl, secretArn } = getDbEnvironment();

const options: ServerOptions = {
  db: {
    host,
    database,
    ssl,
  },
  schema: { emitFile: listen ? "./schema.gql" : undefined },
};

if (secretArn) {
  const result = await fetchSecret(secretArn, logger);
  const credentials: { username: string; password: string } =
    JSON.parse(result);
  options.db.username = credentials.username;
  options.db.password = credentials.password;
}

logger.info({
  message: "Initializing application server",
});
const { koa, rootContainer } = await createCloverCoinAppServer(options);

if (listen) {
  koa.listen(3000);
  build(rootContainer, ({ logger }) =>
    logger.info({
      message: "Server Started",
      port: 3000,
    })
  );
} else {
  build(rootContainer, ({ logger }) =>
    logger.info({
      message: "Application Ready",
      port: "NOT_LISTENING",
    })
  );
}
export const handler = serverless.configure({
  app: koa.callback(),
});

export const migrate = async () => {
  return build(rootContainer, async ({ db, logger }) => {
    try {
      const migrationCount = db.migrations.length;
      logger.info({
        message: "Running migrations",
        count: migrationCount,
      });
      await db.showMigrations();
      const migrations = await db.runMigrations({
        transaction: "all",
      });
      for (const migration of migrations) {
        logger.info({
          message: "Completed migration",
          migrationId: migration.id,
          migrationName: migration.name,
        });
      }
      logger.info({
        message: "Completed migrations",
        count: migrations.length,
      });
      return {
        statusCode: 200,
        migrationCont: migrationCount,
        migrations: migrations.map(({ id, name }) => ({
          id,
          name,
        })),
      };
    } catch (err: any) {
      logger.error({
        message: "Failed to run migrations",
        error: err,
      });
      return {
        statusCode: 500,
        error: err.name,
        message: err.message,
        stack: err.stack,
      };
    }
  });
};

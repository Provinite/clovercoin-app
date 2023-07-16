import { createCloverCoinAppServer, ServerOptions } from "./server.js";
import { logger } from "./util/logger.js";
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager"; // ES Modules import
import { NodeHttpHandler } from "@aws-sdk/node-http-handler";
import serverless from "@vendia/serverless-express";
import { build } from "./awilix/build.js";
import { getDbEnvironment, getHttpEnvironment } from "./environment.js";

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
  logger.info({
    message: `Fetching secret: ${secretArn}`,
  });
  const result = await new SecretsManagerClient({
    requestHandler: new NodeHttpHandler({
      connectionTimeout: 3000,
    }),
  }).send(new GetSecretValueCommand({ SecretId: secretArn }));
  logger.info({
    message: `Got secret: ${secretArn}`,
  });
  const credentials: { username: string; password: string } = JSON.parse(
    result.SecretString!
  );
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

export const handler = serverless.configure({ app: koa.callback() });

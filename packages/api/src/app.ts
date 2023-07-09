import { createCloverCoinAppServer, ServerOptions } from "./server.js";
import { logger } from "./util/logger.js";
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager"; // ES Modules import
import { NodeHttpHandler } from "@aws-sdk/node-http-handler";
import serverless from "@vendia/serverless-express";
const listen = String(process.env.CC_LISTEN).toLowerCase() !== "false";
const useSecret = Boolean(process.env.DB_SECRET_ARN);
const options: ServerOptions = {
  db: {},
  schema: { emitFile: listen ? "./schema.gql" : undefined },
};

if (useSecret) {
  logger.info({
    message: `Fetching secret: ${process.env.DB_SECRET_ARN}`,
  });
  const result = await new SecretsManagerClient({
    requestHandler: new NodeHttpHandler({
      connectionTimeout: 3000,
    }),
  }).send(new GetSecretValueCommand({ SecretId: process.env.DB_SECRET_ARN }));
  logger.info({
    message: `Got secret: ${process.env.DB_SECRET_ARN}`,
  });
  const credentials: { username: string; password: string } = JSON.parse(
    result.SecretString!
  );
  options.db.username = credentials.username;
  options.db.password = credentials.password;
}

if (process.env.CC_DB_HOST) {
  options.db.host = process.env.CC_DB_HOST;
}

if (process.env.DB_NAME) {
  options.db.database = process.env.DB_NAME;
}

logger.info({
  message: "Initializing application server",
});
const { koa, rootContainer, ready } = createCloverCoinAppServer(options);

await ready;

if (listen) {
  koa.listen(3000);
  rootContainer.build(({ logger }) =>
    logger.info({
      message: "Server Started",
      port: 3000,
    })
  );
} else {
  rootContainer.build(({ logger }) =>
    logger.info({
      message: "Application Ready",
      port: "NOT_LISTENING",
    })
  );
}

export const handler = serverless.configure({ app: koa.callback() });

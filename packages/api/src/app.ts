import ServerlessHttp from "serverless-http";
import { createCloverCoinAppServer, ServerOptions } from "./server";
import { logger } from "./util/logger";
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager"; // ES Modules import

const listen = String(process.env.CC_LISTEN).toLowerCase() !== "false";
const useSecret = Boolean(process.env.DB_SECRET_ARN);
const options: ServerOptions = { db: {} };

// if (useSecret) {
//   logger.info({
//     message: `Fetching secret: ${process.env.DB_SECRET_ARN}`,
//   });
//   const result = await new SecretsManagerClient({}).send(
//     new GetSecretValueCommand({ SecretId: process.env.DB_SECRET_ARN })
//   );
//   const credentials: { username: string; password: string } = JSON.parse(
//     result.SecretString!
//   );
//   options.db.username = credentials.username;
//   options.db.password = credentials.password;
// }

if (process.env.CC_DB_HOST) {
  options.db.host = process.env.CC_DB_HOST;
}

logger.info({
  message: "Initializing application server",
});
const { koa, rootContainer, ready } = createCloverCoinAppServer(options);

// await ready;

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

export const handler = ServerlessHttp(koa);

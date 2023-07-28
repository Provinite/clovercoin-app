import {
  GetSecretValueCommand,
  SecretsManagerClient,
} from "@aws-sdk/client-secrets-manager";
import { NodeHttpHandler } from "@aws-sdk/node-http-handler";
import { getJwtConfig } from "../../environment.js";
import { logger } from "../logger.js";
// eslint-disable-next-line prefer-const
let { secret, secretArn } = getJwtConfig();

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
  secret = result.SecretString!;
}

export const jwtSecret = Buffer.from(secret, "base64");

if (jwtSecret.byteLength < 256 / 8) {
  throw new Error("JWT secret MUST be at least 32 bytes (256 bits fo HS256)");
}

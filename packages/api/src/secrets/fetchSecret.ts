import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
import { NodeHttpHandler } from "@aws-sdk/node-http-handler";
import { Logger } from "winston";

const cache: Record<string, string> = {};

export const fetchSecret = async (arn: string, logger: Logger) => {
  if (cache[arn]) {
    logger.info({
      message: `Looked up cached secret`,
      foundInCache: true,
      secretArn: arn,
    });
    return cache[arn];
  }

  logger.info({
    message: `Fetching secret`,
    foundInCache: false,
    secretArn: arn,
  });

  const client = new SecretsManagerClient({
    requestHandler: new NodeHttpHandler({
      connectionTimeout: 3000,
    }),
  });
  const result = await client.send(
    new GetSecretValueCommand({ SecretId: arn })
  );

  if (!result.SecretString) {
    throw new Error("Error fetching secret");
  }

  logger.info({
    message: "Fetched secret",
    secretArn: arn,
    addedToCache: true,
  });
  cache[arn] = result.SecretString;

  return result.SecretString;
};

import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
import { NodeHttpHandler } from "@aws-sdk/node-http-handler";
import { Logger } from "winston";

const cache: Record<string, string> = {};
/**
 * Read a secret from AWS secrets manager. Fetched secrets
 * are cached for the duration of the applicaton's life time
 * in memory. Sequential calls to fetch the same secret will
 * return the cached value to save $$$.
 * @param arn The ARN of the secret to fetch
 * @param logger A logger instance
 * @returns The secret string
 */
export const fetchSecret = async (
  arn: string,
  logger: Logger
): Promise<string> => {
  if (typeof cache[arn] === "string") {
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

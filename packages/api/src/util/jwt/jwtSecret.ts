import { getJwtConfig } from "../../environment.js";
import { fetchSecret } from "../../secrets/fetchSecret.js";
import { logger } from "../logger.js";
// eslint-disable-next-line prefer-const
let { secret, secretArn } = getJwtConfig();

if (secretArn) {
  logger.info({
    message: `Fetching secret: ${secretArn}`,
  });
  secret = await fetchSecret(secretArn, logger);
}

export const jwtSecret = Buffer.from(secret, "base64");

if (jwtSecret.byteLength < 256 / 8) {
  throw new Error("JWT secret MUST be at least 32 bytes (256 bits fo HS256)");
}

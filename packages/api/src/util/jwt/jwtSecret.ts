import { getJwtConfig } from "../../environment.js";
const { secret } = getJwtConfig();

export const jwtSecret = Buffer.from(secret, "base64");

if (jwtSecret.byteLength < 256 / 8) {
  throw new Error("JWT secret MUST be at least 32 bytes (256 bits fo HS256)");
}

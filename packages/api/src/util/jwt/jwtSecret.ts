const { CC_JWT_SECRET } = process.env;
if (!CC_JWT_SECRET) {
  throw new Error("Missing environment variable: CC_JWT_SECRET");
}
export const jwtSecret = Buffer.from(CC_JWT_SECRET, "base64");

if (jwtSecret.byteLength < 256 / 8) {
  throw new Error("JWT secret MUST be at least 32 bytes (256 bits fo HS256)");
}

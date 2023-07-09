import { verify } from "jsonwebtoken";
import { jwtSecret } from "./jwtSecret.js";

export function verifyJwt<T>(jwt: string): Promise<T> {
  return new Promise((res, rej) => {
    verify(jwt, jwtSecret, (err, decoded) => {
      if (err) {
        return rej(err);
      }
      return res(decoded as any);
    });
  });
}

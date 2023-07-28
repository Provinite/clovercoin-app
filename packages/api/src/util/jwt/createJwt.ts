import jsonwebtoken from "jsonwebtoken";
const { sign } = jsonwebtoken;
import { jwtSecret } from "./jwtSecret.js";

export function createJwt<T extends object>(payload: T): Promise<string> {
  return new Promise((res, rej) => {
    sign(payload, jwtSecret, (err, jwt) => {
      if (err) {
        return rej(err);
      }
      if (!jwt) {
        /**
         * "this should never happen"
         */
        throw new Error("Error signing JWT");
      }
      return res(jwt);
    });
  });
}

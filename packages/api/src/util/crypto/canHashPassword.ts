import { getBytesInString } from "../stringUtils.js";
import { BCRYPT_MAX_STR_BYTES } from "./BcryptMaxStringSizeExceededError.js";

export function canHashPassword(password: string) {
  return getBytesInString(password) <= BCRYPT_MAX_STR_BYTES;
}

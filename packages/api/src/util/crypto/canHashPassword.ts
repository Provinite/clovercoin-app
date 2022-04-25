import { getBytesInString } from "../stringUtils";
import { BCRYPT_MAX_STR_BYTES } from "./BcryptMaxStringSizeExceededError";

export function canHashPassword(password: string) {
  return getBytesInString(password) <= BCRYPT_MAX_STR_BYTES;
}

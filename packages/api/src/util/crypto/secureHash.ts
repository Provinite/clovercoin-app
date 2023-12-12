import { hash, hashSync } from "bcrypt";
import { getBytesInString } from "../stringUtils.js";
import {
  BcryptMaxStringSizeExceededError,
  BCRYPT_MAX_STR_BYTES,
} from "./BcryptMaxStringSizeExceededError.js";
const SALT_ROUNDS = 10;

/**
 * Securely hash a password using bcrypt.
 * @param password A string less than 72 bytes in size
 * @returns A string containing the salted hashed password
 * @throws { BcryptMaxStringSizeExceededError } if password is greater than 72
 *  bytes in size
 */
export async function secureHash(password: string): Promise<string> {
  /**
   * Per bcrypt implementation, only the first 72 bytes of a string are used.
   * Any extra bytes are ignored when matching passwords.
   * Note that this is not the first 72 characters. It is possible for a string to
   * contain less than 72 characters, while taking up more than 72 bytes
   * (e.g. a UTF-8 encoded string containing emojis).
   */
  const numBytesInPassword = getBytesInString(password);
  if (numBytesInPassword > BCRYPT_MAX_STR_BYTES) {
    throw new BcryptMaxStringSizeExceededError(numBytesInPassword);
  }
  return hash(password, SALT_ROUNDS);
}

export function secureHashSync(password: string): string {
  const numBytesInPassword = getBytesInString(password);
  if (numBytesInPassword > BCRYPT_MAX_STR_BYTES) {
    throw new BcryptMaxStringSizeExceededError(numBytesInPassword);
  }
  return hashSync(password, SALT_ROUNDS);
}

import { compare } from "bcrypt";
import { getBytesInString } from "../stringUtils.js";
import {
  BcryptMaxStringSizeExceededError,
  BCRYPT_MAX_STR_BYTES,
} from "./BcryptMaxStringSizeExceededError.js";

/**
 * Compare a plain text password with a secure hashed password.
 * @param plainTextPassword The plain text password a user has submitted to authenticate
 * @param hash The hashed & salted password for the account we're verifying
 * @returns A boolean, true if the plaintext password matches. False otherwise.
 */
export async function compareHash(
  plainTextPassword: string,
  hash: string
): Promise<boolean> {
  if (!plainTextPassword || !hash) {
    return false;
  }
  /**
   * Per bcrypt implementation, only the first 72 bytes of a string are used.
   * Any extra bytes are ignored when matching passwords.
   * Note that this is not the first 72 characters. It is possible for a string to
   * contain less than 72 characters, while taking up more than 72 bytes
   * (e.g. a UTF-8 encoded string containing emojis).
   */
  const numBytesInPassword = getBytesInString(plainTextPassword);
  if (numBytesInPassword > BCRYPT_MAX_STR_BYTES) {
    throw new BcryptMaxStringSizeExceededError(numBytesInPassword);
  }
  return compare(plainTextPassword, hash);
}

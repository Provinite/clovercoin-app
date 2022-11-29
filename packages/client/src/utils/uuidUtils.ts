/**
 * @file This file contains utilities for using uuids in urls.
 * @note Changes to this file should be made very carefully. The logic
 *  for converting uuid's needs to remain stable to avoid breaking
 *  everyone's bookmarks.
 */
import { parse, stringify } from "uuid";
import baseX from "base-x";

// base73 alphabet, do not touch
const digits = "0123456789";
const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const urlSafeSpecialCharacters = ".-_~!$&*+=@";

/**
 * Base73 < - > uint8Array converter.
 *
 * @note Do not change the alphabet or order used here, it will
 * break bookmarks.
 */
const base73 = baseX(digits + letters + urlSafeSpecialCharacters);

/**
 * Convert a v4 uuid to a url-safe slug Used to create
 * shorter url segments.
 * @param uuid The uuid to parse.
 * @returns A url-safe string representing the same uuid in
 */
export function uuidToSlug(uuid: string) {
  const bytes = parse(uuid) as Uint8Array;
  return base73.encode(bytes);
}

/**
 * Convert a base73 url-safe slug back to its canonical uuid format.
 * Use this to convert url slugs into uuid strings that can be
 * used with the API.
 * @param slug A url slug created by {@link uuidToSlug}
 * @returns
 */
export function slugToUuid(slug: string) {
  const bytes = base73.decode(slug);
  return stringify(bytes);
}

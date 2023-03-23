/**
 * Test if a value is nullish (null or undefined)
 * @param val
 * @returns True if `val` is nullish
 */
export function isNullish(val: unknown): val is null | undefined {
  return val === null || val === undefined;
}

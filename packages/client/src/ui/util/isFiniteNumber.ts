/**
 * Test if a value is a finite number (not NaN or +/-Infinity)
 * @param val
 * @returns true if val is a finite number
 */
export function isFiniteNumber(val: unknown): val is number {
  return typeof val === "number" && isFinite(val);
}

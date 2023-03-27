/**
 * Map over an object's keys and change values. Returns a new
 * object where each key's value is the result of `fn`
 * @param obj The object to map over
 * @param fn The function to generate new values with
 * @returns The new object
 */
export function objectMap<
  T extends Record<string | symbol | number, any>,
  U,
  K extends string | number | symbol = keyof T,
  V = T[keyof T]
>(obj: T, fn: (val: V, key: K) => U): Record<K, U> {
  const result = {} as any;
  for (const [key, value] of Object.entries(obj)) {
    result[key] = fn(value, key as K);
  }
  return result;
}

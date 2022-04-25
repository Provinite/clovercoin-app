export function ensureArray<T>(valOrArray: T | T[]): T[] {
  return Array.isArray(valOrArray) ? valOrArray : [valOrArray];
}

import { AwilixContainer } from "awilix";

export function resolveMany<T extends object, K extends (keyof T)[]>(
  container: AwilixContainer<T>,
  ...keys: [...K]
): { [k in keyof K]: T[K[k]] } {
  return keys.map((key) => container.resolve(key)) as any;
}

export function resolve<T extends object, K extends keyof T>(
  container: AwilixContainer<T>,
  key: K
): T[K] {
  const [result] = resolveMany(container, key);
  return result;
}

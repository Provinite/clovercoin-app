import { AwilixContainer, Resolver } from "awilix";

/**
 * Register an entry in the provided awilix container. Prefer this method
 * over `container.register` for improved type-safety.
 * @param container The container to register in
 * @param key The name of the entry
 * @param resolver The awilix resolver to use
 * @returns The awilix container
 */
export function register<T extends Record<any, any>, K extends keyof T>(
  container: AwilixContainer<T>,
  key: K,
  resolver: Resolver<T[K]>
) {
  return container.register(key as Exclude<K, number>, resolver);
}

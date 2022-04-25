import { AwilixContainer, Resolver } from "awilix";

export function register<T extends {}, K extends keyof T>(
  container: AwilixContainer<T>,
  key: K,
  registration: Resolver<T[K]>
) {
  return container.register(key as Exclude<K, number>, registration);
}

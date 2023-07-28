import { AwilixContainer } from "awilix";

/**
 * Inject a function with the provided DI container. Returns whatever
 * value the function returns.
 *
 * @note Prefer this function over `container.build` due to its improved
 * type-safety.
 * @param container The container to use
 * @param fn The function to execute, will be injected like any other
 * DI-enabled part of the app.
 * @returns The return value from `fn`
 */
export function build<T extends Record<any, any>, R>(
  container: AwilixContainer<T>,
  fn: (cradle: T) => R
) {
  return container.build(fn);
}

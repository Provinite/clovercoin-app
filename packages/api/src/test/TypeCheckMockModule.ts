/**
 * Use this type to assert that a mock module adheres to the structure
 * of the module it's mocking.
 *
 * @example
 * ```ts
 * // @filename: src/__mocks__/service.ts
 * // mocking src/service.ts
 * // eslint-disable-next-line @typescript-eslint/no-unused-vars
 * type doesMockCorrectly = TypeCheckMockModule<
 *  typeof import("./service.js"),
 *  typeof import("../service.js")
 * >;
 * ```
 */
export type TypeCheckMockModule<
  _MockModuleType extends ActualModuleType,
  ActualModuleType
> = true;

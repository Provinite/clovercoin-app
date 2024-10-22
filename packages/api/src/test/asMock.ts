import { Constructor } from "type-fest";

export function asMock<T extends new (...args: any[]) => any>(
  fn: T
): jest.MockedClass<T>;
export function asMock<T extends (...args: any[]) => any>(
  fn: T
): jest.MockedFunction<T>;
export function asMock<T extends ((...args: any[]) => any) | Constructor<any>>(
  fn: T
): T extends Constructor<any>
  ? jest.MockedClass<T>
  : T extends (...args: any[]) => any
  ? jest.MockedFunction<T>
  : never {
  return fn as any;
}

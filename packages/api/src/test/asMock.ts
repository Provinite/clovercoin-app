export function asMock<T extends (...args: any[]) => any>(
  fn: T
): jest.MockedFunction<T> {
  return fn as any;
}

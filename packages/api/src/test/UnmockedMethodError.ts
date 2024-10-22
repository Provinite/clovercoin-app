export class UnmockedMethodError extends Error {
  constructor(base: string, methodName: string) {
    super(`Method ${base}.${methodName} is not mocked`);
  }
}

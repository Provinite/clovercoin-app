export function generatorToArray<T, R>(generator: Generator<T, R>): (T | R)[] {
  const result: (T | R)[] = [];
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const next = generator.next();
    result.push(next.value);
    if (next.done) {
      return result;
    }
  }
}

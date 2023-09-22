export const memoize = <Args extends any[], Returns>(
  fn: (...args: Args) => Returns,
  hashKey: (...args: Args) => string | number
): ((...args: Args) => Returns) => {
  const cache: Record<string | number, [Returns]> = {};
  return (...args: Args): Returns => {
    const key = hashKey(...args);
    const val = cache[key];
    if (val) {
      return val[0];
    } else {
      const [val] = (cache[key] = [fn(...args)]);
      return val;
    }
  };
};

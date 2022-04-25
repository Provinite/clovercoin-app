export function getBytesInString(str: string): number {
  return Buffer.from(str).length;
}

export function uncapitalize<T extends string>(str: T): Uncapitalize<T> {
  return (str.substring(0, 1).toLowerCase() +
    str.substring(1)) as Uncapitalize<T>;
}

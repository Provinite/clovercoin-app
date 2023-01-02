export interface WithProps<T> {
  value: () => T | T;
  children: (val: T) => any;
}

export function With<T>({ value, children }: WithProps<T>) {
  return children(typeof value === "function" ? value() : value);
}

export function invoke(fn: () => Promise<any>): void {
  fn();
}

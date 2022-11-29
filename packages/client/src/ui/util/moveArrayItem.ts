export function moveArrayItem(
  arr: any[],
  fromIndex: number,
  toIndex: number
): void {
  const el = arr[fromIndex];
  arr.splice(fromIndex, 1);

  arr.splice(toIndex, 0, el);
}

/**
 * Type-safety function for
 * @param stylesheet
 * @param rules
 * @returns
 */
export function stylish<T>(
  stylesheet: T,
  rules: { [k in keyof T]?: boolean | null | undefined }
): T[keyof T][] {
  const result: any[] = [];
  for (const key of Object.keys(rules)) {
    if (rules[key as keyof T]) result.push(stylesheet[key as keyof T]);
  }
  return result;
}

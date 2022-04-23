import { CSSProperties } from "aphrodite";

export type StyleDeclaration = object | undefined;

export function createClassDef<T extends Record<string, CSSProperties>>(
  obj: T
): Record<keyof T, CSSProperties> {
  return obj;
}

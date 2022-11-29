import { Interpolation, Theme } from "@emotion/react";

export interface Stylesheet extends Record<string, Interpolation<Theme>> {}

export function stylesheet<T extends Stylesheet>(stylesheet: T): T {
  return stylesheet;
}

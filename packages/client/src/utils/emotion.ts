import { Interpolation, Theme } from "@emotion/react";

export interface Stylesheet extends Record<string, Interpolation<Theme>> {}

/**
 * Type utility function to declare a new stylesheet object. Keys
 * are arbitrary, and values are emotion interpolations that
 * can be passed directly to the `css` prop.
 * @param stylesheet The stylesheets to create
 * @returns The supplied stylesheet
 */
export function stylesheet<T extends Stylesheet>(stylesheet: T): T {
  return stylesheet;
}

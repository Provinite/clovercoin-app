/**
 * Pixel values for screen size breakpoints.
 */
export const MediaBreakPoints = {
  xs: 320,
  s: 480,
  m: 768,
  l: 1024,
  xl: 1200,
};

/**
 * Named breakpoints used in the app
 */
export type BreakpointName = keyof typeof MediaBreakPoints;

type MediaQueryObject = Record<BreakpointName, string>;
/**
 * Object containing min-width css `@media` queries for
 * each breakpoint.
 *
 * Can be used with `aphrodite` like so
 * @example
 * ```ts
 * import { css, StyleSheet } from "aphrodite";
 * const ss = StyleSheet.create({
 *   root: {
 *     // red on xs, s, m screens
 *     [MediaQuery.xs]: {
 *       color: "red"
 *     },
 *     // green on l, xl+ screens
 *     [MediaQuery.l]: {
 *       color: "green"
 *     }
 *   }
 * })
 * ```
 */
export const MediaQuery: MediaQueryObject = Object.entries(
  MediaBreakPoints
).reduce((obj: MediaQueryObject, [key, val]) => {
  obj[key as BreakpointName] = createMediaQueries(val);
  return obj;
}, {} as any);

/**
 * Create a css @media query using the provided min width in px
 */
function createMediaQueries(minWidthPx: number) {
  return `@media (min-width: ${minWidthPx}px)`;
}

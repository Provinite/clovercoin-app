export const dimBlue = "#e6e6f2";
export const dimGrey = rgba(0, 0, 0, 0.1);
export const dimDarkGrey = rgba(0, 0, 0, 0.2);
export const dimYellow = "#eee9dd";

export const green = "#6EAE40";
export const Color = {
  List: {
    cellBorder: dimGrey,
    activeRow: dimBlue,
    background: "white",
  },
  Input: {
    border: dimGrey,
    Focus: {
      border: dimDarkGrey,
    },
  },
} as const;

/**
 * Don't even know why really. Just prefer the syntax.
 * @returns A css `rgba(...)` string
 */
export function rgba(r: number, g: number, b: number, a: number) {
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

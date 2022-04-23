import { LoremIpsum } from "lorem-ipsum";
import { useMemo } from "react";
import seedrandom from "seedrandom";
export function useLipsum<T extends number>(
  {
    paragraphs,
    seed,
  }: {
    paragraphs: T;
    seed?: string;
  },
  deps: any[]
): {
  paragraphs: Tuple<string, T>;
} {
  return useMemo(() => {
    const lipsum = new LoremIpsum({
      random: seedrandom(seed || JSON.stringify(deps)),
      sentencesPerParagraph: { min: 6, max: 9 },
    });
    return {
      paragraphs: Array(paragraphs)
        .fill(undefined)
        .map(() => lipsum.generateParagraphs(1)) as any,
    };
  }, [...deps]);
}

// https://stackoverflow.com/questions/52489261/typescript-can-i-define-an-n-length-tuple-type
type Tuple<T, N extends number> = N extends N
  ? number extends N
    ? T[]
    : _TupleOf<T, N, []>
  : never;
type _TupleOf<T, N extends number, R extends unknown[]> = R["length"] extends N
  ? R
  : _TupleOf<T, N, [T, ...R]>;

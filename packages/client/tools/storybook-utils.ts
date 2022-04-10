import { ArgTypes } from "@storybook/react";
import flatten from "flat";
import type { PartialDeep } from "type-fest";
import type { Flatten } from "../src/typing/types";
export function flattenArgs<T>(args: PartialDeep<T>): Flatten<T, "."> {
  return flatten<PartialDeep<T>, Flatten<T, ".">>(args, {
    delimiter: ".",
    safe: true,
  });
}

export function flatArgTypes<T>(
  argTypes: Partial<ArgTypes<Flatten<T, ".">>>
): Partial<ArgTypes<Flatten<T, ".">>> {
  return argTypes;
}

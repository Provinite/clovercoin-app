import { useEffect } from "react";
import { makeCancellable } from "../ui/util/makeCancellable";

export const useCancellableEffect = (fn: () => AsyncGenerator, deps: any[]) => {
  useEffect(makeCancellable(fn), deps);
};

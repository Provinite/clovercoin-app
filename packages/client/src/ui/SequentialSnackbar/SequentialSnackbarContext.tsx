import { createContext } from "react";
import { SnackbarQueue } from "./SnackbarQueue";

export const SequentialSnackbarContext = createContext<SnackbarQueue>(
  null as any
);

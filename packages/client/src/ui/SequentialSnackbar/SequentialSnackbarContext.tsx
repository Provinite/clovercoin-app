import { createContext, useContext } from "react";
import { SnackbarQueue } from "./SnackbarQueue";

export const SequentialSnackbarContext = createContext<SnackbarQueue>(
  null as any
);

export const useSnackbar = () => useContext(SequentialSnackbarContext);

import { createContext, useContext } from "react";
import { HeaderBarProps } from "./HeaderBarProps";

export interface HeaderBarContextType {
  props: HeaderBarProps;
}

export const HeaderBarContext = createContext<HeaderBarContextType>(
  null as any
);

export const useHeaderBarProps = () => useContext(HeaderBarContext).props;

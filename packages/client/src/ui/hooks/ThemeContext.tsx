import * as React from "react";
import { createContext } from "react";

export interface ThemeContextType {
  colors: {
    primary: string;
    secondary: string;
  };
}
export const ThemeContext = createContext<ThemeContextType>({
  colors: {
    primary: "",
    secondary: "",
  },
});

export const ThemeContextDumbProvider: React.FunctionComponent<{
  theme: ThemeContextType;
}> = ({ children, theme }) => (
  <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
);

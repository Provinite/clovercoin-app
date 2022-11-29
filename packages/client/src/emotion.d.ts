/**
 * @file Type declaration unifying our MUI theme
 * and emotion theme
 */
import "@emotion/react";
import { Theme as MuiTheme } from "@mui/material";

declare module "@emotion/react" {
  export interface Theme extends MuiTheme {}
}

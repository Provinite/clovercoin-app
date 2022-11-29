/**
 * @file This file contains the main application component,
 * rendered at the root route.
 */
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline, Paper, ThemeProvider } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { Outlet } from "react-router-dom";
import { client } from "./client";
import {
  HeaderBarContextType,
  HeaderBarContext,
} from "./ui/HeaderBar/HeaderBarContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
const defaultDarkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
// const darkTheme = createTheme({
//   ...defaultDarkTheme,
//   palette: {
//     ...defaultDarkTheme.palette,
//     success: {
//       ...defaultDarkTheme.palette.success,
//       contrastText: "rgba(255, 255, 255, 1)",
//     },
//   },
// });

const darkTheme = defaultDarkTheme;
console.log(darkTheme);

/**
 * Application root component.
 */
export const Application: FunctionComponent = () => {
  const [headerBarContext] = useState<HeaderBarContextType>(() => ({
    props: {
      title: "",
      userIconUrl: "http://placekitten.com/100/100",
      userName: "Prov",
    },
  }));
  return (
    <DndProvider backend={HTML5Backend}>
      <ThemeProvider theme={darkTheme}>
        <EmotionThemeProvider theme={darkTheme}>
          <CssBaseline />
          <ApolloProvider client={client}>
            <HeaderBarContext.Provider value={headerBarContext}>
              <Paper
                css={{
                  display: "flex",
                  flexGrow: 1,
                  alignSelf: "stretch",
                  flexDirection: "column",
                }}
                elevation={0}
              >
                <Outlet />
              </Paper>
            </HeaderBarContext.Provider>
          </ApolloProvider>
        </EmotionThemeProvider>
      </ThemeProvider>
    </DndProvider>
  );
};

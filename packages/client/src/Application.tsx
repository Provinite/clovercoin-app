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
const darkTheme = defaultDarkTheme;

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
    /**
     * Drag and drop context provider. This may not need to be
     * at the top of the application here.
     * @perf @todo
     */
    <DndProvider backend={HTML5Backend}>
      {/** Mui and emotion theme providers. Both use the same theme */}
      <ThemeProvider theme={darkTheme}>
        <EmotionThemeProvider theme={darkTheme}>
          {/** Baseline styles for mui */}
          <CssBaseline />
          {/** Apollo client provider for `useQuery`/`useMutation` hooks */}
          <ApolloProvider client={client}>
            {/**
             * @todo Get rid of this stupid thing or actually use it.
             */}
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

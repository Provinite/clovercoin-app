/**
 * @file This file contains the main application component,
 * rendered at the root route.
 */
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline, Paper, ThemeProvider } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { graphqlService } from "./graphql/client";
import {
  HeaderBarContextType,
  HeaderBarContext,
} from "./ui/HeaderBar/HeaderBarContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  SequentialSnackbar,
  useSnackbarQueue,
} from "./ui/SequentialSnackbar/SequentialSnackbar";
import { SequentialSnackbarContext } from "./ui/SequentialSnackbar/SequentialSnackbarContext";
import { globalSnackbarTopic } from "./utils/observables/topics/globalSnackbarTopic";
const defaultDarkTheme = createTheme({
  palette: {
    mode: "light",
  },
  typography: {
    fontFamily: `-apple-system,BlinkMacSystemFont,"Segoe UI Adjusted","Segoe UI","Liberation Sans",sans-serif`,
  },
});
const darkTheme = defaultDarkTheme;

/**
 * Application root component.
 */
export const Application: FunctionComponent = () => {
  const [headerBarContext, setHeaderBarContext] =
    useState<HeaderBarContextType>(() => ({
      props: {
        title: "",
        userIconUrl: "",
        userName: "",
      },
    }));

  const snackbar = useSnackbarQueue();

  /**
   * Connects the global snackbar topics to the snackbar
   */
  useEffect(
    () =>
      globalSnackbarTopic.simpleError.subscribe((msg) => {
        snackbar.appendSimpleError(msg);
      }),
    []
  );

  useEffect(
    () =>
      graphqlService.addAuthenticationListener(() => {
        setHeaderBarContext((headerBarContext) => {
          if (graphqlService.isClientAuthenticated()) {
            return {
              ...headerBarContext,
              props: {
                ...headerBarContext.props,
                userName: graphqlService.getTokenPayload().identity.displayName,
              },
            };
          } else {
            return {
              ...headerBarContext,
              props: {
                ...headerBarContext.props,
                userIconUrl: "",
                userName: "",
              },
            };
          }
        });
      }),
    []
  );
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
          <ApolloProvider client={graphqlService.getApolloClient()}>
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
                <SequentialSnackbarContext.Provider value={snackbar}>
                  <Outlet />
                </SequentialSnackbarContext.Provider>
                <SequentialSnackbar queue={snackbar} />
              </Paper>
            </HeaderBarContext.Provider>
          </ApolloProvider>
        </EmotionThemeProvider>
      </ThemeProvider>
    </DndProvider>
  );
};

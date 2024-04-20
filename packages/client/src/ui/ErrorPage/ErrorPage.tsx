import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SpaIcon from "@mui/icons-material/Spa";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  createTheme,
  CssBaseline,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { FC, useEffect, useRef, useState } from "react";
import { useLocation, useRouteError } from "react-router-dom";
import { AppRoutes } from "../AppRoutes";
import { HeaderBar, HeaderBarSpacer } from "../HeaderBar/HeaderBar";
import { useHeaderBarProps } from "../HeaderBar/HeaderBarContext";
import { SideNav } from "../SideNav/SideNav";
import { PrettyPrintJson } from "../util/PrettyPrintJson";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
const defaultDarkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
const darkTheme = defaultDarkTheme;

/**
 * This component renders a page with error details for otherwise
 * unrecoverable/unexpected errors. Downstream components should
 * do their best to avoid this, but at least with this in place, if a user
 * hits some nasty badness, it won't burn their eyeballs off with a
 * white screen.
 */
export const ErrorPage: FC = () => {
  const headerBarProps = useHeaderBarProps();
  const routeError = useRouteError();
  const location = useLocation();

  const error = useDerivedValue(() => {
    let error: Error | undefined;
    if (routeError) {
      if (routeError instanceof Error) {
        error = routeError;
      } else {
        error = new Error(JSON.stringify(routeError));
      }
    }
    return error;
  }, [routeError]);

  const errorDetails = useDerivedValue(
    () => ({
      error: {
        message: error?.message,
        stack: error?.stack,
        ...error,
      },
      path: location.pathname,
      search: location.search,
      type: error?.constructor.name,
    }),
    [location, error]
  );

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <EmotionThemeProvider theme={darkTheme}>
          <CssBaseline />
          <HeaderBar {...headerBarProps} title="Something went wrong" />
          <Stack direction="row">
            <SideNav
              navItems={[
                {
                  to: AppRoutes.communityList(),
                  children: "Communities",
                  icon: <SpaIcon />,
                },
                {
                  to: AppRoutes.admin(),
                  children: "Site Administration",
                  icon: <AdminPanelSettingsIcon />,
                },
              ]}
            />
            <Stack flexGrow={1} css={{ overflowX: "hidden" }}>
              <HeaderBarSpacer />
              <Card>
                <CardHeader title="An error occurred" />
                <CardContent>
                  <Typography variant="body1">
                    Something went wrong, and it prevented us from showing you
                    this page. If this is a persistent problem, please contact
                    support with the following information:
                  </Typography>
                  <br />
                  <Button
                    variant="contained"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        JSON.stringify(errorDetails, null, 2)
                      );
                    }}
                  >
                    Copy to Clipboard
                  </Button>
                  <br />
                  <PrettyPrintJson
                    value={errorDetails}
                    css={{ overflowX: "scroll" }}
                  />
                </CardContent>
              </Card>
            </Stack>
          </Stack>
        </EmotionThemeProvider>
      </ThemeProvider>
    </>
  );
};

const useDerivedValue = <T,>(fn: (val?: T) => T, deps: any[]): T => {
  const [val, setVal] = useState(fn);
  const fnRef = useRef(fn);
  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);
  useEffect(() => {
    setVal(fn);
  }, deps);

  return val;
};

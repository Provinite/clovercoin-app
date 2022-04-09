import { ThemeContextDumbProvider } from "../src/ui/hooks/ThemeContext";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { MediaBreakPoints } from "../src/ui/lib/MediaQueries";
import "../src/ui/core/scss/fonts.scss";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  themePlayground: {
    theme: {
      colors: {
        primary: "#f00",
        secondary: "#0f0",
      },
    },
    provider: ThemeContextDumbProvider,
  },
  viewport: {
    viewports: {
      ...INITIAL_VIEWPORTS,
      xs: {
        name: "xs",
        styles: {
          width: MediaBreakPoints.xs + "px",
          height: 1.78 * MediaBreakPoints.xs + "px",
        },
      },
      s: {
        name: "s",
        styles: {
          width: MediaBreakPoints.s + "px",
          height: 1.78 * MediaBreakPoints.s + "px",
        },
      },
      m: {
        name: "m",
        styles: {
          width: MediaBreakPoints.m + "px",
          height: 1.78 * MediaBreakPoints.m + "px",
        },
      },
    },
  },
};

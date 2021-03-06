module.exports = {
  core: {
    builder: "webpack5",
  },
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-scss",
    "storybook-addon-apollo-client",
    "storybook-addon-theme-playground",
    "storybook-dark-mode",
  ],
  staticDirs: ["../static"],
  framework: "@storybook/react",
};

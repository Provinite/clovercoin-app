// babel is not used for this project. however, jest-snapshot uses babel under the hood
// when snapshotting. This file configures necessary plugins strictly for that purpose.
// Don't get confused in here thinking we're using babel for production code, or
// compiling test code.
// eslint-disable-next-line no-undef
module.exports = {
  plugins: [
    ["@babel/plugin-syntax-decorators", { decoratorsBeforeExport: true }],
  ],
};

import type { CodegenConfig } from "@graphql-codegen/cli";
const config: CodegenConfig = {
  schema: "./schema.gql",
  documents: ["src/**/*.integration.spec.ts", "src/test/integration/**/*.ts"],
  emitLegacyCommonJSImports: false,
  generates: {
    "./src/test/gql/": {
      preset: "client-preset",
    },
  },
};

export default config;

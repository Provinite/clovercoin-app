import * as esbuild from "esbuild";
await esbuild.build({
  entryPoints: ["./build/src/app.js"],
  bundle: true,
  format: "esm",
  platform: "node",
  outfile: "dist/app.mjs",
  keepNames: true,
  minify: true,
  external: [
    "pg-native", // unused
    "nock", // unused
    "aws-sdk", // unused
    "mock-aws-s3", // unused
    "bcrypt", // built with node-gyp in docker, incompatible with esbuild
    "app-root-path", // installed in docker, incompatible with esbuild + esm
  ],
  sourcemap: true,
  banner: {
    js: `
    import { createRequire as topLevelCreateRequire } from 'module';
    const require = topLevelCreateRequire(import.meta.url);
    `,
  },
});

/**
 * In case of emergency, break glass:
 *  // import path from 'path';
    // import { fileURLToPath } from 'url';
    // const __filename = fileURLToPath(import.meta.url);
    // const __dirname = path.dirname(__filename);
 */

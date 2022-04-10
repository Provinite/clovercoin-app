import {
  generateTemplateFiles,
  CaseConverterEnum,
} from "generate-template-files";

generateTemplateFiles([
  {
    option: "Create UI Component",
    defaultCase: CaseConverterEnum.PascalCase,
    entry: {
      folderPath: "./tools/templates/component",
    },
    stringReplacers: [{ question: "Component Name", slot: "__name__" }],
    output: {
      path: "./src/ui/__name__(pascalCase)/",
    },
  },
  {
    option: "Create Page Components",
    defaultCase: CaseConverterEnum.PascalCase,
    entry: {
      folderPath: "./tools/templates/page",
    },
    stringReplacers: [{ question: "Page Name", slot: "__name__" }],
    output: {
      path: "./src/ui/__name__Page/",
    },
  },
]);

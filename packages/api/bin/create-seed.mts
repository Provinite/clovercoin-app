/**
 * @file This file is executed to create a new seed script.
 */

import { readdirSync, readFileSync } from "fs";
import { join, relative } from "path";
import { Project, SyntaxKind, Node } from "ts-morph";

const seedPath = "./src/seeds/gql";
const seedFileRegex = /^(?<number>\d+)-.*?.ts$/;

const [_, __, kebabCaseDescription, mutationName] = process.argv;

if (!kebabCaseDescription) {
  throw new Error("Missing description");
}
if (!mutationName) {
  throw new Error("Missing mutation name");
}
const sourcePath = "./bin";

const seedNumber = getNextSeedNumber();
const paddedSeedNumber = padLeft(String(seedNumber), 4, "0");
const pascalDescription = kebabCaseToPascalCase(kebabCaseDescription);
const fileName = `${paddedSeedNumber}-${kebabCaseDescription}.ts`;
const className = `Seed${paddedSeedNumber}${pascalDescription}`;

const vars = {
  mutationName,
  className,
};

transformTemplate(getTemplate(), vars);

// replace __variables__ in the template
// rewrite relative imports
// remove eslint comments
function transformTemplate(
  fileContents: string,
  variables: Record<string, string>
): void {
  const replacedSource = replaceMap(variables, fileContents);
  const project = new Project();

  const seedsFilePath = join(seedPath, "_seeds.mts");
  const outPath = join(seedPath, fileName);
  const seedFile = project.createSourceFile(outPath, replacedSource);

  // rewrite imports for the new path
  seedFile.getImportDeclarations().forEach((declaration) => {
    if (declaration.isModuleSpecifierRelative()) {
      const importSpecifier = declaration
        .getModuleSpecifier()
        .getLiteralValue();
      declaration.setModuleSpecifier(
        rewriteRelativePath(importSpecifier, sourcePath, seedPath)
      );
    }
  });

  // remove eslint-disable comments
  const commentNodes: Node[] = [];
  seedFile.forEachDescendant((node) => {
    const ranges = node.getLeadingCommentRanges();
    if (ranges.length) {
      ranges.forEach((r) =>
        commentNodes.push(seedFile.getDescendantAtPos(r.getPos())!)
      );
    }
  });
  commentNodes.forEach((n: any) => {
    try {
      if (n.getText().includes("eslint-disable")) {
        n.remove();
      }
    } catch (err) {
      // swallow
    }
  });
  const seedsFile = project.addSourceFileAtPath(seedsFilePath);

  // register seed in seeds file
  seedsFile.addImportDeclaration({
    moduleSpecifier: `./${fileName.replace(/\.ts/, ".js")}`,
    defaultImport: className,
  });

  const declaration = seedsFile.getVariableDeclarationOrThrow("seeds");
  declaration
    .getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression)
    .addElement(className);

  // commit changes to disk
  project.saveSync();
}

function getTemplate() {
  return readFileSync(join(sourcePath, "seed-template.ts")).toString();
}

function rewriteRelativePath(
  relativePath: string,
  sourcePath: string,
  destPath: string
) {
  const relPath = join(sourcePath, relativePath);
  const result = relative(destPath, relPath);
  if (!result.startsWith("./") || result.startsWith("../")) {
    return `./${result}`;
  }
  return result;
}

function getNextSeedNumber(): number {
  const possibleSeedFiles = readdirSync(seedPath);
  const maxSeed = possibleSeedFiles
    .map((fileName) => seedFileRegex.exec(fileName)?.groups?.number ?? null)
    .filter((str): str is string => typeof str === "string")
    .map((str) => Number(str))
    .reduce((max, val) => Math.max(max, val), 0);
  return maxSeed + 1;
}

function replaceMap(replacements: Record<string, string>, str: string): string {
  for (const [replace, value] of Object.entries(replacements)) {
    str = str.replaceAll(`_${replace}_`, value);
  }

  return str;
}

function kebabCaseToPascalCase(kebabStr: string): string {
  return kebabStr
    .split("-")
    .map((str) => str[0].toUpperCase() + str.substring(1))
    .join("");
}

function padLeft(str: string, len: number, pad: string) {
  if (str.length >= len) return str;
  return pad.repeat((len - str.length) / pad.length) + str;
}

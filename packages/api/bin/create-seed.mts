/**
 * @file This file is executed to create a new seed script.
 */

import { readdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

const seedDir = "./src/seeds/gql";
const seedFileRegex = /^(?<number>\d+)-.*?.mts$/;

const [_, __, kebabCaseDescription, mutationName] = process.argv;

if (!kebabCaseDescription) {
  throw new Error("Missing description");
}
if (!mutationName) {
  throw new Error("Missing mutation name");
}

const seedNumber = getNextSeedNumber();
const paddedSeedNumber = padLeft(String(seedNumber), 4, "0");
const pascalDescription = kebabCaseToPascalCase(kebabCaseDescription);
const fileName = `${paddedSeedNumber}-${kebabCaseDescription}.mts`;
const className = `Seed${paddedSeedNumber}${pascalDescription}`;

const vars = {
  mutationName,
  className,
};

const template = readFileSync("./bin/seed-template.mts").toString();
const replacedSource = replaceMap(vars, template);

writeFileSync(join(seedDir, fileName), replacedSource);

function replaceMap(replacements: Record<string, string>, str: string): string {
  for (const [replace, value] of Object.entries(replacements)) {
    str = str.replaceAll(replace, value);
  }

  return str;
}

function getNextSeedNumber(): number {
  const possibleSeedFiles = readdirSync(seedDir);
  const maxSeed = possibleSeedFiles
    .map((fileName) => seedFileRegex.exec(fileName)?.groups?.number ?? null)
    .filter((str): str is string => typeof str === "string")
    .map((str) => Number(str))
    .reduce((max, val) => Math.max(max, val), 0);
  return maxSeed + 1;
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

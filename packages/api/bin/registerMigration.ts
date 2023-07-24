/**
 * This script can be used to keep the migrations barrel up-to-date.
 * usage: `yarn register-migration src/migrations/1234567890-my-migration.ts`
 */
import { resolve, dirname, basename } from "path";
import { Project, SyntaxKind } from "ts-morph";
const [_, __, migrationPath] = process.argv;
const migrationFilePath = resolve(migrationPath);
const migrationFileName = basename(migrationFilePath);
console.log({ migrationFilePath });

const directory = dirname(migrationFilePath);
const barrelFile = `${directory}/_index.ts`;

const project = new Project({
  skipAddingFilesFromTsConfig: true,
});
project.addSourceFileAtPath(migrationFilePath);
project.addSourceFileAtPath(barrelFile);

const barrel = project.getSourceFileOrThrow(barrelFile);
const migration = project.getSourceFileOrThrow(migrationFilePath);
const [migrationClass] = migration.getClasses();
const migrationClassName = migrationClass.getName();

if (!migrationClassName) {
  throw new Error(
    "Failed to read migration, could not figure out the class name."
  );
}

barrel.addImportDeclaration({
  moduleSpecifier: `./${migrationFileName.replace(/\.ts/, ".js")}`,
  namedImports: [{ name: migrationClassName }],
});

const declaration = barrel.getVariableDeclarationOrThrow("migrationsArray");
const arrayLiteral = declaration.getInitializerIfKindOrThrow(
  SyntaxKind.ArrayLiteralExpression
);
arrayLiteral.addElement(migrationClassName);
await project.save();

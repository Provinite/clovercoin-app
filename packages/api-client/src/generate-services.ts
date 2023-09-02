/**
 * @file
 * This script uses ts-morph to augment the graphql-codegen generated data with a helper class
 * providing type-safe access to graphql queries outside react.
 */
import { EnumMemberStructure, Project, Scope, StructureKind } from "ts-morph";
const project = new Project({
  skipAddingFilesFromTsConfig: true,
});

project.addSourceFileAtPath("./src/generated/graphql.ts");

interface GraphqlOperation {
  name: string;
  type: "Mutation" | "Query";
}

const operations: GraphqlOperation[] = [];
const sf = project.getSourceFileOrThrow("./src/generated/graphql.ts");
const operationNames = sf
  .getVariableDeclarations()
  .map((variableDeclaration) => variableDeclaration.getName())
  .filter((variableName) => variableName.endsWith("Document"))
  .map((documentName) => trimTrailing(documentName, "Document".length));

for (const operationName of operationNames) {
  if (sf.getTypeAlias(`${operationName}Mutation`)) {
    operations.push({
      name: operationName,
      type: "Mutation",
    });
  } else if (sf.getTypeAlias(`${operationName}Query`)) {
    operations.push({
      name: operationName,
      type: "Query",
    });
  }
}

sf.insertStatements(0, [
  `/* eslint-disable @typescript-eslint/no-unused-vars */`,
  `/* eslint-disable @typescript-eslint/ban-types */`,
]);

/**
 * Create the graphql service class
 */
const serviceClass = sf.addClass({
  name: "GraphqlService",
  isExported: true,
  ctors: [
    {
      parameters: [
        {
          scope: Scope.Protected,
          name: "client",
          type: `import("@apollo/client/core").ApolloClient<any>`,
        },
      ],
    },
  ],
});

for (const operation of operations) {
  const operationResultType = `${operation.name}${operation.type}`;
  const operationVariablesType = `${operationResultType}Variables`;
  const operationDocumentType = `${operation.name}Document`;

  /**
   * Add method for this operation
   */
  const optionsType =
    operation.type === "Mutation"
      ? `import("@apollo/client/core").MutationOptions<${operationResultType}, ${operationVariablesType}>`
      : `import("@apollo/client/core").QueryOptions<${operationVariablesType}, ${operationResultType}>`;

  const returnType =
    operation.type === "Mutation"
      ? `
    Promise<
      Omit<
        import("@apollo/client/core").FetchResult<
          ${operationResultType}
        >,
        "data"
      > & { data: ${operationResultType}}
    > `
      : undefined;
  serviceClass.addMethod({
    name: operation.name[0].toLowerCase() + operation.name.substring(1),
    isAsync: true,
    returnType,
    parameters: [
      {
        name: "options",
        type: `Omit<
                Partial<${optionsType}>,
                "variables" | "${operation.type.toLowerCase()}"
              > & {
                variables: ${operationVariablesType}
              }`,
      },
    ],
    statements: (w) =>
      w
        .writeLine(
          `const finalOptions = {
            ...options,
            ${operation.type.toLowerCase()}: ${operationDocumentType},
          };`
        )
        .writeLine(
          `const result = await this.client.${
            operation.type === "Query" ? "query" : "mutate"
          }<${operationResultType},${operationVariablesType}>(finalOptions);`
        )
        .writeLine(
          `if (!hasData(result)) { throw new Error("Unknown request failure") };`
        )
        .writeLine(`return result;`),
  });
}

sf.addFunction({
  name: "hasData",
  parameters: [
    {
      name: "result",
      type: "any",
    },
  ],
  returnType: "result is { data: {} }",
  statements: (w) => w.writeLine(`return Boolean(result && result.data);`),
});

/**
 * Type guards
 */

sf.addFunction({
  name: "hasTypeName",
  typeParameters: [{ name: "T", constraint: "string" }],
  isExported: true,
  parameters: [
    {
      name: "val",
      type: "any",
    },
    {
      name: "typename",
      type: "T",
    },
  ],
  returnType: "val is { __typeName: T }",
  statements: (w) =>
    w.writeLine(
      `return val && typeof val === "object" && val.__typename === typename`
    ),
});

const errorTypes: string[] = [];
const objectTypes: EnumMemberStructure[] = [];

sf.getInterfaces().forEach((interfaceDeclaration) => {
  const typenameProperty = interfaceDeclaration.getProperty("__typename");
  if (typenameProperty) {
    const kind = typenameProperty.getType();
    if (!kind.isStringLiteral()) {
      throw new Error(
        `Expected __typename to be a string literal type on ${interfaceDeclaration.getName()}`
      );
    }
    const value = kind.getText();
    objectTypes.push({
      kind: StructureKind.EnumMember,
      name: value.replace(/"/g, ""),
      value: value.replace(/"/g, ""),
    });
    const name = interfaceDeclaration.getName();
    if (
      interfaceDeclaration.getExtends().some((i) => i.getText() === "BaseError")
    ) {
      errorTypes.push(
        interfaceDeclaration
          .getPropertyOrThrow("__typename")
          .getType()
          .getText()
      );
    }

    /**
     * Typeguard fns
     */
    sf.addFunction({
      name: `is${name}`,
      isExported: true,
      parameters: [{ name: "val", type: "unknown" }],
      returnType: `val is {__typename?: ${value}}`,
      statements: (w) => w.writeLine(`return hasTypeName(val, ${value});`),
    });

    /**
     * Union-narrowing utility types
     */
    sf.addTypeAlias({
      name: `NarrowTo${name}`,
      typeParameters: [
        {
          name: "T",
        },
      ],
      isExported: true,
      type: (w) =>
        w.writeLine(`T extends { __typename ?: ${value} } ? T : never`),
    });
  }
});

sf.addEnum({
  name: "ObjectType",
  isExported: true,
  members: objectTypes,
});

if (errorTypes.length) {
  const returnType = errorTypes.join(" | ");

  sf.addFunction({
    name: "isBaseError",
    isExported: true,
    parameters: [
      {
        name: "val",
        type: "any",
      },
    ],
    returnType: `val is { __typename?: ${returnType} }`,
    statements: (w) =>
      w.writeLine(
        `return val && val.__typename && (${errorTypes
          .map((errorType) => `val.__typename === ${errorType}`)
          .join(" || ")})`
      ),
  });
}

project.save();

function trimTrailing(str: string, tailLength: number) {
  return str.substring(0, str.length - tailLength);
}

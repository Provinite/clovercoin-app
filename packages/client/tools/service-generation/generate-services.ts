/**
 * @file
 * This script uses ts-morph to augment the graphql-codegen generated data with a helper class
 * providing type-safe access to graphql queries outside react.
 */
import { Project, Scope } from "ts-morph";
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

const serviceClass = sf.addClass({
  name: "GraphqlService",
  isExported: true,
  ctors: [
    {
      parameters: [
        {
          scope: Scope.Protected,
          name: "client",
          type: "Apollo.ApolloClient<any>",
        },
      ],
    },
  ],
});

for (const operation of operations) {
  const operationResultType = `${operation.name}${operation.type}`;
  const operationVariablesType = `${operationResultType}Variables`;
  const operationDocumentType = `${operation.name}Document`;

  const optionsType =
    operation.type === "Mutation"
      ? `Apollo.MutationOptions<${operationResultType}, ${operationVariablesType}>`
      : `Apollo.QueryOptions<${operationVariablesType}, ${operationResultType}>`;
  serviceClass.addMethod({
    name: operation.name[0].toLowerCase() + operation.name.substring(1),
    isAsync: true,
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
        .writeLine(``)
        .writeLine(
          `const finalOptions = {
              ...options,
              ${operation.type.toLowerCase()}: ${operationDocumentType},
            };`
        )
        .writeLine(
          `return this.client.${
            operation.type === "Query" ? "query" : "mutate"
          }<${operationResultType},${operationVariablesType}>(finalOptions);`
        ),
  });
}

project.save();

function trimTrailing(str: string, tailLength: number) {
  return str.substring(0, str.length - tailLength);
}

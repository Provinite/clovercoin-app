/**
 * @file Script to generate the environment variable documentation.
 */
import { Node, Project, SyntaxKind, ts } from "ts-morph";

const project = new Project();
const file = project.addSourceFileAtPath("./src/environment.ts");
const optionalUsages = file
  .getFunctionOrThrow("optional")
  .findReferencesAsNodes();
const requiredUsages = file
  .getFunctionOrThrow("required")
  .findReferencesAsNodes();

function getComment(node: Node<ts.Node> | undefined): string | undefined {
  if (!node) {
    return undefined;
  }
  const commentRanges = node.getLeadingCommentRanges();
  if (commentRanges.length) {
    return commentRanges
      .map((cr) => file.getDescendantAtPos(cr.getPos()))
      .map((node) => node?.getText())
      .filter((v) => v)
      .join(" ")
      .replaceAll(/\s+/g, " ")
      .replaceAll(/[/]?[*]+[/]?/g, "");
  }
  return getComment(node.getParent());
}

let mdOutput = `Variable | Required | Description | \n`;
mdOutput += `--- | --- | --- | \n`;
const rows: string[][] = [];
for (const usage of optionalUsages) {
  const comment = getComment(usage) ?? "Undocumented";
  const variableName = usage
    .getFirstAncestorByKindOrThrow(SyntaxKind.CallExpression)
    .getArguments()[0]
    .asKindOrThrow(SyntaxKind.StringLiteral)
    .getLiteralText();

  rows.push([variableName, "`false`", comment]);
}
for (const usage of requiredUsages) {
  const comment = getComment(usage) ?? "Undocumented";
  const variableName = usage
    .getFirstAncestorByKindOrThrow(SyntaxKind.CallExpression)
    .getArguments()[0]
    .asKindOrThrow(SyntaxKind.StringLiteral)
    .getLiteralText();

  rows.push([variableName, "`true`", comment]);
}
mdOutput += rows.map((row) => row.join("|")).join("\n");
console.log(mdOutput);

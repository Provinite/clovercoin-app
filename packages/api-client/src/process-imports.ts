import { load } from "js-yaml";
import { promises } from "fs";
import glob from "glob";
import { resolve } from "path";
import { Kind, Source, parse, visit } from "graphql";
(async () => {
  const ymlString = await promises.readFile("codegen.yml", {
    encoding: "utf-8",
  });
  const codegenConfig: any = await load(ymlString);

  // console.log(codegenConfig.documents);

  const graphqlFiles = await new Promise<string[]>((res, rej) =>
    glob(codegenConfig.documents, (err, matches) => {
      if (err) return rej(err);
      return res(matches.map((v) => resolve(v)));
    })
  );

  const modules: Record<string, GraphqlModule> = {};

  for (const graphqlFile of graphqlFiles) {
    modules[graphqlFile] = {
      fileName: graphqlFile,
      status: "pending",
      dependencies: [],
      providesFragments: {},
    };
  }

  for (const graphqlFile of graphqlFiles) {
    const fileContents = await promises.readFile(graphqlFile, {
      encoding: "utf-8",
    });
    const source = new Source(fileContents, graphqlFile);
    const documentRoot = parse(source);
    visit(documentRoot, {
      enter: (node, key, parent, path, ancestors) => {
        if (node.kind === Kind.STRING) {
          console.log(node.value);
        }
      },
      leave: (node, key, parent, path, ancestors) => {},
    });
  }
})();

interface GraphqlModule {
  fileName: string;
  status: "pending" | "started" | "finished";
  dependencies: [string, string][];
  providesFragments: Record<string, null>;
}

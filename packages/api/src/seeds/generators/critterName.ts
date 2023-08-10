import { uniqueNamesGenerator, colors, animals } from "unique-names-generator";
import softWords from "./soft-words.json" assert { type: "json" };

export const critterName = () =>
  uniqueNamesGenerator({
    dictionaries: [softWords, colors, animals],
    length: 3,
    separator: " ",
    style: "capital",
  });

import {
  uniqueNamesGenerator,
  adjectives,
  animals,
} from "unique-names-generator";
import softWords from "./soft-words.json" assert { type: "json" };

export const speciesName = () =>
  uniqueNamesGenerator({
    dictionaries: [adjectives, softWords, animals],
    length: 3,
    separator: " ",
    style: "capital",
  });

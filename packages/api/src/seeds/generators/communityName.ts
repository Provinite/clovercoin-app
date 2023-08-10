import {
  uniqueNamesGenerator,
  colors,
  adjectives,
} from "unique-names-generator";

export const communityName = () =>
  uniqueNamesGenerator({
    dictionaries: [adjectives, colors],
    length: 2,
    separator: " ",
    style: "capital",
  });

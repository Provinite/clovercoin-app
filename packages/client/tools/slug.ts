import { uuidToSlug } from "../src/utils/uuidUtils";

try {
  const uuid = process.argv[2];
  console.log(uuidToSlug(uuid));
} catch (e) {
  console.error("Invalid uuid. Usage: `yarn slug uuid`");
}

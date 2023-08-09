import { slugToUuid, uuidToSlug } from "../src/utils/uuidUtils";

try {
  const [_, __, action, val] = process.argv;
  if (action === "--uuid" || action === "-u") {
    console.log(uuidToSlug(val));
  } else if (action === "--slug" || action === "-s") {
    console.log(slugToUuid(val));
  } else {
    throw new Error(`Unknown action, ${action}`);
  }
} catch (e) {
  console.error(e);
  console.error(
    "Invalid uuid/slug. Usage: `yarn slug --uuid uuid or yarn slug --slug slug`"
  );
}

import { graphqlService } from "../../graphql/client";
import { makeLoader } from "../../utils/loaderUtils";

export const userSettingsLoader = makeLoader({}, async () => {
  const {
    data: { me },
  } = await graphqlService.getUserSettings({
    variables: {},
  });

  return me;
});

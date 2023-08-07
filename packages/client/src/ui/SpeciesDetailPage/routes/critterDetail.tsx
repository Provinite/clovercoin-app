import { isBaseError } from "@clovercoin/api-client";
import { graphqlService } from "../../../client";
import { makeAction, makeLoader } from "../../../utils/loaderUtils";

export const critterDetailAction = makeAction(
  {
    slugs: {
      critterSlug: true,
    },
    allowedMethods: ["PUT"],
  },
  async () => {
    // noop
  }
);
export const critterDetailLoader = makeLoader(
  {
    slugs: {
      critterSlug: true,
    },
  },
  async ({ ids: { critterId } }) => {
    const {
      data: { critters },
    } = await graphqlService.getCritters({
      variables: {
        filters: {
          id: critterId,
        },
      },
    });

    if (isBaseError(critters)) {
      throw new Error(critters.message);
    }
    return critters.list[0];
  }
);

import { isBaseError } from "@clovercoin/api-client";
import gql from "graphql-tag";
import { graphqlService } from "../../../graphql/client";
import { makeAction, makeLoader } from "../../../utils/loaderUtils";

// TODO: This cache modification probably kind of invalidates some
// sorting in the character list. Need to be able to reimplement sort?
// Or just delete the entire list.
export const critterDetailAction = makeAction(
  {
    slugs: {
      critterSlug: true,
    },
    form: {
      name: true,
      variantId: true,
      traitIds: {
        all: true,
        required: false,
      },
      traitValues: {
        all: true,
        required: false,
      },
    },
    allowedMethods: ["PUT"],
  },
  async ({
    form: { name, traitIds, traitValues, variantId },
    ids: { critterId },
  }) => {
    const finalValues = traitIds.map((traitId, i) => ({
      traitId,
      value: traitValues[i],
    }));
    await graphqlService.modifyCritter({
      variables: {
        input: {
          id: critterId,
          name,
          traitValues: finalValues.length ? finalValues : undefined,
          traitListId: variantId,
        },
      },
      update: (cache, result) => {
        const newCritter = result.data?.modifyCritter;
        if (isBaseError(newCritter) || !newCritter) {
          return;
        }
        cache.updateFragment(
          {
            id: cache.identify({ __typename: "Critter", id: critterId }),
            fragment: gql`
              fragment Update on Critter {
                id
                name
                traitValues {
                  traitId
                  value
                }
                traitListId
                traitList {
                  id
                  name
                }
              }
            `,
          },
          () => newCritter
        );
      },
    });
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

/**
 * @file Route configuration and loaders/actions for species
 * detail routes.
 */
import { graphqlService, uploadService } from "../../../graphql/client";
import {
  CritterCreateTraitInput,
  CritterListResponse,
  CritterTraitValueType,
  EnumValueSetting,
  ImageContentType,
  isBaseError,
  isCritterList,
  isDeleteResponse,
  isEnumValueSetting,
  isNotAuthorizedError,
  isTrait,
  isUrlResponse,
} from "@clovercoin/api-client";
import { typedRouteConfig } from "../../../routes";
import { AddTraitCard } from "../AddTraitCard/AddTraitCard";
import { EditTraitCard } from "../AddTraitCard/EditTraitCard";
import { SpeciesDetailPageProvider } from "../SpeciesDetailPageProvider";
import { TraitListCard } from "../TraitListCard/TraitListCard";
import { TraitListDetailCard } from "../TraitListDetailCard/TraitListDetailCard";
import { VariantListCard } from "../VariantListCard/VariantListCard";
import {
  getLoaderData,
  makeAction,
  makeLoader,
} from "../../../utils/loaderUtils";
import { isFiniteNumber } from "../../util/isFiniteNumber";
import gql from "graphql-tag";
import { SpeciesIndex } from "../SpeciesIndex/SpeciesIndex";
import { ConnectedAddCritterCard } from "../AddCritterCard/AddCritterCard";
import { EditCritterCard } from "../EditCritterCard/EditCritterCard";
import { critterDetailAction, critterDetailLoader } from "./critterDetail";

/**
 * Species detail route configuration. Intended to be registered
 * as a child of the community detail route.
 */
export const SpeciesDetailRoutes = () =>
  typedRouteConfig({
    id: "root.community.species",
    path: "species/:speciesId",
    loader: speciesDetailLoader,
    action: speciesDetailAction,
    element: <SpeciesDetailPageProvider />,
    children: [
      {
        id: "root.community.species.index",
        index: true,
        loader: speciesDetailIndexLoader,
        element: <SpeciesIndex />,
      },
      {
        id: "root.community.species.critter",
        path: "critter/:critterSlug",
        action: critterDetailAction,
        loader: critterDetailLoader,
        element: <EditCritterCard />,
      },
      {
        id: "root.community.species.add-critter",
        path: "add",
        action: critterCreateAction,
        element: <ConnectedAddCritterCard />,
      },
      {
        id: "root.community.species.traits",
        path: "traits",
        loader: traitListLoader,
        action: traitListAction,
        children: [
          {
            id: "root.community.species.traits.index",
            index: true,
            element: <TraitListCard />,
          },
          {
            id: "root.community.species.traits.trait",
            path: ":traitId",
            element: <EditTraitCard />,
            action: traitDetailAction,
          },
        ],
      },
      {
        id: "root.community.species.trait-add",
        path: "traits/add",
        element: <AddTraitCard />,
      },
      {
        id: "root.community.species.variants",
        path: "variants",
        action: variantListAction,
        element: <VariantListCard />,
      },
      {
        id: "root.community.species.variant",
        path: "variants/:variantSlug",
        loader: traitListLoader,
        action: variantDetailAction,
        element: <TraitListDetailCard />,
        children: [
          {
            id: "root.community.species.variant.entry",
            path: "entries/:traitListEntrySlug",
            action: variantTraitListEntryDetailAction,
            children: [
              {
                id: "root.community.species.variant.entry.enumValueSettings",
                path: "enumValueSettings",
                action: enumValueSettingListAction,
              },
              {
                id: "root.community.species.variant.entry.enumValueSetting",
                path: "enumValueSettings/:enumValueSettingSlug",
                action: enumValueSettingDetailAction,
              },
            ],
          },
        ],
      },
    ],
  });

/**
 * Action for variant traitlist entry detail route. Supports
 * DELETE only.
 */
const variantTraitListEntryDetailAction = makeAction(
  {
    slugs: { traitListEntrySlug: true, speciesId: true },
    allowedMethods: ["delete", "patch"],
  },
  async ({ method, data, ids: { traitListEntryId, speciesId } }) => {
    if (method.toLowerCase() === "delete") {
      await graphqlService.deleteTraitListEntry({
        variables: {
          id: traitListEntryId,
        },
        update: (cache) => {
          cache.modify({
            fields: {
              species: (data, { DELETE, storeFieldName }) => {
                if (storeFieldName.includes(speciesId)) {
                  return DELETE;
                }
                return data;
              },
            },
          });
        },
      });
    } else if (method.toLowerCase() === "patch") {
      const {
        form: { order, required },
      } = await getLoaderData({
        data,
        form: {
          required: false,
          order: false,
        },
      });
      const input = {
        id: traitListEntryId,
        order: isFiniteNumber(Number(order)) ? Number(order) : undefined,
        required: { true: true, false: false }[required ?? ""],
      };

      await graphqlService.modifyTraitListEntry({
        variables: {
          input,
        },
      });
    }
  }
);

/**
 * Action for variant list. Supports POST for creating
 * variants on a species.
 */
const variantListAction = makeAction(
  {
    slugs: { speciesId: true },
    form: {
      name: true,
    },
    allowedMethods: ["post"],
  },
  async ({ ids: { speciesId }, form: { name } }) => {
    const {
      data: { createSpeciesVariant },
    } = await graphqlService.createVariant({
      variables: {
        input: {
          name,
          speciesId,
        },
      },
      update: (cache, { data }) => {
        if (!isBaseError(data)) {
          cache.modify({
            fields: {
              species: (_data, { DELETE, storeFieldName }) => {
                if (storeFieldName.includes(speciesId)) return DELETE;
              },
            },
          });
        }
      },
    });

    return createSpeciesVariant;
  }
);

/**
 * Action for variant detail route. Supports POST only.
 * Used to create new TraitListEntries on variants' traitlists.
 */
const variantDetailAction = makeAction(
  {
    slugs: { variantSlug: true, speciesId: true },
    allowedMethods: ["post"],
    form: {
      traitId: true,
    },
  },
  async ({ form: { traitId }, ids: { speciesId, variantId } }) => {
    await graphqlService.createTraitListEntry({
      variables: {
        input: {
          order: 1,
          traitId,
          traitListId: variantId,
          required: false,
        },
      },
      update: (cache) => {
        cache.modify({
          fields: {
            species: (data, { DELETE, storeFieldName }) => {
              if (storeFieldName.includes(speciesId)) {
                return DELETE;
              }
              return data;
            },
          },
        });
      },
    });
  }
);

/**
 * Data loader for species detail route.
 */
const speciesDetailLoader = makeLoader(
  {
    name: "speciesDetailLoader",
    slugs: { communityId: true, speciesId: true },
  },
  async ({ ids: { communityId, speciesId } }) => {
    const { data } = await graphqlService.getSpeciesDetail({
      variables: {
        filters: {
          id: speciesId,
          communityId,
        },
      },
    });
    if (isNotAuthorizedError(data.species)) {
      return data.species;
    }
    if (isBaseError(data.species)) {
      throw new Error(data.species.message);
    }

    return data.species.list[0];
  }
);

/**
 * Action for the species detail route. Allows updating the iconUrl
 * @param
 */
const speciesDetailAction = makeAction(
  {
    slugs: {
      speciesId: true,
      communityId: true,
    },
    allowedMethods: ["patch"],
    form: {
      iconUrl: {
        file: true,
        required: true,
      },
    },
  },
  async ({ ids: { speciesId, communityId }, form: { iconUrl } }) => {
    const {
      data: { createSpeciesImageUploadUrl },
    } = await graphqlService.createSpeciesImageUploadUrl({
      variables: {
        input: {
          contentType: ImageContentType.Png,
          speciesId,
        },
      },
      update: (cache, { data }) => {
        if (isBaseError(data?.createSpeciesImageUploadUrl)) {
          return;
        }
        // clear out this species list and any detail fetches
        cache.modify({
          fields: {
            species: (data, { DELETE, storeFieldName }) => {
              if (
                storeFieldName.includes(speciesId) ||
                storeFieldName.includes(communityId)
              ) {
                return DELETE;
              }
              return data;
            },
          },
        });
      },
    });

    if (isUrlResponse(createSpeciesImageUploadUrl)) {
      // actually upload the image
      await uploadService.put(createSpeciesImageUploadUrl.url, iconUrl);
      return;
    }

    return createSpeciesImageUploadUrl;
  }
);

const speciesDetailIndexLoader = makeLoader(
  { name: "speciesDetailIndexLoader", slugs: { speciesId: true } },
  async ({ ids: { speciesId } }) => {
    const { data } = await graphqlService.getCritters({
      variables: {
        filters: {
          speciesId,
        },
      },
    });
    if (isBaseError(data.critters)) {
      throw new Error(data.critters.message);
    }

    return data.critters.list;
  }
);

/**
 * Action for creating a critter
 */
const critterCreateAction = makeAction(
  {
    allowedMethods: ["POST"],
    slugs: {
      speciesId: true,
      communityId: true,
    },
    form: {
      name: true,
      variantId: true,
      traits: {
        all: true,
      },
      values: {
        all: true,
      },
    },
  },
  async ({
    form: { name, traits, values, variantId },
    ids: { speciesId, communityId },
  }) => {
    const traitValues = traits.map<CritterCreateTraitInput>((traitId, i) => ({
      traitId,
      value: values[i],
    }));
    await graphqlService.createCritter({
      variables: {
        input: {
          name,
          speciesId,
          variantId,
          traitValues,
          ownerId: graphqlService.getTokenPayload().identity.id,
        },
      },
      update: (cache, result) => {
        const newCritter = result.data?.createCritter;
        if (isBaseError(newCritter) || !newCritter) {
          return;
        }
        // delete critter lists that could possibly include the new critter
        cache.modify({
          fields: {
            critters: (
              data: CritterListResponse,
              { DELETE, storeFieldName }
            ) => {
              if (!isCritterList(data)) {
                return data;
              }
              if (
                storeFieldName.includes(communityId) ||
                storeFieldName.includes(speciesId)
              ) {
                return DELETE;
              }
              return data;
            },
          },
        });
      },
    });
  }
);

/**
 * Loader for species trait list
 */
const traitListLoader = makeLoader(
  {
    name: "traitListLoader",
    slugs: { speciesId: true },
  },
  async ({ ids: { speciesId } }) => {
    const result = await graphqlService.getSpeciesTraits({
      variables: {
        filters: {
          speciesId,
        },
      },
    });

    return result.data;
  }
);

/**
 * Action handler for species trait list route
 */
const traitListAction = makeAction(
  {
    slugs: { speciesId: true },
    form: {
      name: true,
      valueType: true,
      enumValues: {
        all: true,
        required: false,
      },
    },
    allowedMethods: ["post"],
  },
  async ({ ids: { speciesId }, form: { enumValues, name, valueType } }) => {
    let i = 0;
    const { data } = await graphqlService.createSpeciesTrait({
      variables: {
        input: {
          name,
          valueType: valueType as CritterTraitValueType,
          speciesId: speciesId,
          enumValues: enumValues
            .filter((v) => v)
            .map((name) => ({ name, order: i++ })),
        },
      },
      update(cache, { data }) {
        if (isTrait(data!.createTrait)) {
          cache.modify({
            fields: {
              traits: (_data, { DELETE, storeFieldName }) => {
                if (storeFieldName.includes(speciesId!)) {
                  return DELETE;
                }
              },
            },
          });
        }
      },
    });

    return data.createTrait;
  }
);

/**
 * Action handler for the trait details route.
 * Supports PUT and DELETE.
 */
const traitDetailAction = makeAction(
  {
    allowedMethods: ["delete", "put"],
    slugs: {
      traitId: true,
      speciesId: true,
    },
    form: {
      id: true,
      name: true,
      valueType: true,
      enumValues: { all: true, required: true },
      enumValueId: {
        all: true,
        required: true,
      },
    },
  },
  async ({
    method,
    ids: { traitId, speciesId },
    form: { id, name, valueType, enumValues, enumValueId },
  }) => {
    if (method === "DELETE") {
      await graphqlService.deleteTrait({
        variables: {
          id: traitId,
        },
        update(cache) {
          cache.evict({
            id: cache.identify({
              id: traitId,
              __typename: "Trait",
            }),
          });
          cache.gc();
        },
      });
    } else if (method === "PUT") {
      if (enumValues.length !== enumValueId.length) {
        throw new Error("400");
      }

      const result = await graphqlService.modifySpeciesTrait({
        variables: {
          input: {
            id,
            name,
            valueType: valueType as CritterTraitValueType,
            enumValues: enumValues
              .map((name, i) => ({
                name,
                id: enumValueId[i] || undefined,
                order: i,
              }))
              .filter(({ name }) => name),
          },
        },
        update(cache, { data }) {
          if (!data || isBaseError(data.modifyTrait)) {
            return;
          }
          cache.modify({
            fields: {
              traits: (data, { DELETE, storeFieldName }) => {
                if (storeFieldName.includes(speciesId)) {
                  return DELETE;
                }
                return data;
              },
            },
          });
        },
      });
      return result.data.modifyTrait;
    }
  }
);

/**
 * Action handler for the enum value setting list route
 */
const enumValueSettingListAction = makeAction(
  {
    allowedMethods: ["POST"],
    form: {
      enumValueId: true,
    },
    slugs: {
      variantSlug: true,
    },
  },
  async ({ ids: { variantId }, form: { enumValueId } }) => {
    return graphqlService.createEnumValueSetting({
      variables: {
        input: {
          enumValueId,
          speciesVariantId: variantId,
        },
      },
      update: (cache, { data }) => {
        if (data && isEnumValueSetting(data.createEnumValueSetting)) {
          const cachedData = cache.readFragment<{
            enumValueSettings: Partial<EnumValueSetting>[];
          }>({
            id: `TraitList:${variantId}`,
            fragment: gql`
              fragment Settings on SpeciesVariant {
                enumValueSettings {
                  id
                  enumValueId
                  speciesVariantId
                }
              }
            `,
          });
          if (!cachedData) {
            return;
          }
          const { enumValueSettings } = cachedData;
          cache.writeFragment({
            id: `TraitList:${variantId}`,
            fragment: gql`
              fragment Settings on SpeciesVariant {
                enumValueSettings {
                  __typename
                  id
                  enumValueId
                  speciesVariantId
                }
              }
            `,
            data: {
              enumValueSettings: [
                ...enumValueSettings,
                data.createEnumValueSetting,
              ],
            },
          });
        }
      },
    });
  }
);

/**
 * Action handler for the enum value setting detail route
 */
const enumValueSettingDetailAction = makeAction(
  {
    allowedMethods: ["delete"],
    slugs: {
      variantSlug: true,
      enumValueSettingSlug: true,
    },
  },
  async ({ ids: { enumValueSettingId } }) => {
    return graphqlService.deleteEnumValueSetting({
      variables: {
        id: enumValueSettingId,
      },
      update: (cache, { data }) => {
        if (isDeleteResponse(data?.deleteEnumValueSetting)) {
          cache.evict({
            id: cache.identify({
              __typename: "EnumValueSetting",
              id: enumValueSettingId,
            }),
          });
          cache.gc();
        }
      },
    });
  }
);

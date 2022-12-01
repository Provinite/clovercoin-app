/**
 * @file Route configuration and loaders/actions for species
 * detail routes.
 */
import { LoaderFunctionArgs, ActionFunctionArgs } from "react-router-dom";
import { graphqlService } from "../../client";
import { CritterTraitValueType } from "@clovercoin/api-client";
import { typedRouteConfig } from "../../routes";
import { slugToUuid } from "../../utils/uuidUtils";
import { AddTraitCard } from "./AddTraitCard/AddTraitCard";
import { EditTraitCard } from "./AddTraitCard/EditTraitCard";
import { SpeciesDetailPageProvider } from "./SpeciesDetailPageProvider";
import { SpeciesSummaryCard } from "./SummaryCard/SpeciesSummaryCard";
import { TraitListCard } from "./TraitListCard/TraitListCard";
import { TraitListDetailCard } from "./TraitListDetailCard/TraitListDetailCard";
import { TraitListListCard } from "./TraitListListCard/TraitListListCard";

/**
 * Species detail route configuration. Intended to be registered
 * as a child of the community detail route.
 */
export const SpeciesDetailRoutes = typedRouteConfig({
  id: "root.community.species",
  path: "species/:speciesId",
  loader: speciesDetailLoader,
  element: <SpeciesDetailPageProvider />,
  children: [
    {
      id: "root.community.species.index",
      index: true,
      element: <SpeciesSummaryCard />,
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
      path: "trait-lists",
      element: <TraitListListCard />,
    },
    {
      id: "root.community.species.variant",
      path: "trait-lists/:traitListId",
      element: <TraitListDetailCard />,
    },
  ],
} as const);

/**
 * Data loader for species detail
 */
async function speciesDetailLoader({
  params: { communityId, speciesId },
}: LoaderFunctionArgs) {
  if (!communityId) {
    throw new Error("Missing community id in route");
  }
  if (!speciesId) {
    throw new Error("Missing species id in route");
  }
  communityId = slugToUuid(communityId);
  speciesId = slugToUuid(speciesId);

  const result = await graphqlService.getSpeciesDetail({
    variables: {
      filters: {
        id: speciesId,
        communityId,
      },
    },
  });

  return result.data.species[0];
}

/**
 * Loader for species trait list
 */
async function traitListLoader({ params: { speciesId } }: LoaderFunctionArgs) {
  if (!speciesId) {
    throw new Error("Invalid species id");
  }
  speciesId = slugToUuid(speciesId);
  const result = await graphqlService.getSpeciesTraits({
    variables: {
      filters: {
        speciesId,
      },
    },
  });

  return result.data;
}

/**
 * Action handler for species trait list route
 */
async function traitListAction({
  params: { speciesId },
  request,
}: LoaderFunctionArgs) {
  if (request.method === "POST") {
    if (!speciesId) {
      throw new Error("Invalid species id");
    }
    speciesId = slugToUuid(speciesId);
    const formData = await request.formData();
    let i = 0;
    await graphqlService.createSpeciesTrait({
      variables: {
        input: {
          name: formData.get("name") as string,
          valueType: formData.get("valueType") as CritterTraitValueType,
          speciesId: speciesId,
          enumValues: formData
            .getAll("enumValues")
            .filter((v) => typeof v === "string" && v !== "")
            .map((name) => ({ name: name as string, order: i++ })),
        },
      },
      update(cache) {
        cache.modify({
          fields: {
            traits: (_data, { DELETE, storeFieldName }) => {
              if (storeFieldName.includes(speciesId!)) {
                return DELETE;
              }
            },
          },
        });
      },
    });
  }
}

/**
 * Action handler for the trait details route
 */
async function traitDetailAction({
  params: { traitId: traitSlug, speciesId: speciesSlug },
  request,
}: ActionFunctionArgs) {
  if (request.method === "DELETE") {
    if (!traitSlug) {
      throw new Error("Invalid trait id");
    }
    const traitId = slugToUuid(traitSlug);
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
  } else if (request.method === "PUT") {
    const formData = await request.formData();
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const dataType = formData.get("valueType") as string;
    const enumValues = formData.getAll("enumValues") as string[];
    const enumValueIds = formData.getAll("enumValueId") as string[];

    if (enumValues.length !== enumValueIds.length) {
      throw new Error("400");
    }
    const speciesId = slugToUuid(speciesSlug!);

    const input = {
      id,
      name,
      valueType: dataType as CritterTraitValueType,
      enumValues: enumValues
        .map((name, i) => ({
          name,
          id: enumValueIds[i],
          order: i,
        }))
        .filter(({ name }) => name),
    };

    console.log(input);
    await graphqlService.modifySpeciesTrait({
      variables: {
        input: input,
      },
      update(cache) {
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
  }
}

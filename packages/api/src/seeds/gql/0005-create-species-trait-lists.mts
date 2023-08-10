import { isBaseError } from "@clovercoin/api-client";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import type { GraphQLClient } from "graphql-request";
import { gql } from "graphql-tag";
import { logger } from "../../util/logger.js";
import Seed0003CreateSpecies from "./0003-create-species.mjs";
import { GetResultFn } from "./_seeds.mjs";

export default class Seed0005CreateSpeciesTraitLists {
  async up(client: GraphQLClient, getResult: GetResultFn) {
    type MakeTraitListVars = {
      speciesId: string;
      name: Seed0005SpeciesTraitListName;
    };
    type TraitList = { id: string; name: string };
    const { species } = getResult(Seed0003CreateSpecies);
    const makeTraitListQuery: TypedDocumentNode<
      {
        createTraitList:
          | TraitList
          | {
              __typename: "DuplicateError" | "InvalidArgumentError";
              message: string;
            };
      },
      MakeTraitListVars
    > = gql`
      mutation makeTraitList($speciesId: ID!, $name: String!) {
        createTraitList(input: { name: $name, speciesId: $speciesId }) {
          __typename
          ... on TraitList {
            id
            name
          }

          ... on DuplicateError {
            message
          }
          ... on InvalidArgumentError {
            message
          }
          ... on BaseError {
            message
          }
        }
      }
    `;

    const traitLists: Record<Seed0005SpeciesTraitListName, TraitList> =
      {} as any;
    const traitDefinitions: Omit<MakeTraitListVars, "speciesId">[] = [
      {
        name: Seed0005SpeciesTraitListName.Common,
      },
      {
        name: Seed0005SpeciesTraitListName.Rare,
      },
      {
        name: Seed0005SpeciesTraitListName.VeryRare,
      },
      {
        name: Seed0005SpeciesTraitListName.Special,
      },
    ];
    for (const definition of traitDefinitions) {
      const { createTraitList: traitList } = await client.request(
        makeTraitListQuery,
        {
          ...definition,
          speciesId: species.id,
        }
      );
      if (isBaseError(traitList)) {
        logger.error({
          message: "Error during seed",
          errorName: traitList.__typename,
          errorMessage: traitList.message,
          query: "createTrait",
          error: traitList,
        });
        throw traitList;
      }
      traitLists[definition.name] = traitList;
    }

    return { traitLists };
  }
}

export enum Seed0005SpeciesTraitListName {
  Common = "Common",
  Rare = "Rare",
  VeryRare = "VeryRare",
  Special = "Special",
}

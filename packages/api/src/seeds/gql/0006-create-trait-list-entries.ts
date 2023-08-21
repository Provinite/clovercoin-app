import { isBaseError } from "@clovercoin/api-client";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import type { GraphQLClient } from "graphql-request";
import { gql } from "graphql-tag";
import { logger } from "../../util/logger.js";
import Seed0004CreateSpeciesTraits, {
  Seed0004TraitName,
} from "./0004-create-species-traits.js";
import Seed0005CreateSpeciesTraitLists from "./0005-create-species-trait-lists.js";
import { GetResultFn } from "./_seeds.mjs";

export default class Seed0006CreateSpeciesTraits {
  async up(client: GraphQLClient, getResult: GetResultFn) {
    type MakeTraitListEntryVars = {
      traitId: string;
      traitListId: string;
      order: number;
      required?: boolean;
    };
    type TraitListEntry = { __typename: "TraitListEntry"; id: string };
    const { speciesVariants } = getResult(Seed0005CreateSpeciesTraitLists);
    const { traits } = getResult(Seed0004CreateSpeciesTraits);
    const makeTraitListEntryQuery: TypedDocumentNode<
      {
        createTraitListEntry:
          | TraitListEntry
          | {
              __typename: "DuplicateError" | "InvalidArgumentError";
              message: string;
            };
      },
      MakeTraitListEntryVars
    > = gql`
      mutation makeTraitListEntry(
        $traitId: ID!
        $traitListId: ID!
        $order: Int!
        $required: Boolean
      ) {
        createTraitListEntry(
          input: {
            traitId: $traitId
            traitListId: $traitListId
            order: $order
            required: $required
          }
        ) {
          __typename
          ... on TraitListEntry {
            id
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

    // add all traits to all trait lists
    for (const traitList of Object.values(speciesVariants)) {
      let { createTraitListEntry } = await client.request(
        makeTraitListEntryQuery,
        {
          order: 0,
          traitId: traits[Seed0004TraitName.Size].id,
          traitListId: traitList.id,
          required: true,
        }
      );
      if (isBaseError(createTraitListEntry)) {
        logger.error({
          message: "Error during seed",
          errorName: createTraitListEntry.__typename,
          errorMessage: createTraitListEntry.message,
          query: "makeTraitListEntry",
          error: createTraitListEntry,
        });
        throw createTraitListEntry;
      }

      ({ createTraitListEntry } = await client.request(
        makeTraitListEntryQuery,
        {
          order: 1,
          traitId: traits[Seed0004TraitName.Length].id,
          traitListId: traitList.id,
          required: false,
        }
      ));
      if (isBaseError(createTraitListEntry)) {
        logger.error({
          message: "Error during seed",
          errorName: createTraitListEntry.__typename,
          errorMessage: createTraitListEntry.message,
          query: "makeTraitListEntry",
          error: createTraitListEntry,
        });
        throw createTraitListEntry;
      }

      ({ createTraitListEntry } = await client.request(
        makeTraitListEntryQuery,
        {
          order: 2,
          traitId: traits[Seed0004TraitName.AdditionalBodyMods].id,
          traitListId: traitList.id,
          required: false,
        }
      ));
      if (isBaseError(createTraitListEntry)) {
        logger.error({
          message: "Error during seed",
          errorName: createTraitListEntry.__typename,
          errorMessage: createTraitListEntry.message,
          query: "makeTraitListEntry",
          error: createTraitListEntry,
        });
        throw createTraitListEntry;
      }
    }
  }
}

export enum Seed0005SpeciesTraitLists {
  Common = "Common",
  Rare = "Rare",
  VeryRare = "VeryRare",
  Special = "Special",
}

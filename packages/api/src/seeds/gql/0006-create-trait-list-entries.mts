import { isBaseError } from "@clovercoin/api-client";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import type { GraphQLClient } from "graphql-request";
import { gql } from "graphql-tag";
import { logger } from "../../util/logger.js";
import Seed0004CreateSpeciesTraits, {
  Seed0004TraitName,
} from "./0004-create-species-traits.mjs";
import Seed0005CreateSpeciesTraitLists, {
  Seed0005SpeciesTraitListName,
} from "./0005-create-species-trait-lists.mjs";
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
    const { traitLists } = getResult(Seed0005CreateSpeciesTraitLists);
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
    for (const traitList of Object.values(traitLists)) {
      await client.request(makeTraitListEntryQuery, {
        order: 0,
        traitId: traits[Seed0004TraitName.Size].id,
        traitListId: traitList.id,
        required: true,
      });
      await client.request(makeTraitListEntryQuery, {
        order: 1,
        traitId: traits[Seed0004TraitName.Length].id,
        traitListId: traitList.id,
        required: false,
      });
      await client.request(makeTraitListEntryQuery, {
        order: 2,
        traitId: traits[Seed0004TraitName.AdditionalBodyMods].id,
        traitListId: traitList.id,
        required: false,
      });
    }

    const traitListEntryDefinitions: MakeTraitListEntryVars[] = [
      {
        order: 0,
        traitId: traits[Seed0004TraitName.Size].id,
        traitListId: traitLists[Seed0005SpeciesTraitListName.Common].id,
      },
      {
        order: 0,
        traitId: traits[Seed0004TraitName.Size].id,
        traitListId: traitLists[Seed0005SpeciesTraitListName.Common].id,
      },
      {
        order: 0,
        traitId: traits[Seed0004TraitName.Size].id,
        traitListId: traitLists[Seed0005SpeciesTraitListName.Common].id,
      },
    ];
    for (const definition of traitListEntryDefinitions) {
      const { createTraitListEntry: traitListEntry } = await client.request(
        makeTraitListEntryQuery,
        {
          ...definition,
        }
      );
      if (isBaseError(traitListEntry)) {
        logger.error({
          message: "Error during seed",
          errorName: traitListEntry.__typename,
          errorMessage: traitListEntry.message,
          query: "makeTraitListEntry",
          error: traitListEntry,
        });
        throw traitListEntry;
      }
    }

    return {};
  }
}

export enum Seed0005SpeciesTraitLists {
  Common = "Common",
  Rare = "Rare",
  VeryRare = "VeryRare",
  Special = "Special",
}

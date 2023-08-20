import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import type { GraphQLClient } from "graphql-request";
import { gql } from "graphql-tag";
import { v4 } from "uuid";
import { critterName } from "../generators/critterName.js";
import Seed0001Register from "./0001-register.js";
import Seed0003CreateSpecies from "./0003-create-species.js";
import Seed0004CreateSpeciesTraits, {
  Seed0004TraitName,
} from "./0004-create-species-traits.js";
import Seed0005CreateSpeciesTraitLists, {
  Seed0005SpeciesTraitListName,
} from "./0005-create-species-trait-lists.js";
import { GetResultFn } from "./_seeds.mjs";

export default class Seed0008CreateCritters {
  async up(client: GraphQLClient, getResult: GetResultFn) {
    type MakeCritterVars = {
      name: string;
      speciesId: string;
      variantId: string;
      traitValues: {
        traitId: string;
        value: string;
      }[];
      ownerId: string;
    };
    type Critter = {
      __typename: "Critter";
      id: string;
    };
    const { traitLists } = getResult(Seed0005CreateSpeciesTraitLists);
    const { traits } = getResult(Seed0004CreateSpeciesTraits);
    const { identity } = getResult(Seed0001Register);
    const { species } = getResult(Seed0003CreateSpecies);
    const makeCritterQuery: TypedDocumentNode<
      {
        createCritter:
          | Critter
          | {
              __typename: "DuplicateError" | "InvalidArgumentError";
              message: string;
            };
      },
      MakeCritterVars
    > = gql`
      mutation makeCritter(
        $name: String!
        $speciesId: ID!
        $variantId: ID!
        $traitValues: [CritterCreateTraitInput!]!
        $ownerId: ID
      ) {
        createCritter(
          input: {
            name: $name
            speciesId: $speciesId
            variantId: $variantId
            traitValues: $traitValues
            ownerId: $ownerId
          }
        ) {
          __typename
          ... on Critter {
            id
            name
            ownerId
            speciesId
            variantId
            traitValues {
              traitId
              value
            }
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

    const { enumValues } = traits[Seed0004TraitName.Size];

    const small = enumValues.find(({ name }) => name === "Small")!;
    const medium = enumValues.find(({ name }) => name === "Medium")!;
    const large = enumValues.find(({ name }) => name === "Large")!;

    for (let i = 0; i < 100; i++) {
      await client.request(makeCritterQuery, {
        name: critterName(),
        speciesId: species.id,
        variantId: traitLists[Seed0005SpeciesTraitListName.Special].id,
        traitValues: [
          {
            traitId: traits.Size.id,
            value: [small, medium, large][i % 3].id,
          },
          {
            traitId: traits[Seed0004TraitName.AdditionalBodyMods].id,
            value: v4(),
          },
          {
            traitId: traits[Seed0004TraitName.Length].id,
            value: String(Math.floor(Math.random() * 200)),
          },
        ],
        ownerId: identity.id,
      });
    }
    for (let i = 0; i < 100; i++) {
      await client.request(makeCritterQuery, {
        name: critterName(),
        speciesId: species.id,
        variantId: traitLists[Seed0005SpeciesTraitListName.Rare].id,
        traitValues: [
          {
            traitId: traits.Size.id,
            value: [small, medium][i % 2].id,
          },
          {
            traitId: traits[Seed0004TraitName.AdditionalBodyMods].id,
            value: v4(),
          },
          {
            traitId: traits[Seed0004TraitName.Length].id,
            value: String(Math.floor(Math.random() * 200)),
          },
        ],
        ownerId: identity.id,
      });
    }
    for (let i = 0; i < 100; i++) {
      await client.request(makeCritterQuery, {
        name: critterName(),
        speciesId: species.id,
        variantId: traitLists[Seed0005SpeciesTraitListName.Common].id,
        traitValues: [
          {
            traitId: traits.Size.id,
            value: [small, medium][i % 2].id,
          },
          {
            traitId: traits[Seed0004TraitName.AdditionalBodyMods].id,
            value: v4(),
          },
          {
            traitId: traits[Seed0004TraitName.Length].id,
            value: String(Math.floor(Math.random() * 200)),
          },
        ],
        ownerId: identity.id,
      });
    }

    return {};
  }
}

import { isBaseError } from "@clovercoin/api-client";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import type { GraphQLClient } from "graphql-request";
import { gql } from "graphql-tag";
import { CritterTraitValueTypes } from "../../models/CritterTrait/CritterTraitValueTypes.js";
import { logger } from "../../util/logger.js";
import Seed0003CreateSpecies from "./0003-create-species.js";
import { GetResultFn } from "./_seeds.mjs";

export default class Seed0004CreateSpeciesTraits {
  async up(client: GraphQLClient, getResult: GetResultFn) {
    type MakeTraitVars = {
      speciesId: string;
      name: string;
      valueType: CritterTraitValueTypes;
      enumValues: { name: string; order: number }[];
    };
    type Trait = {
      __typename: "Trait";
      id: string;
      name: string;
      valueType: CritterTraitValueTypes;
      enumValues: {
        id: string;
        name: string;
      }[];
    };
    const { species } = getResult(Seed0003CreateSpecies);
    const query: TypedDocumentNode<
      {
        createTrait:
          | Trait
          | {
              __typename: "DuplicateError" | "InvalidArgumentError";
              message: string;
            };
      },
      MakeTraitVars
    > = gql`
      mutation makeTrait(
        $speciesId: ID!
        $name: String!
        $valueType: CritterTraitValueType!
        $enumValues: [TraitCreateEnumValueInput!]!
      ) {
        createTrait(
          input: {
            speciesId: $speciesId
            name: $name
            valueType: $valueType
            enumValues: $enumValues
          }
        ) {
          __typename
          ... on Trait {
            id
            name
            valueType
            enumValues {
              id
              name
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

    const traits: Record<Seed0004TraitName, Trait> = {} as any;
    const traitDefinitions: Omit<MakeTraitVars, "speciesId">[] = [
      {
        valueType: CritterTraitValueTypes.Integer,
        name: Seed0004TraitName.Length,
        enumValues: [],
      },
      {
        valueType: CritterTraitValueTypes.Enum,
        name: Seed0004TraitName.Size,
        enumValues: [
          {
            name: "Small",
            order: 1,
          },
          {
            name: "Medium",
            order: 2,
          },
          {
            name: "Large",
            order: 3,
          },
        ],
      },
      {
        valueType: CritterTraitValueTypes.String,
        name: Seed0004TraitName.AdditionalBodyMods,
        enumValues: [],
      },
    ];
    for (const definition of traitDefinitions) {
      const { createTrait: trait } = await client.request(query, {
        ...definition,
        valueType: (definition.valueType[0].toUpperCase() +
          definition.valueType.substring(1)) as any,
        speciesId: species.id,
      });
      if (isBaseError(trait)) {
        logger.error({
          message: "Error during seed",
          errorName: trait.__typename,
          errorMessage: trait.message,
          query: "createTrait",
          error: trait,
        });
        throw trait;
      }
      traits[definition.name as Seed0004TraitName] = trait;
    }

    return { traits };
  }
}

export enum Seed0004TraitName {
  Length = "Length",
  Size = "Size",
  AdditionalBodyMods = "Additional Body Mods",
}

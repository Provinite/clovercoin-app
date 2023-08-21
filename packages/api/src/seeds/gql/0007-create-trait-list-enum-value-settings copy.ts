import { isBaseError } from "@clovercoin/api-client";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import type { GraphQLClient } from "graphql-request";
import { gql } from "graphql-tag";
import { logger } from "../../util/logger.js";
import Seed0004CreateSpeciesTraits, {
  Seed0004TraitName,
} from "./0004-create-species-traits.js";
import Seed0005CreateSpeciesTraitLists, {
  Seed0005SpeciesTraitListName,
} from "./0005-create-species-trait-lists.js";
import { GetResultFn } from "./_seeds.mjs";

export default class Seed0007CreateTraitListEnumValueSettings {
  async up(client: GraphQLClient, getResult: GetResultFn) {
    type MakeEnumValueSettingVars = {
      enumValueId: string;
      speciesVariantId: string;
    };
    type EnumValueSetting = {
      __typename: "EnumValueSetting";
      id: string;
    };
    const { speciesVariants } = getResult(Seed0005CreateSpeciesTraitLists);
    const { traits } = getResult(Seed0004CreateSpeciesTraits);
    const makeEnumValueSettingQuery: TypedDocumentNode<
      {
        createEnumValueSetting:
          | EnumValueSetting
          | {
              __typename: "DuplicateError" | "InvalidArgumentError";
              message: string;
            };
      },
      MakeEnumValueSettingVars
    > = gql`
      mutation makeEnumValueSetting($enumValueId: ID!, $speciesVariantId: ID!) {
        createEnumValueSetting(
          input: {
            speciesVariantId: $speciesVariantId
            enumValueId: $enumValueId
          }
        ) {
          __typename
          ... on EnumValueSetting {
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

    const { enumValues } = traits[Seed0004TraitName.Size];

    const small = enumValues.find(({ name }) => name === "Small")!;
    const medium = enumValues.find(({ name }) => name === "Medium")!;
    const large = enumValues.find(({ name }) => name === "Large")!;

    for (const speciesVariant of Object.values(speciesVariants)) {
      await client.request(makeEnumValueSettingQuery, {
        speciesVariantId: speciesVariant.id,
        enumValueId: small.id,
      });
      await client.request(makeEnumValueSettingQuery, {
        speciesVariantId: speciesVariant.id,
        enumValueId: medium.id,
      });
      if (
        [
          Seed0005SpeciesTraitListName.VeryRare,
          Seed0005SpeciesTraitListName.Special,
        ].includes(speciesVariant.name as any)
      ) {
        const { createEnumValueSetting: enumValueSetting } =
          await client.request(makeEnumValueSettingQuery, {
            speciesVariantId: speciesVariant.id,
            enumValueId: large.id,
          });

        if (isBaseError(enumValueSetting)) {
          logger.error({
            message: "Error during seed",
            errorName: enumValueSetting.__typename,
            errorMessage: enumValueSetting.message,
            query: "makeEnumValueSetting",
            error: enumValueSetting,
          });
          throw enumValueSetting;
        }
      }
    }

    return {};
  }
}

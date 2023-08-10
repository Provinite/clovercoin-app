import { GraphQLClient } from "graphql-request";
import Seed0001Register from "./0001-register.mjs";
import Seed0002CreateCommunity from "./0002-create-community.mjs";
import Seed0003CreateSpecies from "./0003-create-species.mjs";
import Seed0004CreateSpeciesTraits from "./0004-create-species-traits.mjs";
import Seed0005CreateSpeciesTraitLists from "./0005-create-species-trait-lists.mjs";
import Seed0006CreateSpeciesTraits from "./0006-create-trait-list-entries.mjs";
import Seed0007CreateTraitListEnumValueSettings from "./0007-create-trait-list-enum-value-settings copy.mjs";
import Seed0008CreateCritters from "./0008-create-critters.mjs";

/**
 * This array contains references to all of the seed functions.
 */
export const seeds = [
  Seed0001Register,
  Seed0002CreateCommunity,
  Seed0003CreateSpecies,
  Seed0004CreateSpeciesTraits,
  Seed0005CreateSpeciesTraitLists,
  Seed0006CreateSpeciesTraits,
  Seed0007CreateTraitListEnumValueSettings,
  Seed0008CreateCritters,
];
export type GetResultFn = <
  T extends new () => { up: (client: GraphQLClient, fn: GetResultFn) => any }
>(
  seedClass: T
) => Awaited<ReturnType<InstanceType<T>["up"]>>;

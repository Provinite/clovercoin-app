import { Arg, Ctx, ID, Mutation, Resolver } from "type-graphql";
import { AuthInfoFn, AuthScope } from "../../business/auth/AuthInfo.js";
import { Preauthorize } from "../../business/auth/Preauthorize.js";
import { DeleteResponse } from "../../business/DeleteResponse.js";
import type { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { RolePermissionKeys } from "../Role/Role.js";
import { TraitListEntry } from "./TraitListEntry.js";
import {
  TraitListEntryCreateInput,
  TraitListEntryCreateResponse,
  TraitListEntryDeleteResponse,
  TraitListEntryModifyInput,
  TraitListEntryModifyResponse,
} from "./TraitListEntryTypes.js";

const authorizeTraitListEntryById =
  (permissions: RolePermissionKeys[]): AuthInfoFn =>
  async ({
    args: {
      input: { id },
    },
    context: {
      traitListEntryController,
      speciesVariantController,
      speciesController,
    },
  }) => {
    const traitListEntry = await traitListEntryController.findOneByIdOrFail(id);
    const speciesVariant = await speciesVariantController.findOneByIdOrFail(
      traitListEntry.speciesVariantId
    );
    const species = await speciesController.findOneByIdOrFail(
      speciesVariant.speciesId
    );
    return {
      scope: AuthScope.Community,
      communityId: species.communityId,
      permissions,
    };
  };

/**
 * Resolver for {@link TraitListEntry}. Used to modify the set of
 * traits represented on a variant's traitlist.
 */
@Resolver(() => TraitListEntry)
export class TraitListEntryResolver {
  @Mutation(() => TraitListEntryCreateResponse, {
    description: "Add a trait to a variant's trait list",
  })
  @Preauthorize(
    async ({
      args: {
        input: { speciesVariantId },
      },
      context: { speciesVariantController, speciesController },
    }) => {
      const speciesVariant = await speciesVariantController.findOneByIdOrFail(
        speciesVariantId
      );
      const species = await speciesController.findOneByIdOrFail(
        speciesVariant.speciesId
      );
      return {
        scope: AuthScope.Community,
        communityId: species.communityId,
        permissions: ["canEditSpecies"],
      };
    }
  )
  async createTraitListEntry(
    @Arg("input") input: TraitListEntryCreateInput,
    @Ctx() { traitListEntryController }: AppGraphqlContext
  ): Promise<TraitListEntry> {
    return await traitListEntryController.create(input);
  }

  @Mutation(() => TraitListEntryDeleteResponse, {
    description:
      "Remove a trait from a variant's traitlist. This will" +
      " delete any values for this trait from all existing" +
      " characters under the specified variant.",
  })
  @Preauthorize(
    async ({
      args: { id },
      context: {
        traitListEntryController,
        speciesVariantController,
        speciesController,
      },
    }) => {
      const traitListEntry = await traitListEntryController.findOneByIdOrFail(
        id
      );
      const speciesVariant = await speciesVariantController.findOneByIdOrFail(
        traitListEntry.speciesVariantId
      );
      const species = await speciesController.findOneByIdOrFail(
        speciesVariant.speciesId
      );
      return {
        scope: AuthScope.Community,
        communityId: species.communityId,
        permissions: ["canEditSpecies"],
      };
    }
  )
  async deleteTraitListEntry(
    @Arg("id", () => ID, { nullable: false }) id: string,
    @Ctx() { traitListEntryController }: AppGraphqlContext
  ): Promise<DeleteResponse> {
    await traitListEntryController.deleteOneById(id);
    return new DeleteResponse(true);
  }

  @Mutation(() => TraitListEntryModifyResponse, {
    description: "Update an entry on a variant's trait list",
  })
  @Preauthorize(authorizeTraitListEntryById(["canEditSpecies"]))
  async modifyTraitListEntry(
    @Arg("input") input: TraitListEntryModifyInput,
    @Ctx() { traitListEntryController }: AppGraphqlContext
  ): Promise<TraitListEntry> {
    return traitListEntryController.updateOneById(input.id, {
      order: input.order ?? undefined,
      required: input.required ?? undefined,
    });
  }
}

import { Arg, Ctx, ID, Mutation, Resolver } from "type-graphql";
import { DeleteResponse } from "../../business/DeleteResponse";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext";
import { TraitListEntry } from "./TraitListEntry";
import {
  TraitListEntryCreateInput,
  TraitListEntryCreateResponse,
  TraitListEntryDeleteResponse,
  TraitListEntryModifyInput,
  TraitListEntryModifyResponse,
} from "./TraitListEntryTypes";

/**
 * Resolver for {@link TraitListEntry}. Used to modify the set of
 * traits represented on a variant's traitlist.
 */
@Resolver(() => TraitListEntry)
export class TraitListEntryResolver {
  @Mutation(() => TraitListEntryCreateResponse, {
    description: "Add a trait to a variant's trait list",
  })
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

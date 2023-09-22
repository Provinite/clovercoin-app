import { And, Equal, FindOptionsWhere, In, Repository } from "typeorm";
import { EntityController } from "../../business/EntityController.js";
import type { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { Identity } from "../Identity/Identity.js";
import { Species } from "./Species.js";

export type SpeciesCreate = Pick<Species, "name" | "communityId">;
export type SpeciesUpdate = Partial<Pick<Species, "hasImage">>;
export class SpeciesController extends EntityController<
  Species,
  Repository<Species>,
  SpeciesCreate,
  SpeciesUpdate
> {
  principal: Identity | null;
  constructor({
    speciesRepository,
    principal,
    transactionProvider,
  }: AppGraphqlContext) {
    super(speciesRepository, transactionProvider);
    this.principal = principal;
  }
  async augmentFindWhere(
    findWhere: FindOptionsWhere<Species>
  ): Promise<FindOptionsWhere<Species>> {
    if (!this.principal) {
      return findWhere;
    }
    let { communityId } = findWhere;
    const communityIdFilter = In(
      this.principal.communityMemberships.map((cm) => cm.role.communityId)
    );
    if (typeof communityId === "string") {
      communityId = Equal(communityId);
    }
    if (communityId) {
      communityId = And(communityId, communityIdFilter);
    } else {
      communityId = communityIdFilter;
    }
    return { ...findWhere, communityId };
  }
}

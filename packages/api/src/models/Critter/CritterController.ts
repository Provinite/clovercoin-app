import { FindOptionsWhere, In, Repository } from "typeorm";
import { EntityController } from "../../business/EntityController.js";
import type { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import type { Critter, CritterTraitValue } from "./Critter.js";

export interface CritterCreate
  extends Pick<Critter, "name" | "speciesId" | "ownerId" | "variantId"> {
  traitValues: Pick<CritterTraitValue, "traitId" | "value">[];
}

export interface CritterModify
  extends Pick<Critter, "id">,
    Partial<Pick<Critter, "name" | "traitValues" | "variantId">> {}
export class CritterController extends EntityController<
  Critter,
  Repository<Critter>,
  CritterCreate,
  CritterModify
> {
  traitRepository: AppGraphqlContext["traitRepository"];
  principal: AppGraphqlContext["principal"];
  constructor({
    critterRepository,
    traitRepository,
    principal,
    transactionProvider,
  }: AppGraphqlContext) {
    super(critterRepository, transactionProvider);
    this.traitRepository = traitRepository;
    this.principal = principal;
  }

  async augmentFindWhere(
    findWhere: FindOptionsWhere<Critter>
  ): Promise<FindOptionsWhere<Critter>> {
    if (!this.principal) {
      return findWhere;
    }

    return super.augmentFindWhere({
      ...findWhere,
      species: {
        communityId: In(
          this.principal.communityMemberships.map((cm) => cm.role.communityId)
        ),
      },
    });
  }

  async createBodyToModel(createBody: CritterCreate): Promise<Critter> {
    const finalBody = {
      ...createBody,
      traitValues: [] as Critter["traitValues"],
    };

    for (const { traitId, value } of createBody.traitValues) {
      await this.traitRepository.findOneOrFail({
        where: {
          id: traitId,
        },
      });
      finalBody.traitValues.push({
        traitId,
        value,
      });
    }

    return this.repository.create(finalBody);
  }
}

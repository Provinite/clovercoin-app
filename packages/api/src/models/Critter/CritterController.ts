import { Repository } from "typeorm";
import { EntityController } from "../../business/EntityController.js";
import type { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import type { Critter, CritterTraitValue } from "./Critter.js";

export interface CritterCreate
  extends Pick<Critter, "name" | "speciesId" | "ownerId" | "traitListId"> {
  traitValues: Pick<CritterTraitValue, "traitId" | "value">[];
}

export interface CritterModify
  extends Pick<Critter, "id">,
    Partial<Pick<Critter, "name" | "traitValues" | "traitListId">> {}
export class CritterController extends EntityController<
  Critter,
  Repository<Critter>,
  CritterCreate,
  CritterModify
> {
  traitRepository: AppGraphqlContext["traitRepository"];
  constructor({ critterRepository, traitRepository }: AppGraphqlContext) {
    super(critterRepository);
    this.traitRepository = traitRepository;
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

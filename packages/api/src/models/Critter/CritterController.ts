import { Repository } from "typeorm";
import { EntityController } from "../../business/EntityController.js";
import type { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { Critter } from "./Critter.js";

export class CritterController extends EntityController<
  Critter,
  Repository<Critter>,
  any
> {
  constructor({ critterRepository }: AppGraphqlContext) {
    super(critterRepository);
  }
}

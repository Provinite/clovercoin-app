import { Repository } from "typeorm";
import { EntityController } from "../../business/EntityController";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext";
import { EnumValue } from "./EnumValue";

export type EnumValueCreate = Pick<EnumValue, "name" | "trait">;

export class EnumValueController extends EntityController<
  EnumValue,
  Repository<EnumValue>,
  EnumValueCreate
> {
  constructor({ enumValueRepository }: AppGraphqlContext) {
    super(enumValueRepository);
  }
}

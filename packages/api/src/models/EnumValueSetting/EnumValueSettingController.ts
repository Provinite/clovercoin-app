import { Repository } from "typeorm";
import { EntityController } from "../../business/EntityController";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext";
import { EnumValueSetting } from "./EnumValueSetting";

export type EnumValueSettingCreate = Pick<
  EnumValueSetting,
  "enumValueId" | "traitListId"
>;

export class EnumValueSettingController extends EntityController<
  EnumValueSetting,
  Repository<EnumValueSetting>,
  EnumValueSettingCreate
> {
  constructor({ enumValueSettingRepository }: AppGraphqlContext) {
    super(enumValueSettingRepository);
  }
}

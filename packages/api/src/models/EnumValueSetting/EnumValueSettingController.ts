import { Repository } from "typeorm";
import { EntityController } from "../../business/EntityController.js";
import type { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { EnumValueSetting } from "./EnumValueSetting.js";

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

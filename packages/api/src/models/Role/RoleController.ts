import { Repository } from "typeorm";
import { EntityController } from "../../business/EntityController.js";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { RolePermissionKeys, Role } from "./Role.js";

export type RoleCreate = Pick<
  Role,
  "name" | "communityId" | RolePermissionKeys
>;
export type RoleModify = Pick<Role, "name">;
export class RoleController extends EntityController<
  Role,
  Repository<Role>,
  RoleCreate,
  RoleModify
> {
  constructor({ roleRepository }: AppGraphqlContext) {
    super(roleRepository);
  }
}

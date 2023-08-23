import { Repository } from "typeorm";
import { EntityController } from "../../business/EntityController.js";
import { Role } from "./Role.js";

export type RoleCreate = Pick<Role, "name" | "communityId">;
export type RoleModify = Pick<Role, "name">;
export class RoleController extends EntityController<
  Role,
  Repository<Role>,
  RoleCreate,
  RoleModify
> {}

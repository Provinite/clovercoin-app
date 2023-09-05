import { FindOptionsWhere, In, Repository } from "typeorm";
import { EntityController } from "../../business/EntityController.js";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { Identity } from "../Identity/Identity.js";
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
  principal: Identity | null;
  constructor({ roleRepository, principal }: AppGraphqlContext) {
    super(roleRepository);
    this.principal = principal;
  }
  async augmentFindWhere(
    findWhere: FindOptionsWhere<Role>
  ): Promise<FindOptionsWhere<Role>> {
    if (!this.principal) {
      return super.augmentFindWhere(findWhere);
    }
    return {
      ...findWhere,
      communityId: In(
        this.principal.communityMemberships.map((cm) => cm.role.communityId)
      ),
    };
  }
}

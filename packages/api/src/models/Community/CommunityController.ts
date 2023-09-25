import { And, Equal, FindOptionsWhere, In, Repository } from "typeorm";
import { EntityController } from "../../business/EntityController.js";
import type { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import type { Identity } from "../Identity/Identity.js";
import { RoleController, RoleCreate } from "../Role/RoleController.js";
import { Community } from "./Community.js";

export type CommunityCreate = Pick<Community, "name">;

export class CommunityController extends EntityController<
  Community,
  Repository<Community>,
  CommunityCreate
> {
  roleController: RoleController;
  principal: Identity | null;
  constructor({
    communityRepository,
    transactionProvider,
    roleController,
    principal,
  }: AppGraphqlContext) {
    super(communityRepository, transactionProvider);
    this.roleController = roleController;
    this.principal = principal;
  }

  async insert(models: Community[]): Promise<Community[]> {
    return this.transactionProvider.runTransaction(
      async ({ communityController, communityMemberController, principal }) => {
        const communities = await super.insert.call(
          communityController,
          models
        );
        for (const community of communities) {
          const { admin } = await communityController.createDefaultRoles(
            community
          );
          await communityMemberController.create({
            identityId: principal!.id,
            roleId: admin.id,
          });
        }
        return communities;
      }
    );
  }

  async createDefaultRoles(community: Community) {
    const defaultRoles: RoleCreate[] = [
      {
        communityId: community.id,
        name: "Admin",
        canCreateSpecies: true,
        canCreateCritter: true,
        canEditCritter: true,
        canEditSpecies: true,
        canListInviteCodes: true,
        canCreateInviteCode: true,
        canCreateRole: true,
        canEditRole: true,
      },
      {
        communityId: community.id,
        name: "Moderator",
        canCreateSpecies: false,
        canCreateCritter: true,
        canEditCritter: true,
        canEditSpecies: false,
        canCreateInviteCode: false,
        canListInviteCodes: true,
        canCreateRole: false,
        canEditRole: false,
      },
      {
        communityId: community.id,
        name: "Member",
        canCreateSpecies: false,
        canCreateCritter: false,
        canEditCritter: false,
        canEditSpecies: false,
        canListInviteCodes: false,
        canCreateInviteCode: false,
        canCreateRole: false,
        canEditRole: false,
      },
    ];

    const [admin, moderator, member] = await this.roleController.create(
      defaultRoles
    );

    return { admin, moderator, member };
  }

  async augmentFindWhere(
    findWhere: FindOptionsWhere<Community>
  ): Promise<FindOptionsWhere<Community>> {
    if (!this.principal) {
      return findWhere;
    }
    findWhere = { ...findWhere };
    const communityIds = new Set<string>();
    for (const { role } of this.principal.communityMemberships) {
      communityIds.add(role.communityId);
    }
    const idFilter = In([...communityIds.keys()]);
    if (findWhere.id) {
      if (typeof findWhere.id === "string") {
        findWhere.id = Equal(findWhere.id);
      }
      findWhere.id = And(findWhere.id, idFilter);
    } else {
      findWhere.id = idFilter;
    }
    return super.augmentFindWhere(findWhere);
  }
}

import { isUUID } from "class-validator";
import { Equal, IsNull, Repository } from "typeorm";
import { NotAuthenticatedError } from "../../business/auth/NotAuthenticatedError.js";
import { Preauthorize } from "../../business/auth/Preauthorize.js";
import { EntityController } from "../../business/EntityController.js";
import { Transactional } from "../../business/Transactional.js";
import { DuplicateError } from "../../errors/DuplicateError.js";
import { InvalidArgumentError } from "../../errors/InvalidArgumentError.js";
import { NotFoundError } from "../../errors/NotFoundError.js";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { CommunityMemberController } from "../CommunityMember/CommunityMemberController.js";
import { Identity } from "../Identity/Identity.js";
import { IdentityController } from "../Identity/IdentityController.js";
import { RoleController } from "../Role/RoleController.js";
import { CommunityInvitation } from "./CommunityInvitation.js";
import { UserAlreadyHasRoleError } from "./UserAlreadyHasRoleError.js";

export type CommunityInvitationCreate = Pick<CommunityInvitation, "roleId"> & {
  inviteeEmail: string;
};

export type CommunityInvitationModify = Pick<
  Partial<CommunityInvitation>,
  "acceptedAt" | "declinedAt"
>;

export class CommunityInvitationController extends EntityController<
  CommunityInvitation,
  Repository<CommunityInvitation>,
  CommunityInvitationCreate,
  CommunityInvitationModify
> {
  public identityController: IdentityController;
  public principal: Identity | null;
  public communityMemberController: CommunityMemberController;
  public roleController: RoleController;
  constructor({
    communityInvitationRepository,
    identityController,
    transactionProvider,
    principal,
    communityMemberController,
    roleController,
  }: AppGraphqlContext) {
    super(communityInvitationRepository, transactionProvider);
    this.identityController = identityController;
    this.principal = principal;
    this.communityMemberController = communityMemberController;
    this.roleController = roleController;
  }

  async createBodyToModel(
    createBody: CommunityInvitationCreate
  ): Promise<CommunityInvitation> {
    if (!this.principal) {
      throw new NotAuthenticatedError();
    }
    const [invitee] = await this.identityController.find({
      email: createBody.inviteeEmail,
    });
    if (!invitee) {
      throw new NotFoundError();
    }
    return this.repository.create({
      invitee,
      inviteeId: invitee.id,
      roleId: createBody.roleId,
      inviterId: this.principal.id,
      inviter: this.principal,
    });
  }

  async insert(models: CommunityInvitation[]): Promise<CommunityInvitation[]> {
    for (const model of models) {
      const role = await this.roleController.findOneByIdOrFail(model.roleId);
      const existingMemberships = await this.communityMemberController.find({
        role: {
          communityId: role.communityId,
        },
        identityId: Equal(model.inviteeId),
      });
      console.log({ existingMemberships });

      // user already has the specified role
      if (existingMemberships.some(({ roleId }) => model.roleId === roleId)) {
        throw new UserAlreadyHasRoleError();
      }

      // user is already a member of the invited community
      // so we can just auto-accept this
      if (existingMemberships.length) {
        await this.communityMemberController.create({
          identityId: model.inviteeId,
          roleId: model.roleId,
        });
        model.acceptedAt = new Date();
      }
    }
    return super.insert(models);
  }

  @Preauthorize()
  @Transactional("communityInvitationController")
  async answerInvitation(invitationId: string, accept: boolean) {
    if (!isUUID(invitationId, 4)) {
      console.error(invitationId);
      throw InvalidArgumentError.fromFieldMap({
        invitationId: "Invalid invitation id, must be UUID",
      });
    }
    const result = await this.repository.update(
      {
        id: Equal(invitationId),
        acceptedAt: IsNull(),
        declinedAt: IsNull(),
      },
      {
        acceptedAt: accept ? new Date() : undefined,
        declinedAt: accept ? undefined : new Date(),
      }
    );

    if (result.affected === 0) {
      throw new NotFoundError();
    }
    const invite = await this.findOneByIdOrFail(invitationId);

    if (accept) {
      try {
        await this.communityMemberController.create({
          identityId: invite.inviteeId,
          roleId: invite.roleId,
        });
      } catch (err) {
        const asDuplicate =
          err instanceof DuplicateError
            ? err
            : DuplicateError.fromPostgresError(err);
        if (
          asDuplicate &&
          asDuplicate.duplicateKeys.includes("roleId") &&
          asDuplicate.duplicateKeys.includes("identityId")
        ) {
          // we can safely swallow this, indicates the
          // user already had this role
        } else {
          throw err;
        }
      }
    }

    return invite;
  }
}

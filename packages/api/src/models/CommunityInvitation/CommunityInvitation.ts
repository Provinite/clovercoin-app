import { Check, Column, CreateDateColumn, Entity, Index } from "typeorm";
import type { Relation } from "typeorm";
import { Role } from "../Role/Role.js";
import { Identity } from "../Identity/Identity.js";
import { Field, ObjectType } from "type-graphql";
import {
  IdField,
  ManyToOneField,
  RelationIdField,
} from "../relationFieldDecorators.js";

@Entity()
@Check(
  "CHK_COMMUNITY_INVITATION_NOT_ACCEPTED_AND_DECLINED",
  `"acceptedAt" IS NULL OR "declinedAt" IS NULL`
)
@Index("UQ_COMMUNITY_INVITATION_ROLE_ID_INVITEE_ID", ["roleId", "inviteeId"], {
  unique: true,
  where: `"acceptedAt" IS NULL and "declinedAt" IS NULL`,
})
@ObjectType()
export class CommunityInvitation {
  @IdField
  id!: string;

  @ManyToOneField({
    columnName: "roleId",
    nullable: false,
    type: () => Role,
    description: "The role to grant when the invitation is accepted",
    inverseSide: (role: Role) => role.communityInvitations,
    foreignColumnName: "id",
    joinColumnOptions: {
      foreignKeyConstraintName: "FK_COMMUNITY_INVITATION_ROLE_ID_ROLE_ID",
    },
  })
  role?: Relation<Role>;

  @RelationIdField<CommunityInvitation>({
    nullable: false,
    relation: (communityInvitation) => communityInvitation.role,
  })
  roleId!: string;

  @ManyToOneField({
    columnName: "inviteeId",
    nullable: false,
    type: () => Identity,
    description: "The identity of the user that is being invited",
    inverseSide: (identity: Identity) => identity.receivedInvitations,
    foreignColumnName: "id",
    joinColumnOptions: {
      foreignKeyConstraintName:
        "FK_COMMUNITY_INVITATION_INVITEE_ID_IDENTITY_ID",
    },
  })
  invitee?: Relation<Identity>;

  @RelationIdField<CommunityInvitation>({
    nullable: false,
    relation: (communityInvitation) => communityInvitation.invitee,
  })
  inviteeId!: string;

  @ManyToOneField({
    columnName: "inviterId",
    nullable: false,
    type: () => Identity,
    description: "The identity of the user that is extending the invitation",
    inverseSide: (identity: Identity) => identity.createdInvitations,
    foreignColumnName: "id",
    joinColumnOptions: {
      foreignKeyConstraintName:
        "FK_COMMUNITY_INVITATION_INVITER_ID_IDENTITY_ID",
    },
  })
  inviter?: Relation<Identity>;

  @RelationIdField<CommunityInvitation>({
    nullable: false,
    relation: (communityInvitation) => communityInvitation.inviter,
  })
  @Column("uuid", { nullable: false })
  inviterId!: string;

  @Column("timestamptz", { nullable: true, default: null })
  acceptedAt: Date | null = null;

  @Column("timestamptz", { nullable: true, default: null })
  declinedAt: Date | null = null;

  @Field(() => Boolean)
  accepted() {
    return Boolean(this.acceptedAt);
  }

  @Field(() => Boolean)
  declined() {
    return Boolean(this.declinedAt);
  }

  @CreateDateColumn({
    type: "timestamptz",
    nullable: false,
  })
  createdAt!: Date;
}

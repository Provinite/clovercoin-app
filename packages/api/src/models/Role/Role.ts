import { Field, ObjectType } from "type-graphql";
import { Column, Entity, OneToMany, Unique } from "typeorm";
import type { Relation } from "typeorm";
import { Community } from "../Community/Community.js";
import {
  IdField,
  ManyToOneField,
  RelationIdField,
} from "../relationFieldDecorators.js";
import { CommunityMember } from "../CommunityMember/CommunityMember.js";
import { InviteCode } from "../InviteCode/InviteCode.js";

export type RolePermissionKeys = keyof Role & `can${string}`;

@Entity()
@ObjectType()
@Unique("UQ_ROLE_COMMUNITY_NAME", ["name", "communityId"])
export class Role {
  @IdField
  id!: string;

  @Column("text")
  @Field(() => String)
  name!: string;

  @RelationIdField<Role>({
    nullable: false,
    relation: (role) => role.community,
  })
  communityId!: string;

  @ManyToOneField<Community>({
    type: () => Community,
    columnName: "communityId",
    nullable: false,
    foreignColumnName: "id",
    inverseSide: (community) => community.roles,
    joinColumnOptions: {
      foreignKeyConstraintName: "FK_ROLE_COMMUNITY_ID_COMMUNITY_ID",
    },
  })
  community!: Relation<Community>;

  @OneToMany(() => CommunityMember, (communityMember) => communityMember.role)
  communityMembers!: CommunityMember[];

  @OneToMany(() => InviteCode, (inviteCode) => inviteCode.role)
  inviteCodes!: InviteCode[];

  @Column("boolean", { nullable: false, default: false })
  @Field(() => Boolean)
  canCreateSpecies!: boolean;

  @Column("boolean", { nullable: false, default: false })
  @Field(() => Boolean)
  canCreateCritter!: boolean;

  @Column("boolean", { nullable: false, default: false })
  @Field(() => Boolean)
  canEditCritter!: boolean;

  @Column("boolean", { nullable: false, default: false })
  @Field(() => Boolean)
  canEditSpecies!: boolean;

  @Column("boolean", { nullable: false, default: false })
  @Field(() => Boolean)
  canCreateInviteCode!: boolean;

  @Column("boolean", { nullable: false, default: false })
  @Field(() => Boolean)
  canListInviteCodes!: boolean;

  @Column("boolean", { nullable: false, default: false })
  @Field(() => Boolean)
  canCreateRole!: boolean;

  @Column("boolean", { nullable: false, default: false })
  @Field(() => Boolean)
  canEditRole!: boolean;
}

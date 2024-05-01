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
import { CommunityInvitation } from "../CommunityInvitation/CommunityInvitation.js";
import {
  IsBoolean,
  IsEmpty,
  IsString,
  IsUUID,
  MinLength,
} from "class-validator";
import { ValidationGroup, ValidationGroupAll } from "../ValidationGroup.js";

export type RolePermissionKeys = keyof Role & `can${string}`;

@Entity()
@ObjectType()
@Unique("UQ_ROLE_COMMUNITY_NAME", ["name", "communityId"])
export class Role {
  @IdField
  @IsEmpty({
    groups: [ValidationGroup.Insert],
  })
  @IsUUID(4, {
    groups: [ValidationGroup.Update],
  })
  id!: string;

  @Column("text")
  @Field(() => String)
  @IsString({
    groups: [...ValidationGroupAll],
  })
  @MinLength(1, {
    groups: [...ValidationGroupAll],
  })
  name!: string;

  @RelationIdField<Role>({
    nullable: false,
    relation: (role) => role.community,
  })
  @IsUUID(4, {
    groups: [...ValidationGroupAll],
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
  @IsBoolean({
    groups: [...ValidationGroupAll],
  })
  canCreateSpecies!: boolean;

  @Column("boolean", { nullable: false, default: false })
  @Field(() => Boolean)
  @IsBoolean({
    groups: [...ValidationGroupAll],
  })
  canCreateCritter!: boolean;

  @Column("boolean", { nullable: false, default: false })
  @Field(() => Boolean)
  @IsBoolean({
    groups: [...ValidationGroupAll],
  })
  canEditCritter!: boolean;

  @Column("boolean", { nullable: false, default: false })
  @Field(() => Boolean)
  @IsBoolean({
    groups: [...ValidationGroupAll],
  })
  canEditSpecies!: boolean;

  @Column("boolean", { nullable: false, default: false })
  @Field(() => Boolean)
  @IsBoolean({
    groups: [...ValidationGroupAll],
  })
  canCreateInviteCode!: boolean;

  @Column("boolean", { nullable: false, default: false })
  @Field(() => Boolean)
  @IsBoolean({
    groups: [...ValidationGroupAll],
  })
  canListInviteCodes!: boolean;

  @Column("boolean", { nullable: false, default: false })
  @Field(() => Boolean)
  @IsBoolean({
    groups: [...ValidationGroupAll],
  })
  canCreateRole!: boolean;

  @Column("boolean", { nullable: false, default: false })
  @Field(() => Boolean)
  @IsBoolean({
    groups: [...ValidationGroupAll],
  })
  canEditRole!: boolean;

  @OneToMany(
    () => CommunityInvitation,
    (communityInvitation) => communityInvitation.role
  )
  communityInvitations!: CommunityInvitation[];
}

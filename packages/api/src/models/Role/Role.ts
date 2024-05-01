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
import { ValidationGroup } from "../ValidationGroup.js";

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
    always: true,
  })
  @MinLength(1, {
    always: true,
  })
  name!: string;

  @RelationIdField<Role>({
    nullable: false,
    relation: (role) => role.community,
  })
  @IsUUID(4, {
    always: true,
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
    always: true,
  })
  canCreateSpecies!: boolean;

  @Column("boolean", { nullable: false, default: false })
  @Field(() => Boolean)
  @IsBoolean({
    always: true,
  })
  canCreateCritter!: boolean;

  @Column("boolean", { nullable: false, default: false })
  @Field(() => Boolean)
  @IsBoolean({
    always: true,
  })
  canEditCritter!: boolean;

  @Column("boolean", { nullable: false, default: false })
  @Field(() => Boolean)
  @IsBoolean({
    always: true,
  })
  canEditSpecies!: boolean;

  @Column("boolean", { nullable: false, default: false })
  @Field(() => Boolean)
  @IsBoolean({
    always: true,
  })
  canCreateInviteCode!: boolean;

  @Column("boolean", { nullable: false, default: false })
  @Field(() => Boolean)
  @IsBoolean({
    always: true,
  })
  canListInviteCodes!: boolean;

  @Column("boolean", { nullable: false, default: false })
  @Field(() => Boolean)
  @IsBoolean({
    always: true,
  })
  canCreateRole!: boolean;

  @Column("boolean", { nullable: false, default: false })
  @Field(() => Boolean)
  @IsBoolean({
    always: true,
  })
  canEditRole!: boolean;

  @OneToMany(
    () => CommunityInvitation,
    (communityInvitation) => communityInvitation.role
  )
  communityInvitations!: CommunityInvitation[];
}

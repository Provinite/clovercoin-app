import { IsEmpty, IsUUID } from "class-validator";
import { ObjectType } from "type-graphql";
import type { Relation } from "typeorm";
import { Entity, Unique } from "typeorm";
import { Identity } from "../Identity/Identity.js";
import {
  IdField,
  ManyToOneField,
  RelationIdField,
} from "../relationFieldDecorators.js";
import { Role } from "../Role/Role.js";
import { ValidationGroup, ValidationGroupAll } from "../ValidationGroup.js";

@Entity()
@ObjectType()
@Unique("UQ_COMMUNITY_MEMBER_ROLE_ID_IDENTITY_ID", ["roleId", "identityId"])
export class CommunityMember {
  @IdField
  @IsEmpty({
    groups: [ValidationGroup.Insert],
  })
  @IsUUID(4, {
    groups: [ValidationGroup.Update],
  })
  id!: string;

  @ManyToOneField<Role>({
    type: () => Role,
    foreignColumnName: "id",
    columnName: "roleId",
    joinColumnOptions: {
      foreignKeyConstraintName: "FK_COMMUNITY_MEMBER_ROLE_ID_ROLE_ID",
    },
    nullable: false,
    inverseSide: (role) => role.communityMembers,
  })
  role!: Relation<Role>;

  @RelationIdField<CommunityMember>({
    relation: (cm) => cm.role,
    nullable: false,
  })
  @IsUUID(4, { groups: [...ValidationGroupAll] })
  roleId!: string;

  @ManyToOneField<Identity>({
    type: () => Identity,
    inverseSide: (identity) => identity.communityMemberships,
    nullable: false,
    columnName: "identityId",
    foreignColumnName: "id",
    joinColumnOptions: {
      foreignKeyConstraintName: "FK_1af7e557b638e25cf487cb0c66b",
    },
  })
  identity!: Relation<Identity>;

  @RelationIdField<CommunityMember>({
    relation: (cm) => cm.identity,
    nullable: false,
  })
  @IsUUID(4, { groups: [...ValidationGroupAll] })
  identityId!: string;
}

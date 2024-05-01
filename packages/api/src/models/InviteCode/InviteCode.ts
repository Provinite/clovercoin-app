import {
  IsInt,
  IsNumber,
  IsString,
  IsUUID,
  Matches,
  Min,
  ValidateIf,
} from "class-validator";
import { Field, ID, Int, ObjectType } from "type-graphql";
import { Check, Column, Entity, PrimaryColumn } from "typeorm";
import { Identity } from "../Identity/Identity.js";
import { ManyToOneField, RelationIdField } from "../relationFieldDecorators.js";
import { Role } from "../Role/Role.js";
import { ValidationGroupAll } from "../ValidationGroup.js";

/**
 * Model representing an invite code bucket.
 */
@ObjectType()
@Entity()
export class InviteCode {
  @PrimaryColumn("text")
  @Field(() => ID, { nullable: false })
  @IsString()
  @Matches(/^[a-zA-Z0-9-]+$/, {
    message: "Invite code ID can only contain letters, numbers, and hyphens",
  })
  id!: string;

  @Field(() => Int, { nullable: false })
  @Column("integer", { nullable: false })
  @Check("chk_invite_code_not_over_used", '"claimCount" <= "maxClaims"')
  @IsInt()
  @Min(0)
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
  })
  claimCount!: number;

  @Field(() => Int, { nullable: false })
  @Column({ nullable: false })
  @IsInt({
    groups: [...ValidationGroupAll],
  })
  @Min(0, {
    groups: [...ValidationGroupAll],
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    {
      groups: [...ValidationGroupAll],
    }
  )
  maxClaims!: number;

  @RelationIdField<InviteCode>({
    relation: (inviteCode) => inviteCode.creator,
    nullable: false,
  })
  @IsUUID(4, {
    groups: [...ValidationGroupAll],
  })
  creatorId!: string;

  @ManyToOneField<Identity>({
    type: () => Identity,
    nullable: false,
    columnName: "creatorId",
    foreignColumnName: "id",
    inverseSide: (identity) => identity.createdInviteCodes,
  })
  creator: Identity | undefined;

  @ManyToOneField<Role>({
    type: () => Role,
    nullable: true,
    columnName: "roleId",
    foreignColumnName: "id",
    joinColumnOptions: {
      foreignKeyConstraintName: "FK_INVITE_CODE_ROLE_ID_ROLE_ID",
    },
    inverseSide: (role) => role.inviteCodes,
  })
  role: Role | null = null;

  @RelationIdField<InviteCode>({
    relation: (inviteCode) => inviteCode.role,
    nullable: true,
    columnOptions: {
      default: null,
    },
  })
  @IsUUID(4, {
    groups: [...ValidationGroupAll],
  })
  @ValidateIf((_, roleId) => roleId !== null, {
    groups: [...ValidationGroupAll],
  })
  roleId: string | null = null;
}

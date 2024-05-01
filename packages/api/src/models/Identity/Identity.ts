import {
  IsBoolean,
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsString,
  IsUUID,
} from "class-validator";
import { Field, ObjectType } from "type-graphql";
import { Column, Entity, OneToMany } from "typeorm";
import { CommunityInvitation } from "../CommunityInvitation/CommunityInvitation.js";
import { CommunityMember } from "../CommunityMember/CommunityMember.js";
import { InviteCode } from "../InviteCode/InviteCode.js";
import { IdField } from "../relationFieldDecorators.js";
import { ValidationGroup, ValidationGroupAll } from "../ValidationGroup.js";

@ObjectType()
@Entity()
export class Identity {
  @IdField
  @IsEmpty({
    groups: [ValidationGroup.Insert],
  })
  @IsUUID(4, {
    groups: [ValidationGroup.Update],
  })
  id!: string;

  @Column({
    nullable: false,
  })
  @Field(() => String)
  @IsString({ groups: [...ValidationGroupAll] })
  @IsNotEmpty({ groups: [...ValidationGroupAll] })
  displayName!: string;

  @Field(() => String)
  @Column({
    nullable: false,
    unique: true,
  })
  @IsString({ groups: [...ValidationGroupAll] })
  @IsEmail(
    {
      allow_display_name: false,
      require_tld: true,
    },
    { groups: [...ValidationGroupAll] }
  )
  email!: string;

  @OneToMany(() => InviteCode, (inviteCode) => inviteCode.creator)
  createdInviteCodes?: InviteCode[];

  @OneToMany(
    () => CommunityMember,
    (communityMember) => communityMember.identity
  )
  communityMemberships!: CommunityMember[];

  @Column("boolean", { nullable: false, default: false })
  @Field(() => Boolean, { nullable: false })
  @IsBoolean({ groups: [...ValidationGroupAll] })
  canCreateCommunity!: boolean;

  @Column("boolean", { nullable: false, default: false })
  @Field(() => Boolean, { nullable: false })
  @IsBoolean({ groups: [...ValidationGroupAll] })
  canListIdentities!: boolean;

  @Column("boolean", { nullable: false, default: false })
  @Field(() => Boolean, { nullable: false })
  @IsBoolean({ groups: [...ValidationGroupAll] })
  canListInviteCodes!: boolean;

  @Column("boolean", { nullable: false, default: false })
  @Field(() => Boolean, { nullable: false })
  @IsBoolean({ groups: [...ValidationGroupAll] })
  canCreateInviteCode!: boolean;

  @Column("boolean", { nullable: false, default: false })
  @Field(() => Boolean, { nullable: false })
  @IsBoolean({ groups: [...ValidationGroupAll] })
  canGrantGlobalPermissions!: boolean;

  @OneToMany(
    () => CommunityInvitation,
    (communityInvitation) => communityInvitation.invitee
  )
  receivedInvitations!: CommunityInvitation[];

  @OneToMany(
    () => CommunityInvitation,
    (communityInvitation) => communityInvitation.inviter
  )
  createdInvitations!: CommunityInvitation[];
}

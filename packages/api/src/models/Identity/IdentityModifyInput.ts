import { IsBoolean, IsOptional, IsUUID } from "class-validator";
import { Field, ID, InputType } from "type-graphql";

@InputType()
export class IdentityModifyInput {
  @Field(() => ID, {
    nullable: false,
  })
  @IsUUID(4)
  id!: string;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  canCreateCommunity?: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  canCreateInviteCode?: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  canGrantGlobalPermissions?: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  canListIdentities?: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  canListInviteCodes?: boolean;
}

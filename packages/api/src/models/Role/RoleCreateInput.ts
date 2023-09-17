import { IsBoolean, IsString, MinLength } from "class-validator";
import { Field, ID, InputType } from "type-graphql";
import { RolePermissionKeys } from "./Role.js";

const PermissionField: PropertyDecorator = (target, key) => {
  Field(() => Boolean, { nullable: true, defaultValue: false })(target, key);
  IsBoolean()(target, key);
};

@InputType()
export class RoleCreateInput implements Record<RolePermissionKeys, boolean> {
  @Field(() => ID, { nullable: false })
  communityId!: string;

  @Field(() => String, { nullable: false })
  @MinLength(1)
  @IsString()
  name!: string;

  @PermissionField
  canCreateSpecies = false;
  @PermissionField
  canEditSpecies = false;
  @PermissionField
  canListInviteCodes = false;
  @PermissionField
  canCreateCritter = false;
  @PermissionField
  canEditCritter = false;
  @PermissionField
  canCreateInviteCode = false;
  @PermissionField
  canCreateRole = false;
  @PermissionField
  canEditRole = false;
}

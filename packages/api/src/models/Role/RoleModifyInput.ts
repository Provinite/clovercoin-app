import { IsBoolean, IsOptional, IsUUID } from "class-validator";
import { Field, ID, InputType } from "type-graphql";
import { RolePermissionKeys } from "./Role.js";

const PermissionField: PropertyDecorator = (target, key) => {
  Field(() => Boolean, { nullable: true, defaultValue: undefined })(
    target,
    key
  );
  IsOptional()(target, key);
  IsBoolean()(target, key);
};

@InputType()
export class RoleModifyInput
  implements Record<RolePermissionKeys, boolean | undefined>
{
  @Field(() => ID)
  @IsUUID(4)
  id!: string;

  @Field(() => String, { nullable: true, defaultValue: null })
  name: string | null = null;

  @PermissionField
  canCreateSpecies: boolean | undefined;
  @PermissionField
  canEditSpecies: boolean | undefined;
  @PermissionField
  canListInviteCodes: boolean | undefined;
  @PermissionField
  canCreateCritter: boolean | undefined;
  @PermissionField
  canEditCritter: boolean | undefined;
  @PermissionField
  canCreateInviteCode: boolean | undefined;
  @PermissionField
  canCreateRole: boolean | undefined;
  @PermissionField
  canEditRole: boolean | undefined;
}

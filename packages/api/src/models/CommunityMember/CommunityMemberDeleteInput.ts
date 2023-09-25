import {
  IsOptional,
  IsUUID,
  registerDecorator,
  ValidateIf,
} from "class-validator";
import { Field, ID, InputType } from "type-graphql";

export const MutuallyExclusive =
  <T>(field: keyof T): PropertyDecorator =>
  (target, key) => {
    registerDecorator({
      name: "MutuallyExclusive",
      target: target.constructor,
      propertyName: key as string,
      validator: {
        validate: (value, validationArgs) => {
          const otherValue = (validationArgs!.object as T)[field];
          if (otherValue !== undefined) {
            return value === undefined;
          }
          return value !== undefined;
        },
      },
    });
  };

@InputType()
export class CommunityMemberDeleteInput {
  @Field(() => ID, { nullable: true })
  @MutuallyExclusive<CommunityMemberDeleteInput>("identityId")
  @MutuallyExclusive<CommunityMemberDeleteInput>("roleId")
  @ValidateIf((val) => Boolean(val.id) || !val.identityId || !val.roleId)
  @IsUUID(4)
  id?: string;

  @Field(() => ID, { nullable: true })
  @MutuallyExclusive<CommunityMemberDeleteInput>("id")
  @ValidateIf(
    (val) => Boolean(val.identityId) || !val.id || Boolean(val.roleId)
  )
  @IsUUID(4)
  identityId?: string;

  @Field(() => ID, { nullable: true })
  @MutuallyExclusive<CommunityMemberDeleteInput>("id")
  @ValidateIf(
    (val) => Boolean(val.roleId) || !val.id || Boolean(val.identityId)
  )
  @IsOptional()
  @IsUUID(4)
  roleId?: string;
}

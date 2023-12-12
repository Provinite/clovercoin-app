import { Field, ObjectType } from "type-graphql";
import { Account } from "../../../models/Account/Account.js";
import { Identity } from "../../../models/Identity/Identity.js";

@ObjectType()
export class LoginSuccessResponse {
  constructor(partial: Partial<LoginSuccessResponse> = {}) {
    const copy = <T, K extends keyof T>(key: K, from: Partial<T>, to: T) => {
      if (from[key]) {
        to[key] = from[key]!;
      }
    };
    for (const key of ["token", "identity", "account"] as const) {
      copy(key, partial, this);
    }
  }
  @Field(() => String)
  token: string = "";

  @Field(() => Identity)
  identity!: Identity;

  @Field(() => Account)
  account!: Account;
}

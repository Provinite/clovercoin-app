import { IsEmail, IsStrongPassword, MinLength } from "class-validator";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Resolver,
} from "type-graphql";
import type { AppGraphqlContext } from "../graphql/AppGraphqlContext.js";
import { Account } from "../models/Account/Account.js";
import { Identity } from "../models/Identity/Identity.js";

@ObjectType()
export class LoginResponse {
  @Field(() => String)
  token: string = "";

  @Field(() => Identity)
  identity!: Identity;

  @Field(() => Account)
  account!: Account;
}

@InputType()
export class RegisterArgs {
  @Field(() => String)
  @MinLength(1)
  username: string = "";

  @Field(() => String)
  @IsStrongPassword({
    minLength: 12,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  password: string = "";

  @Field(() => String)
  @IsEmail({
    allow_display_name: false,
    allow_ip_domain: true,
    require_tld: true,
  })
  email: string = "";
}

@InputType()
export class LoginArgs {
  @Field(() => String)
  username: string = "";

  @Field(() => String)
  password: string = "";
}

@Resolver()
export class LoginResolver {
  @Mutation(() => LoginResponse, {
    description: "Create a new account and receive an auth token",
  })
  async register(
    @Arg("input") { username, password, email }: RegisterArgs,
    @Ctx() { loginController }: AppGraphqlContext
  ): Promise<LoginResponse> {
    const result = await loginController.register(username, password, email);
    if (!result.success) {
      throw new Error("Registration failed");
    }
    const { token, identity, account } = result;
    return { token, identity, account };
  }

  @Mutation(() => LoginResponse, {
    description: "Log in using local credentials and receive an auth token",
  })
  async login(
    @Arg("input") { username, password }: LoginArgs,
    @Ctx() { loginController }: AppGraphqlContext
  ): Promise<LoginResponse> {
    const result = await loginController.login(username, password);
    if (!result.success) {
      throw new Error("Login failed");
    }
    const { token, identity, account } = result;
    return { token, identity, account };
  }
}

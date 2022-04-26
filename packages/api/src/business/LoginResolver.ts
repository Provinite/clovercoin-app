import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Resolver,
} from "type-graphql";
import { AppGraphqlContext } from "../graphql/AppGraphqlContext";
import { Account } from "../models/Account/Account";
import { Identity } from "../models/Identity/Identity";

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
  username: string = "";

  @Field(() => String)
  password: string = "";

  @Field(() => String)
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

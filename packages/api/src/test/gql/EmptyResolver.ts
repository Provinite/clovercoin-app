import { Query, Resolver } from "type-graphql";

@Resolver()
export class EmptyResolver {
  @Query(() => String)
  foo(): string {
    return "bar";
  }
}

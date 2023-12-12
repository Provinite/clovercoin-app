import { createParamDecorator } from "type-graphql";

export const RawResolverData = createParamDecorator(
  (resolverData) => resolverData
);

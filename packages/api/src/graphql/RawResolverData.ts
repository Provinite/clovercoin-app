import { createParameterDecorator } from "type-graphql";

export const RawResolverData = createParameterDecorator(
  (resolverData) => resolverData
);

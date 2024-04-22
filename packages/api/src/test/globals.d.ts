import { AwilixContainer } from "awilix";
import { AddressInfo } from "net";

/* eslint-disable no-var */
declare global {
  var ccAppAddress: AddressInfo | undefined;
  var ccAppContainer: AwilixContainer<AppGraphqlContext> | undefined;
}

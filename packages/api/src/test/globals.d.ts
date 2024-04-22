import { AwilixContainer } from "awilix";
import { AddressInfo } from "net";
import { StartedPostgreSqlContainer } from "testcontainers";

/* eslint-disable no-var */
declare global {
  var ccPostgresContainer: StartedPostgreSqlContainer | undefined;
  var ccAppAddress: AddressInfo | undefined;
  var ccAppContainer: AwilixContainer<AppGraphqlContext> | undefined;
}

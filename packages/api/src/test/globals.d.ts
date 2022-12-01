import { AddressInfo } from "net";
import { StartedPostgreSqlContainer } from "testcontainers";

/* eslint-disable no-var */
export declare global {
  var ccPostgresContainer: StartedPostgreSqlContainer | undefined;
  var ccAppAddress: AddressInfo | undefined;
}

import { GraphQLClient } from "graphql-request";
import { getSdk } from "./generated/graphql";
//
const client = new GraphQLClient("http://localhost:3000/");
export const api = getSdk(client);

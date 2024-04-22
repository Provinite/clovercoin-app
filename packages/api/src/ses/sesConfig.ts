import { SESClientConfig } from "@aws-sdk/client-ses";
import { AppGraphqlContext } from "../graphql/AppGraphqlContext.js";

/**
 * AWS SES (email) config provider
 */
export const sesConfig = ({
  sesEnvironment,
}: AppGraphqlContext): SESClientConfig => ({
  endpoint: sesEnvironment.endpoint || undefined,
  region: "us-east-1",
});

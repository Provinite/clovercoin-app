import { S3ClientConfig } from "@aws-sdk/client-s3";
import { AppGraphqlContext } from "../graphql/AppGraphqlContext.js";

export const s3Config = ({
  s3Environment,
}: AppGraphqlContext): S3ClientConfig => ({
  // /**
  //  * This URL is necessary for virtual host style s3
  //  * urls to work with localstack.
  //  *
  //  * {@link https://docs.localstack.cloud/user-guide/aws/s3/}
  //  */
  // endpoint: "http://s3.localhost.localstack.cloud:4566",
  endpoint: s3Environment.endpoint || undefined,
  region: "us-east-1",
});

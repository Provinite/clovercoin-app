import { S3ClientConfig } from "@aws-sdk/client-s3";

export const s3Config: () => S3ClientConfig = () => ({
  /**
   * This URL is necessary for virtual host style s3
   * urls to work with localstack.
   *
   * {@link https://docs.localstack.cloud/user-guide/aws/s3/}
   */
  endpoint: "http://s3.localhost.localstack.cloud:4566",
  region: "us-east-1",
});

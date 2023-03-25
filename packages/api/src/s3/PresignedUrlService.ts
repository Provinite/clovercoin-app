import {
  GetObjectCommand,
  GetObjectCommandInput,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from "@aws-sdk/client-s3";
import type { RequestPresigningArguments } from "@aws-sdk/types";
import { AppGraphqlContext } from "../graphql/AppGraphqlContext";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
export class PresignedUrlService {
  private s3Client: S3Client;
  constructor({ s3Config }: AppGraphqlContext) {
    this.s3Client = new S3Client(s3Config);
  }

  getPresignedUrl({
    object,
    options,
  }: {
    object: GetObjectCommandInput;
    options?: RequestPresigningArguments;
  }): Promise<string> {
    const command = new GetObjectCommand(object);
    return getSignedUrl(this.s3Client, command, options);
  }

  async putPresignedUrl({
    object,
    options,
  }: {
    object: PutObjectCommandInput;
    options?: RequestPresigningArguments;
  }): Promise<string> {
    const command = new PutObjectCommand(object);
    return getSignedUrl(this.s3Client, command, options);
  }
}

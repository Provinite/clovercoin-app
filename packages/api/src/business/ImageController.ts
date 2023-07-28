import { AppGraphqlContext } from "../graphql/AppGraphqlContext.js";

export enum ImageTarget {
  Species,
}

export class ImageController {
  private presignedUrlService: AppGraphqlContext["presignedUrlService"];
  private s3Environment: AppGraphqlContext["s3Environment"];
  constructor({ presignedUrlService, s3Environment }: AppGraphqlContext) {
    this.presignedUrlService = presignedUrlService;
    this.s3Environment = s3Environment;
  }

  public async getPutUrl(
    targetType: ImageTarget,
    targetId: string
  ): Promise<string> {
    return this.presignedUrlService.getPresignedUrl({
      object: {
        Bucket: this.s3Environment.bucket,
        Key: `${targetType}/${targetId}`,
      },
    });
  }

  public async getGetUrl(
    targetType: ImageTarget,
    targetId: string
  ): Promise<string> {
    return this.presignedUrlService.getPresignedUrl({
      object: {
        Bucket: this.s3Environment.bucket,
        Key: `${targetType}/${targetId}`,
      },
    });
  }
}

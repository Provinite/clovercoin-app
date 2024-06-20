import { AwilixContainer } from "awilix";
import { v4 } from "uuid";
import { AppGraphqlContext } from "../graphql/AppGraphqlContext.js";
import { PresignedUrlService } from "../s3/PresignedUrlService.js";
import { createTestContainer } from "../test/createTestContainer.js";
import { ImageController, ImageTarget } from "./ImageController.js";

describe("controller:ImageController", () => {
  class MockPresignedUrlService {
    getPresignedUrl() {}
    putPresignedUrl() {}
  }

  let container: AwilixContainer<AppGraphqlContext>;
  let imageController: ImageController;
  let presignedUrlService: PresignedUrlService;
  beforeEach(() => {
    container = createTestContainer({
      presignedUrlService: MockPresignedUrlService,
      s3Environment: {
        bucket: "CLOVERCOIN-MOCK-TEST-BUCKET",
        endpoint: "",
      },
      imageController: ImageController,
    });

    presignedUrlService = container.resolve("presignedUrlService");
    imageController = container.resolve("imageController");

    jest
      .spyOn(presignedUrlService, "putPresignedUrl")
      .mockImplementation(
        async ({ object: { Bucket, Key } }) => `put@${Bucket}/${Key}`
      );

    jest
      .spyOn(presignedUrlService, "getPresignedUrl")
      .mockImplementation(
        async ({ object: { Bucket, Key } }) => `get@${Bucket}/${Key}`
      );
  });
  describe("method:getPutUrl", () => {
    it("fetches a PUT presigned URL for a species", async () => {
      const id = v4();
      const expectedUrl = `put@CLOVERCOIN-MOCK-TEST-BUCKET/species/${id}`;
      const result = await imageController.getPutUrl(ImageTarget.Species, id);
      expect(result).toBe(expectedUrl);
    });
  });
  describe("method:getGetUrl", () => {
    it("fetches a GET presigned URL for a species", async () => {
      const id = v4();
      const expectedUrl = `get@CLOVERCOIN-MOCK-TEST-BUCKET/species/${id}`;
      const result = await imageController.getGetUrl(ImageTarget.Species, id);
      expect(result).toBe(expectedUrl);
    });
  });
});

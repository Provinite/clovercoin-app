import { asClass, asValue, AwilixContainer, Lifetime } from "awilix";
import { v4 } from "uuid";
import { createContainer } from "../awilix/createContainer.js";
import { register } from "../awilix/register.js";
import { AppGraphqlContext } from "../graphql/AppGraphqlContext.js";
import { PresignedUrlService } from "../s3/PresignedUrlService.js";
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
    container = createContainer<AppGraphqlContext>("test");
    register(
      container,
      "presignedUrlService",
      asClass(
        MockPresignedUrlService as any as typeof PresignedUrlService
      ).singleton()
    );
    register(
      container,
      "s3Environment",
      asValue({
        bucket: "CLOVERCOIN-MOCK-TEST-BUCKET",
        endpoint: "http://localhost",
      })
    );
    register(container, "imageController", asClass(ImageController));

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

import { testClient } from "../../test/testClient.js";
import { expect, describe, it } from "@jest/globals";
import {
  isCommunity,
  isDuplicateError,
  isInvalidArgumentError,
} from "@clovercoin/api-client";

describe("mutation: createCommunity", () => {
  it("creates a community", async () => {
    const { data, errors } = await testClient.createCommunity({
      variables: {
        input: {
          name: "Test Community",
        },
      },
    });
    expect(errors).toBeFalsy();
    const createdCommunity = data!.createCommunity;
    if (!isCommunity(createdCommunity)) {
      throw new Error("Invalid response");
    }
    await expect(createdCommunity).toMatchSnapshot({
      id: expect.any(String),
    });

    const fetchedCommunity = await testClient.getCommunity({
      variables: {
        filters: {
          id: createdCommunity.id,
        },
      },
    });
    expect(fetchedCommunity.errors).toBeFalsy();
    expect(fetchedCommunity.data.community).toEqual(createdCommunity);
  });

  describe("validation", () => {
    it("does not create a duplicate community", async () => {
      let { data, errors } = await testClient.createCommunity({
        variables: {
          input: { name: "Mock Community" },
        },
      });
      expect(errors).toBeFalsy();
      expect(isCommunity(data.createCommunity)).toBe(true);

      ({ data, errors } = await testClient.createCommunity({
        variables: {
          input: { name: "Mock Community" },
        },
      }));
      expect(errors).toBeFalsy();

      expect(isDuplicateError(data.createCommunity)).toBe(true);
      expect(data.createCommunity).toMatchInlineSnapshot(`
      {
        "__typename": "DuplicateError",
        "duplicateKeys": [
          "name",
        ],
        "message": "Duplicate error",
      }
    `);
    });
    it("does not create a community with too short of a name", async () => {
      const {
        data: { createCommunity },
      } = await testClient.createCommunity({
        variables: {
          input: {
            name: "Bo",
          },
        },
      });

      if (!isInvalidArgumentError(createCommunity)) {
        throw new Error(
          `Expected invalid argument error, got ${createCommunity.__typename}`
        );
      }

      expect(createCommunity.validationErrors).toHaveLength(1);
      expect(createCommunity.validationErrors[0].field).toBe("name");
      expect(createCommunity.validationErrors[0].constraints[0].key).toBe(
        "minLength"
      );
    });
  });
});

import { testClient } from "../../test/testClient";
import { expect, describe, it } from "@jest/globals";

describe("create commuity", () => {
  it("creates a community", async () => {
    const createdCommunity = await testClient.createCommunity({
      variables: {
        input: {
          name: "Test Community",
        },
      },
    });
    expect(createdCommunity.errors).toBeFalsy();

    await expect(createdCommunity).toMatchSnapshot({
      data: {
        createCommunity: {
          id: expect.any(String),
        },
      },
    });

    const fetchedCommunity = await testClient.getCommunity({
      variables: {
        filters: {
          id: createdCommunity.data!.createCommunity.id,
        },
      },
    });
    expect(fetchedCommunity.errors).toBeFalsy();

    expect(fetchedCommunity.data!.community).toEqual(
      createdCommunity.data!.createCommunity
    );
  });

  it("does not create a duplicate community", async () => {
    await testClient.createCommunity({
      variables: {
        input: { name: "Mock Community" },
      },
    });

    await expect(
      testClient.createCommunity({
        variables: {
          input: { name: "Mock Community" },
        },
      })
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"Duplicate name"`);
  });
});

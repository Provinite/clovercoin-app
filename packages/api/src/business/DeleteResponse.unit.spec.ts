import { DeleteResponse } from "./DeleteResponse.js";

describe("business:DeleteResponse", () => {
  it("instantiates with the specified ok-ness", () => {
    expect(new DeleteResponse(true).ok).toBe(true);
    expect(new DeleteResponse(false).ok).toBe(false);
  });
});

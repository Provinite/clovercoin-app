import { CommunityAuthorizer } from "../../models/Community/CommunityAuthorizer.js";
import { CritterAuthorizer } from "../../models/Critter/CritterAuthorizer.js";
import { IdentityAuthorizer } from "../../models/Identity/IdentityAuthorizer.js";
import { Authorizers } from "./Authorizers.js";
import { GlobalAuthorizer } from "./GlobalAuthorizer.js";

describe("Authorizers", () => {
  it("is a map of authorizers", () => {
    expect(Authorizers.CommunityAuthorizer).toBe(CommunityAuthorizer);
    expect(Authorizers.CritterAuthorizer).toBe(CritterAuthorizer);
    expect(Authorizers.GlobalAuthorizer).toBe(GlobalAuthorizer);
    expect(Authorizers.IdentityAuthorizer).toBe(IdentityAuthorizer);
    expect(Object.keys(Authorizers)).toMatchInlineSnapshot(`
      [
        "CritterAuthorizer",
        "CommunityAuthorizer",
        "GlobalAuthorizer",
        "IdentityAuthorizer",
      ]
    `);
  });
});

import { ResolversArray, ResolversMap } from "./Resolvers.js";

describe("Resolvers", () => {
  describe("ResolversMap", () => {
    it("is stable", () => {
      expect(Object.keys(ResolversMap)).toMatchInlineSnapshot(`
        [
          "CommunityResolver",
          "CritterResolver",
          "LoginResolver",
          "SpeciesResolver",
          "TraitResolver",
          "SpeciesVariantResolver",
          "TraitListEntryResolver",
          "EnumValueSettingResolver",
          "IdentityResolver",
          "InviteCodeResolver",
          "RoleResolver",
          "CommunityInvitationResolver",
          "CommunityMemberResolver",
        ]
      `);
    });
    it("is a map of class names to classes", () => {
      for (const [name, clazz] of Object.entries(ResolversMap)) {
        expect(name).toEqual(clazz.name);
      }
    });
  });
  describe("ResolversArray", () => {
    it("is the values of ResolversMap", () => {
      expect(ResolversArray).toEqual(Object.values(ResolversMap));
    });
  });
});

import { BCRYPT_MAX_STR_BYTES } from "./BcryptMaxStringSizeExceededError";
import { compareHash } from "./compareHash";

describe("compareHash", () => {
  describe("error handling", () => {
    it("errors on oversized passwords", async () => {
      const oversizedPassword =
        "🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕";
      expect(oversizedPassword.length).toBeLessThan(BCRYPT_MAX_STR_BYTES);
      await expect(
        compareHash(oversizedPassword, "doesn't matter")
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Password exceeds maximum bytes. 128 > 72"`
      );
    });
  });
});

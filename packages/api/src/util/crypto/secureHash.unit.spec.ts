import { BCRYPT_MAX_STR_BYTES } from "./BcryptMaxStringSizeExceededError";
import { secureHash } from "./secureHash";

describe("secureHash", () => {
  describe("error handling", () => {
    it("errors on oversized passwords", async () => {
      const oversizedPassword =
        "🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕";
      expect(oversizedPassword.length).toBeLessThan(BCRYPT_MAX_STR_BYTES);
      await expect(
        secureHash(oversizedPassword)
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Password exceeds maximum bytes. 128 > 72"`
      );
    });
  });
  it("returns a string with the $2a$ or $2b$ prefix", async () => {
    await expect(secureHash("password")).resolves.toEqual(
      expect.stringMatching(/^\$2(a|b)\$/)
    );
  });
});

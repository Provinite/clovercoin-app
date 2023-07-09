import { compareHash } from "./compareHash.js";
import { secureHash } from "./secureHash.js";

describe("utils:crypto", () => {
  describe("password hashing", () => {
    it("hashes and compares on the happy path", async () => {
      const plaintextPassword =
        "WQnJhzQmqRum0dT5qX04UX2WMfQiR6cSzC#l%K#KpZ7aFHD🍕Jsum2c8C0NdbWU#";
      const hashedPassword = await secureHash(plaintextPassword);
      const match = await compareHash(plaintextPassword, hashedPassword);
      expect(match).toBe(true);
    });
    it("does not match the wrong password", async () => {
      const plaintextPassword =
        "WQnJhzQmqRum0dT5qX04UX2WMfQiR6cSzC#l%K#KpZ7aFHD🍕Jsum2c8C0NdbWU#";
      const hashedPassword = await secureHash(plaintextPassword);
      const match = await compareHash(
        plaintextPassword.replace("🍕", ""),
        hashedPassword
      );
      expect(match).toBe(false);
    });
  });
});

import {
  ControllerName,
  ControllersArray,
  ControllersMap,
} from "./Controllers.js";
import { EntityController } from "./EntityController.js";

jest.mock("../util/jwt/jwtSecret.js", () => {});

describe("business:Controllers", () => {
  describe("ControllersMap", () => {
    it("exports a list of controller classes by name", () => {
      expect.hasAssertions();
      for (const [className, clazz] of Object.entries(ControllersMap)) {
        expect(className).toEqual(clazz.name);
        if (className !== "LoginController") {
          expect(clazz.prototype).toBeInstanceOf(EntityController);
        }
      }
    });
  });

  describe("ControllersArray", () => {
    it("is a list of all the controllers", () => {
      expect.hasAssertions();
      for (const clazz of ControllersArray) {
        expect(ControllersMap[clazz.name as ControllerName]).toBe(clazz);
      }
    });
  });
});

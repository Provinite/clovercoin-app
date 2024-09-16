jest.mock("./Preauthorize");
import { Authenticated } from "./Authenticated.js";
import { Preauthorize } from "./Preauthorize.js";
describe("decorator:Authenticated", () => {
  it("aliases Preauthorize", () => {
    const mockResult = {};
    (Preauthorize as jest.Mock).mockReturnValueOnce(mockResult);
    const result = Authenticated();
    expect(Preauthorize).toHaveBeenCalledTimes(1);
    expect(Preauthorize).toHaveBeenCalledWith();
    expect(result).toBe(mockResult);
  });
});

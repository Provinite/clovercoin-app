jest.mock("./Preauthorize.js");
import { asMock } from "../../test/asMock.js";
import { Authenticated } from "./Authenticated.js";
import { Preauthorize as _Preauthorize } from "./Preauthorize.js";
const Preauthorize = asMock(_Preauthorize);
describe("decorator:Authenticated", () => {
  it("aliases Preauthorize", () => {
    const mockResult = {};
    asMock(Preauthorize).mockReturnValueOnce(mockResult as any);
    const result = Authenticated();
    expect(Preauthorize).toHaveBeenCalledTimes(1);
    expect(Preauthorize).toHaveBeenCalledWith();
    expect(result).toBe(mockResult);
  });
});

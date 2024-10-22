import { TypeCheckMockModule } from "../test/TypeCheckMockModule.js";

export const getDbEnvironment = jest.fn();
export const getHttpEnvironment = jest.fn();
export const getJwtConfig = jest.fn();
export const getS3Environment = jest.fn();
export const getSesEnvironment = jest.fn();
export const getAppEnvironment = jest.fn();
export const getBootstrapEnvironment = jest.fn();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type doesMockCorrectly = TypeCheckMockModule<
  typeof import("./environment.js"),
  typeof import("../environment.js")
>;

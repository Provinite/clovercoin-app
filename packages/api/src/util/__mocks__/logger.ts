import { Logger } from "winston";

export const logger: Partial<Logger> = {
  child: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  log: jest.fn(),
};

beforeEach(() => {
  jest.spyOn(logger, "child").mockReturnThis();
});

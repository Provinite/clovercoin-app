export interface ErrorResponse {
  errors: {
    message: string;
    locations: { line: number; column: number }[];
    path: string[];
  }[];
}
export class GraphqlError extends Error {
  constructor(public rawResponse: ErrorResponse) {
    super(rawResponse.errors[0]?.message);
  }
}

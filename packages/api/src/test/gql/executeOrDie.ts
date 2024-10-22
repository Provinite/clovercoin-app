import { ExecutionArgs, execute } from "graphql";

/**
 * Execute a graphql query (against an executable schema,
 * not over the network) and throw an error if the result
 * has any errors.
 */
export async function executeOrDie(args: ExecutionArgs) {
  const result = await execute(args);
  const { errors } = result;
  if (errors && errors.length) {
    errors.forEach((e) => {
      console.error(e.originalError || e);
    });
    throw errors.length > 1
      ? new AggregateError(errors.map((e) => e.originalError).filter(Boolean))
      : errors[0].originalError;
  }
  return result;
}

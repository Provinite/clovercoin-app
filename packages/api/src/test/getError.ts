export const getError = async (fn: () => any) => {
  try {
    await fn();
  } catch (err) {
    return err;
  }
  throw new Error("Expected function to reject, but it did not");
};

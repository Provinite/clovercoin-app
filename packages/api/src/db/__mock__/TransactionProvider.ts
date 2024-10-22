import { UnmockedMethodError } from "../../test/UnmockedMethodError.js";

export class TransactionProvider {
  runTransaction() {
    throw new UnmockedMethodError(
      this.constructor.name ?? TransactionProvider.name,
      "runTransaction"
    );
  }
}
export const mockTransactionProvider = TransactionProvider;

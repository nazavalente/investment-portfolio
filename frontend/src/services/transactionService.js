import api from "./api";
import CrudService from "./CrudService";

class TransactionService extends CrudService {
  constructor(httpClient) {
    super(httpClient, "/transactions");
    this.bindMethods(
      "getAllTransactions",
      "getTransactionById",
      "createTransaction",
      "updateTransaction",
      "deleteTransaction"
    );
  }

  getAllTransactions() {
    return this.getAll();
  }

  getTransactionById(id) {
    return this.getById(id);
  }

  createTransaction(payload) {
    return this.create(payload);
  }

  updateTransaction(id, payload) {
    return this.update(id, payload);
  }

  deleteTransaction(id) {
    return this.remove(id);
  }
}

export const transactionService = new TransactionService(api);

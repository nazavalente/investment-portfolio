import api from "./api";

export const transactionService = {
  getAllTransactions: async () => {
    const response = await api.get("/transactions");
    return response.data.data;
  },

  getTransactionById: async (id) => {
    const response = await api.get(`/transactions/${id}`);
    return response.data.data;
  },

  createTransaction: async (payload) => {
    const response = await api.post("/transactions", payload);
    return response.data.data;
  },

  updateTransaction: async (id, payload) => {
    const response = await api.put(`/transactions/${id}`, payload);
    return response.data.data;
  },

  deleteTransaction: async (id) => {
    const response = await api.delete(`/transactions/${id}`);
    return response.data;
  },
};
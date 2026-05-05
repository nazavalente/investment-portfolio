import {
  createTransactionData,
  deleteTransactionData,
  getAllTransactions,
  getTransactionDetail,
  updateTransactionData,
} from "../services/transactionService.js";
import { errorResponse, successResponse } from "../utils/responseFormatter.js";

export const getTransactions = async (req, res) => {
  try {
    const transactions = await getAllTransactions(req.user.id);
    return successResponse(res, transactions, "Daftar transaksi berhasil diambil");
  } catch (error) {
    return errorResponse(res, error.message, error.status || 500);
  }
};

export const getTransactionById = async (req, res) => {
  try {
    const transaction = await getTransactionDetail(req.user.id, req.params.id);
    return successResponse(res, transaction, "Detail transaksi berhasil diambil");
  } catch (error) {
    return errorResponse(res, error.message, error.status || 500);
  }
};

export const createTransaction = async (req, res) => {
  try {
    const transaction = await createTransactionData(req.user.id, req.body);
    return successResponse(res, transaction, "Transaksi berhasil ditambahkan", 201);
  } catch (error) {
    return errorResponse(res, error.message, error.status || 500);
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const transaction = await updateTransactionData(
      req.user.id,
      req.params.id,
      req.body
    );
    return successResponse(res, transaction, "Transaksi berhasil diperbarui");
  } catch (error) {
    return errorResponse(res, error.message, error.status || 500);
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const result = await deleteTransactionData(req.user.id, req.params.id);
    return successResponse(res, result, "Transaksi berhasil dihapus");
  } catch (error) {
    return errorResponse(res, error.message, error.status || 500);
  }
};
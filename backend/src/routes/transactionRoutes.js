import express from "express";
import {
  getTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transactionController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import validateMiddleware from "../middlewares/validateMiddleware.js";
import { validateTransaction } from "../validators/transactionValidator.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getTransactions);
router.get("/:id", getTransactionById);
router.post("/", validateMiddleware(validateTransaction), createTransaction);
router.put("/:id", validateMiddleware(validateTransaction), updateTransaction);
router.delete("/:id", deleteTransaction);

export default router;
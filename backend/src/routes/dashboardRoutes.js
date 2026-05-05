import express from "express";
import {
  getDashboardSummary,
  getPortfolioAllocation,
  getPortfolioPerformance,
  getProfitLossSummary,
} from "../controllers/dashboardController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/summary", getDashboardSummary);
router.get("/allocation", getPortfolioAllocation);
router.get("/performance", getPortfolioPerformance);
router.get("/profit-loss", getProfitLossSummary);

export default router;
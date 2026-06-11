import express from "express";
import { controllers, middlewares } from "../container.js";

const router = express.Router();

router.use(middlewares.auth);
router.get("/summary", controllers.dashboard.getSummary);
router.get("/allocation", controllers.dashboard.getAllocation);
router.get("/performance", controllers.dashboard.getPerformance);
router.get("/profit-loss", controllers.dashboard.getProfitLoss);

export default router;

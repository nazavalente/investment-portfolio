import express from "express";
import authRoutes from "./authRoutes.js";
import assetRoutes from "./assetRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import transactionRoutes from "./transactionRoutes.js";
import targetRoutes from "./targetRoutes.js";
import watchlistRoutes from "./watchlistRoutes.js";
import dashboardRoutes from "./dashboardRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/assets", assetRoutes);
router.use("/categories", categoryRoutes);
router.use("/transactions", transactionRoutes);
router.use("/targets", targetRoutes);
router.use("/watchlist", watchlistRoutes);
router.use("/dashboard", dashboardRoutes);

export default router;
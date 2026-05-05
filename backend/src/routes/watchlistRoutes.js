import express from "express";
import {
  getWatchlists,
  getWatchlistById,
  createWatchlist,
  updateWatchlist,
  deleteWatchlist,
} from "../controllers/watchlistController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getWatchlists);
router.get("/:id", getWatchlistById);
router.post("/", createWatchlist);
router.put("/:id", updateWatchlist);
router.delete("/:id", deleteWatchlist);

export default router;
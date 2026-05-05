import express from "express";
import {
  getTargets,
  getTargetById,
  createTarget,
  updateTarget,
  deleteTarget,
} from "../controllers/targetController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getTargets);
router.get("/:id", getTargetById);
router.post("/", createTarget);
router.put("/:id", updateTarget);
router.delete("/:id", deleteTarget);

export default router;
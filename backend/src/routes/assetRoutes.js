import express from "express";
import {
  getAssets,
  getAssetById,
  createAsset,
  updateAsset,
  deleteAsset,
} from "../controllers/assetController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import validateMiddleware from "../middlewares/validateMiddleware.js";
import { validateAsset } from "../validators/assetValidator.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getAssets);
router.get("/:id", getAssetById);
router.post("/", validateMiddleware(validateAsset), createAsset);
router.put("/:id", validateMiddleware(validateAsset), updateAsset);
router.delete("/:id", deleteAsset);

export default router;
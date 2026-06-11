import express from "express";
import { controllers, middlewares } from "../container.js";
import validateMiddleware from "../middlewares/validateMiddleware.js";
import { validateAsset } from "../validators/assetValidator.js";

const router = express.Router();

router.use(middlewares.auth);
router.get("/", controllers.asset.getAll);
router.get("/:id", controllers.asset.getById);
router.post(
  "/",
  validateMiddleware(validateAsset),
  controllers.asset.create
);
router.put(
  "/:id",
  validateMiddleware(validateAsset),
  controllers.asset.update
);
router.delete("/:id", controllers.asset.delete);

export default router;

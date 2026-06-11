import express from "express";
import { controllers, middlewares } from "../container.js";
import validateMiddleware from "../middlewares/validateMiddleware.js";
import { validateTransaction } from "../validators/transactionValidator.js";

const router = express.Router();

router.use(middlewares.auth);
router.get("/", controllers.transaction.getAll);
router.get("/:id", controllers.transaction.getById);
router.post(
  "/",
  validateMiddleware(validateTransaction),
  controllers.transaction.create
);
router.put(
  "/:id",
  validateMiddleware(validateTransaction),
  controllers.transaction.update
);
router.delete("/:id", controllers.transaction.delete);

export default router;

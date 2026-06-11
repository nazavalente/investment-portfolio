import express from "express";
import { controllers, middlewares } from "../container.js";

const router = express.Router();

router.use(middlewares.auth);
router.get("/", controllers.category.getAll);
router.get("/:id", controllers.category.getById);
router.post("/", controllers.category.create);
router.put("/:id", controllers.category.update);
router.delete("/:id", controllers.category.delete);

export default router;

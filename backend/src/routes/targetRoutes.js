import express from "express";
import { controllers, middlewares } from "../container.js";

const router = express.Router();

router.use(middlewares.auth);
router.get("/", controllers.target.getAll);
router.get("/:id", controllers.target.getById);
router.post("/", controllers.target.create);
router.put("/:id", controllers.target.update);
router.delete("/:id", controllers.target.delete);

export default router;

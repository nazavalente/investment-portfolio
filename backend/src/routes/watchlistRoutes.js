import express from "express";
import { controllers, middlewares } from "../container.js";

const router = express.Router();

router.use(middlewares.auth);
router.get("/", controllers.watchlist.getAll);
router.get("/:id", controllers.watchlist.getById);
router.post("/", controllers.watchlist.create);
router.put("/:id", controllers.watchlist.update);
router.delete("/:id", controllers.watchlist.delete);

export default router;

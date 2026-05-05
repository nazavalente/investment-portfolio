import express from "express";
import { getMe, login, register } from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import validateMiddleware from "../middlewares/validateMiddleware.js";
import { validateLogin, validateRegister } from "../validators/authValidator.js";

const router = express.Router();

router.post("/register", validateMiddleware(validateRegister), register);
router.post("/login", validateMiddleware(validateLogin), login);
router.get("/me", authMiddleware, getMe);

export default router;
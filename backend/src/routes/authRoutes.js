import express from "express";
import { controllers, middlewares } from "../container.js";
import validateMiddleware from "../middlewares/validateMiddleware.js";
import { validateLogin, validateRegister } from "../validators/authValidator.js";

const router = express.Router();

router.post(
  "/register",
  validateMiddleware(validateRegister),
  controllers.auth.register
);
router.post(
  "/login",
  validateMiddleware(validateLogin),
  controllers.auth.login
);
router.get("/me", middlewares.auth, controllers.auth.getMe);

export default router;

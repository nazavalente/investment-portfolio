import jwt from "jsonwebtoken";
import { errorResponse } from "../utils/responseFormatter.js";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return errorResponse(res, "Token tidak ditemukan", 401);
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    return errorResponse(res, "Token tidak valid", 401);
  }
};

export default authMiddleware;
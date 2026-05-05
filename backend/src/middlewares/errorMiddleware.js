import { errorResponse } from "../utils/responseFormatter.js";

const errorMiddleware = (err, req, res, next) => {
  console.error("Unhandled Error:", err);

  const statusCode = err.status || 500;
  const message = err.message || "Terjadi kesalahan pada server";

  return errorResponse(res, message, statusCode);
};

export default errorMiddleware;
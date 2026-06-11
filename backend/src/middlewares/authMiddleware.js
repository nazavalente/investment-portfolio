import { errorResponse } from "../utils/responseFormatter.js";

export default class AuthMiddleware {
  constructor(tokenService) {
    this.tokenService = tokenService;
    this.handle = this.handle.bind(this);
  }

  handle(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return errorResponse(res, "Token tidak ditemukan", 401);
    }

    try {
      req.user = this.tokenService.verify(authHeader.slice(7));
      return next();
    } catch {
      return errorResponse(res, "Token tidak valid", 401);
    }
  }
}

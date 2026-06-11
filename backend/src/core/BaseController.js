import { successResponse } from "../utils/responseFormatter.js";

export default class BaseController {
  async execute(next, action) {
    try {
      return await action();
    } catch (error) {
      return next(error);
    }
  }

  success(res, data, message, status = 200) {
    return successResponse(res, data, message, status);
  }
}

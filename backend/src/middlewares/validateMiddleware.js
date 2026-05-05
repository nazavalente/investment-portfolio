import { errorResponse } from "../utils/responseFormatter.js";

const validateMiddleware = (validator) => {
  return (req, res, next) => {
    const errors = validator(req.body);

    if (errors.length > 0) {
      return errorResponse(res, "Validasi gagal", 400, errors);
    }

    next();
  };
};

export default validateMiddleware;
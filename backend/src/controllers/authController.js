import {
  getProfile,
  loginUser,
  registerUser,
} from "../services/authService.js";
import {
  errorResponse,
  successResponse,
} from "../utils/responseFormatter.js";

export const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);

    return successResponse(res, user, "Register berhasil", 201);
  } catch (error) {
    return errorResponse(
      res,
      error.message || "Terjadi kesalahan pada server",
      error.status || 500
    );
  }
};

export const login = async (req, res) => {
  try {
    const data = await loginUser(req.body);

    return successResponse(res, data, "Login berhasil", 200);
  } catch (error) {
    return errorResponse(
      res,
      error.message || "Terjadi kesalahan pada server",
      error.status || 500
    );
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await getProfile(req.user.id);

    return successResponse(res, user, "Data profil berhasil diambil", 200);
  } catch (error) {
    return errorResponse(
      res,
      error.message || "Terjadi kesalahan pada server",
      error.status || 500
    );
  }
};
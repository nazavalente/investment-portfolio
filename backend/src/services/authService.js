import prisma from "../config/db.js";
import generateToken from "../utils/generateToken.js";
import { comparePassword, hashPassword } from "../utils/hashPassword.js";

const createError = (message, status) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

export const registerUser = async ({ name, email, password }) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw createError("Email sudah digunakan", 409);
  }

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
};

export const loginUser = async ({ email, password }) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw createError("Email atau password salah", 401);
  }

  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    throw createError("Email atau password salah", 401);
  }

  const token = generateToken({
    id: user.id,
    email: user.email,
  });

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
};

export const getProfile = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });

  if (!user) {
    throw createError("User tidak ditemukan", 404);
  }

  return user;
};
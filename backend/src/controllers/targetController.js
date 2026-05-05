import prisma from "../config/db.js";
import { errorResponse, successResponse } from "../utils/responseFormatter.js";

const parseId = (value) => Number(value);
const parseNumber = (value, fallback = 0) => {
  if (value === undefined || value === null || value === "") return fallback;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? fallback : parsed;
};

const formatTarget = (item) => ({
  id: item.id,
  target_name: item.targetName,
  target_amount: item.targetAmount,
  current_progress: item.currentProgress,
  deadline: item.deadline,
  notes: item.notes,
  created_at: item.createdAt,
});

export const getTargets = async (req, res) => {
  try {
    const targets = await prisma.financialTarget.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: "desc" },
    });

    return successResponse(
      res,
      targets.map(formatTarget),
      "Daftar target berhasil diambil"
    );
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

export const getTargetById = async (req, res) => {
  try {
    const id = parseId(req.params.id);

    if (Number.isNaN(id)) {
      return errorResponse(res, "ID target tidak valid", 400);
    }

    const target = await prisma.financialTarget.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!target) {
      return errorResponse(res, "Target tidak ditemukan", 404);
    }

    return successResponse(res, formatTarget(target), "Detail target berhasil diambil");
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

export const createTarget = async (req, res) => {
  try {
    const targetName = req.body.target_name ?? req.body.targetName;
    const targetAmount = parseNumber(req.body.target_amount ?? req.body.targetAmount);
    const currentProgress = parseNumber(
      req.body.current_progress ?? req.body.currentProgress,
      0
    );
    const deadlineValue = req.body.deadline;
    const deadline = deadlineValue ? new Date(deadlineValue) : null;
    const notes = req.body.notes ?? null;

    if (!targetName || !targetAmount) {
      return errorResponse(res, "Nama target dan nominal target wajib diisi", 400);
    }

    const created = await prisma.financialTarget.create({
      data: {
        targetName,
        targetAmount,
        currentProgress,
        deadline,
        notes,
        userId: req.user.id,
      },
    });

    return successResponse(res, formatTarget(created), "Target berhasil ditambahkan", 201);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

export const updateTarget = async (req, res) => {
  try {
    const id = parseId(req.params.id);

    if (Number.isNaN(id)) {
      return errorResponse(res, "ID target tidak valid", 400);
    }

    const existing = await prisma.financialTarget.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!existing) {
      return errorResponse(res, "Target tidak ditemukan", 404);
    }

    const targetName = req.body.target_name ?? req.body.targetName ?? existing.targetName;
    const targetAmount =
      req.body.target_amount !== undefined || req.body.targetAmount !== undefined
        ? parseNumber(req.body.target_amount ?? req.body.targetAmount)
        : existing.targetAmount;

    const currentProgress =
      req.body.current_progress !== undefined || req.body.currentProgress !== undefined
        ? parseNumber(req.body.current_progress ?? req.body.currentProgress, 0)
        : existing.currentProgress;

    const deadline =
      req.body.deadline !== undefined
        ? req.body.deadline
          ? new Date(req.body.deadline)
          : null
        : existing.deadline;

    const notes =
      req.body.notes !== undefined ? req.body.notes : existing.notes;

    const updated = await prisma.financialTarget.update({
      where: { id },
      data: {
        targetName,
        targetAmount,
        currentProgress,
        deadline,
        notes,
      },
    });

    return successResponse(res, formatTarget(updated), "Target berhasil diperbarui");
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

export const deleteTarget = async (req, res) => {
  try {
    const id = parseId(req.params.id);

    if (Number.isNaN(id)) {
      return errorResponse(res, "ID target tidak valid", 400);
    }

    const existing = await prisma.financialTarget.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!existing) {
      return errorResponse(res, "Target tidak ditemukan", 404);
    }

    await prisma.financialTarget.delete({
      where: { id },
    });

    return successResponse(res, { id }, "Target berhasil dihapus");
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};
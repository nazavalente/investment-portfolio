import prisma from "../config/db.js";
import { errorResponse, successResponse } from "../utils/responseFormatter.js";

const parseId = (value) => Number(value);
const parseNumber = (value, fallback = 0) => {
  if (value === undefined || value === null || value === "") return fallback;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? fallback : parsed;
};

const formatWatchlist = (item) => ({
  id: item.id,
  asset_name: item.assetName,
  asset_code: item.assetCode,
  target_buy_price: item.targetBuyPrice,
  current_price: item.currentPrice,
  priority_level: item.priorityLevel,
  status: item.status,
  notes: item.notes,
  created_at: item.createdAt,
});

export const getWatchlists = async (req, res) => {
  try {
    const items = await prisma.watchlist.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: "desc" },
    });

    return successResponse(
      res,
      items.map(formatWatchlist),
      "Daftar watchlist berhasil diambil"
    );
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

export const getWatchlistById = async (req, res) => {
  try {
    const id = parseId(req.params.id);

    if (Number.isNaN(id)) {
      return errorResponse(res, "ID watchlist tidak valid", 400);
    }

    const item = await prisma.watchlist.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!item) {
      return errorResponse(res, "Watchlist tidak ditemukan", 404);
    }

    return successResponse(
      res,
      formatWatchlist(item),
      "Detail watchlist berhasil diambil"
    );
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

export const createWatchlist = async (req, res) => {
  try {
    const assetName = req.body.asset_name ?? req.body.assetName;
    const assetCode = req.body.asset_code ?? req.body.assetCode;
    const targetBuyPrice = parseNumber(
      req.body.target_buy_price ?? req.body.targetBuyPrice
    );
    const currentPrice = parseNumber(
      req.body.current_price ?? req.body.currentPrice,
      0
    );
    const priorityLevel = req.body.priority_level ?? req.body.priorityLevel ?? null;
    const status = req.body.status ?? "Aktif";
    const notes = req.body.notes ?? null;

    if (!assetName || !assetCode || !targetBuyPrice) {
      return errorResponse(
        res,
        "Nama aset, kode aset, dan target harga beli wajib diisi",
        400
      );
    }

    const created = await prisma.watchlist.create({
      data: {
        assetName,
        assetCode,
        targetBuyPrice,
        currentPrice,
        priorityLevel,
        status,
        notes,
        userId: req.user.id,
      },
    });

    return successResponse(
      res,
      formatWatchlist(created),
      "Watchlist berhasil ditambahkan",
      201
    );
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

export const updateWatchlist = async (req, res) => {
  try {
    const id = parseId(req.params.id);

    if (Number.isNaN(id)) {
      return errorResponse(res, "ID watchlist tidak valid", 400);
    }

    const existing = await prisma.watchlist.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!existing) {
      return errorResponse(res, "Watchlist tidak ditemukan", 404);
    }

    const assetName = req.body.asset_name ?? req.body.assetName ?? existing.assetName;
    const assetCode = req.body.asset_code ?? req.body.assetCode ?? existing.assetCode;
    const targetBuyPrice =
      req.body.target_buy_price !== undefined || req.body.targetBuyPrice !== undefined
        ? parseNumber(req.body.target_buy_price ?? req.body.targetBuyPrice)
        : existing.targetBuyPrice;

    const currentPrice =
      req.body.current_price !== undefined || req.body.currentPrice !== undefined
        ? parseNumber(req.body.current_price ?? req.body.currentPrice, 0)
        : existing.currentPrice;

    const priorityLevel =
      req.body.priority_level ?? req.body.priorityLevel ?? existing.priorityLevel;

    const status = req.body.status ?? existing.status;
    const notes = req.body.notes !== undefined ? req.body.notes : existing.notes;

    const updated = await prisma.watchlist.update({
      where: { id },
      data: {
        assetName,
        assetCode,
        targetBuyPrice,
        currentPrice,
        priorityLevel,
        status,
        notes,
      },
    });

    return successResponse(
      res,
      formatWatchlist(updated),
      "Watchlist berhasil diperbarui"
    );
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

export const deleteWatchlist = async (req, res) => {
  try {
    const id = parseId(req.params.id);

    if (Number.isNaN(id)) {
      return errorResponse(res, "ID watchlist tidak valid", 400);
    }

    const existing = await prisma.watchlist.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!existing) {
      return errorResponse(res, "Watchlist tidak ditemukan", 404);
    }

    await prisma.watchlist.delete({
      where: { id },
    });

    return successResponse(res, { id }, "Watchlist berhasil dihapus");
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};
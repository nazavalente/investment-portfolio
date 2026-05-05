import prisma from "../config/db.js";
import { formatAsset, toNumber } from "./calculationService.js";

const createError = (message, status = 500) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

export const getAllAssets = async (userId) => {
  const assets = await prisma.asset.findMany({
    where: { userId },
    include: {
      category: true,
      transactions: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return assets.map(formatAsset);
};

export const getAssetDetail = async (userId, assetId) => {
  const parsedId = Number(assetId);

  if (Number.isNaN(parsedId)) {
    throw createError("ID aset tidak valid", 400);
  }

  const asset = await prisma.asset.findFirst({
    where: {
      id: parsedId,
      userId,
    },
    include: {
      category: true,
      transactions: true,
    },
  });

  if (!asset) {
    throw createError("Aset tidak ditemukan", 404);
  }

  return formatAsset(asset);
};

export const createAssetData = async (userId, payload) => {
  const assetName = payload.asset_name ?? payload.assetName;
  const assetCode = payload.asset_code ?? payload.assetCode;
  const assetType = payload.asset_type ?? payload.assetType;
  const platform = payload.platform ?? null;
  const riskLevel = payload.risk_level ?? payload.riskLevel ?? null;
  const currentPrice = toNumber(payload.current_price ?? payload.currentPrice);
  const description = payload.description ?? null;

  const categoryIdRaw = payload.category_id ?? payload.categoryId;
  const categoryId =
    categoryIdRaw !== undefined && categoryIdRaw !== null && categoryIdRaw !== ""
      ? Number(categoryIdRaw)
      : null;

  if (!assetName || !assetCode || !assetType) {
    throw createError("Nama aset, kode aset, dan tipe aset wajib diisi", 400);
  }

  if (categoryId) {
    const category = await prisma.category.findFirst({
      where: {
        id: categoryId,
        userId,
      },
    });

    if (!category) {
      throw createError("Kategori tidak valid", 400);
    }
  }

  const asset = await prisma.asset.create({
    data: {
      assetName,
      assetCode,
      assetType,
      platform,
      riskLevel,
      currentPrice,
      description,
      categoryId,
      userId,
    },
    include: {
      category: true,
      transactions: true,
    },
  });

  return formatAsset(asset);
};

export const updateAssetData = async (userId, assetId, payload) => {
  const parsedId = Number(assetId);

  if (Number.isNaN(parsedId)) {
    throw createError("ID aset tidak valid", 400);
  }

  const existing = await prisma.asset.findFirst({
    where: {
      id: parsedId,
      userId,
    },
    include: {
      category: true,
      transactions: true,
    },
  });

  if (!existing) {
    throw createError("Aset tidak ditemukan", 404);
  }

  const assetName = payload.asset_name ?? payload.assetName ?? existing.assetName;
  const assetCode = payload.asset_code ?? payload.assetCode ?? existing.assetCode;
  const assetType = payload.asset_type ?? payload.assetType ?? existing.assetType;
  const platform = payload.platform ?? existing.platform;
  const riskLevel = payload.risk_level ?? payload.riskLevel ?? existing.riskLevel;
  const currentPrice =
    payload.current_price !== undefined || payload.currentPrice !== undefined
      ? toNumber(payload.current_price ?? payload.currentPrice)
      : existing.currentPrice;
  const description =
    payload.description !== undefined ? payload.description : existing.description;

  const categoryIdRaw = payload.category_id ?? payload.categoryId;
  const categoryId =
    categoryIdRaw !== undefined
      ? categoryIdRaw === "" || categoryIdRaw === null
        ? null
        : Number(categoryIdRaw)
      : existing.categoryId;

  if (categoryId) {
    const category = await prisma.category.findFirst({
      where: {
        id: categoryId,
        userId,
      },
    });

    if (!category) {
      throw createError("Kategori tidak valid", 400);
    }
  }

  const updated = await prisma.asset.update({
    where: { id: parsedId },
    data: {
      assetName,
      assetCode,
      assetType,
      platform,
      riskLevel,
      currentPrice,
      description,
      categoryId,
    },
    include: {
      category: true,
      transactions: true,
    },
  });

  return formatAsset(updated);
};

export const deleteAssetData = async (userId, assetId) => {
  const parsedId = Number(assetId);

  if (Number.isNaN(parsedId)) {
    throw createError("ID aset tidak valid", 400);
  }

  const existing = await prisma.asset.findFirst({
    where: {
      id: parsedId,
      userId,
    },
  });

  if (!existing) {
    throw createError("Aset tidak ditemukan", 404);
  }

  await prisma.asset.delete({
    where: { id: parsedId },
  });

  return { id: parsedId };
};
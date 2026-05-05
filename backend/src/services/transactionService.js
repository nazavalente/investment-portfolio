import prisma from "../config/db.js";
import {
  formatTransaction,
  normalizeTransactionType,
  toNumber,
  summarizeTransactions,
} from "./calculationService.js";

const createError = (message, status = 500) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

const findUserAsset = async (userId, payload) => {
  const assetId = payload.asset_id ?? payload.assetId;
  const assetName = payload.asset_name ?? payload.assetName;
  const assetCode = payload.asset_code ?? payload.assetCode;

  if (assetId) {
    return prisma.asset.findFirst({
      where: {
        id: Number(assetId),
        userId,
      },
      include: { transactions: true },
    });
  }

  if (assetName || assetCode) {
    return prisma.asset.findFirst({
      where: {
        userId,
        OR: [
          assetName ? { assetName } : undefined,
          assetCode ? { assetCode } : undefined,
        ].filter(Boolean),
      },
      include: { transactions: true },
    });
  }

  return null;
};

const validateSellQuantity = (asset, quantity, excludeTransactionId = null) => {
  const transactions = excludeTransactionId
    ? asset.transactions.filter((trx) => trx.id !== Number(excludeTransactionId))
    : asset.transactions;

  const summary = summarizeTransactions(transactions, asset.currentPrice);
  const availableQuantity = summary.totalQuantity;

  if (quantity > availableQuantity) {
    throw createError(
      `Jumlah jual melebihi aset yang dimiliki. Quantity tersedia: ${availableQuantity}`,
      400
    );
  }
};

export const getAllTransactions = async (userId) => {
  const transactions = await prisma.transaction.findMany({
    where: { userId },
    include: { asset: true },
    orderBy: { transactionDate: "desc" },
  });

  return transactions.map(formatTransaction);
};

export const getTransactionDetail = async (userId, transactionId) => {
  const parsedId = Number(transactionId);

  if (Number.isNaN(parsedId)) {
    throw createError("ID transaksi tidak valid", 400);
  }

  const transaction = await prisma.transaction.findFirst({
    where: {
      id: parsedId,
      userId,
    },
    include: { asset: true },
  });

  if (!transaction) {
    throw createError("Transaksi tidak ditemukan", 404);
  }

  return formatTransaction(transaction);
};

export const createTransactionData = async (userId, payload) => {
  const asset = await findUserAsset(userId, payload);

  if (!asset) {
    throw createError("Aset tidak ditemukan atau tidak valid", 400);
  }

  const transactionType = normalizeTransactionType(
    payload.transaction_type ?? payload.transactionType
  );
  const quantity = toNumber(payload.quantity);
  const pricePerUnit = toNumber(payload.price_per_unit ?? payload.pricePerUnit);
  const fee = toNumber(payload.fee, 0);
  const transactionDate = new Date(
    payload.transaction_date ?? payload.transactionDate
  );
  const notes = payload.notes ?? null;

  if (
    !transactionType ||
    quantity <= 0 ||
    pricePerUnit <= 0 ||
    Number.isNaN(transactionDate.getTime())
  ) {
    throw createError("Data transaksi tidak valid", 400);
  }

  if (String(transactionType).toLowerCase() === "jual") {
    validateSellQuantity(asset, quantity);
  }

  const created = await prisma.transaction.create({
    data: {
      transactionType,
      quantity,
      pricePerUnit,
      fee,
      transactionDate,
      notes,
      userId,
      assetId: asset.id,
    },
    include: { asset: true },
  });

  return formatTransaction(created);
};

export const updateTransactionData = async (userId, transactionId, payload) => {
  const parsedId = Number(transactionId);

  if (Number.isNaN(parsedId)) {
    throw createError("ID transaksi tidak valid", 400);
  }

  const existing = await prisma.transaction.findFirst({
    where: {
      id: parsedId,
      userId,
    },
    include: { asset: true },
  });

  if (!existing) {
    throw createError("Transaksi tidak ditemukan", 404);
  }

  const asset =
    (await findUserAsset(userId, payload)) ||
    (await prisma.asset.findFirst({
      where: {
        id: existing.assetId,
        userId,
      },
      include: { transactions: true },
    }));

  if (!asset) {
    throw createError("Aset tidak ditemukan", 400);
  }

  const assetId = asset.id;

  const transactionType =
    payload.transaction_type !== undefined || payload.transactionType !== undefined
      ? normalizeTransactionType(payload.transaction_type ?? payload.transactionType)
      : existing.transactionType;

  const quantity =
    payload.quantity !== undefined ? toNumber(payload.quantity) : existing.quantity;

  const pricePerUnit =
    payload.price_per_unit !== undefined || payload.pricePerUnit !== undefined
      ? toNumber(payload.price_per_unit ?? payload.pricePerUnit)
      : existing.pricePerUnit;

  const fee =
    payload.fee !== undefined ? toNumber(payload.fee, 0) : existing.fee;

  const transactionDate =
    payload.transaction_date !== undefined || payload.transactionDate !== undefined
      ? new Date(payload.transaction_date ?? payload.transactionDate)
      : existing.transactionDate;

  const notes =
    payload.notes !== undefined ? payload.notes : existing.notes;

  if (
    !transactionType ||
    quantity <= 0 ||
    pricePerUnit <= 0 ||
    Number.isNaN(transactionDate.getTime())
  ) {
    throw createError("Data transaksi tidak valid", 400);
  }

  if (String(transactionType).toLowerCase() === "jual") {
    validateSellQuantity(asset, quantity, parsedId);
  }

  const updated = await prisma.transaction.update({
    where: { id: parsedId },
    data: {
      transactionType,
      quantity,
      pricePerUnit,
      fee,
      transactionDate,
      notes,
      assetId,
    },
    include: { asset: true },
  });

  return formatTransaction(updated);
};

export const deleteTransactionData = async (userId, transactionId) => {
  const parsedId = Number(transactionId);

  if (Number.isNaN(parsedId)) {
    throw createError("ID transaksi tidak valid", 400);
  }

  const existing = await prisma.transaction.findFirst({
    where: {
      id: parsedId,
      userId,
    },
  });

  if (!existing) {
    throw createError("Transaksi tidak ditemukan", 404);
  }

  await prisma.transaction.delete({
    where: { id: parsedId },
  });

  return { id: parsedId };
};
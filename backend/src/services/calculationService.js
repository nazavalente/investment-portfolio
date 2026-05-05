const toNumber = (value, fallback = 0) => {
  if (value === undefined || value === null || value === "") return fallback;

  const parsed = Number(value);
  return Number.isNaN(parsed) ? fallback : parsed;
};

const normalizeTransactionType = (value) => {
  const raw = String(value || "").toLowerCase();

  if (raw === "buy" || raw === "beli") return "Beli";
  if (raw === "sell" || raw === "jual") return "Jual";

  return value;
};

const isBuyType = (type) => {
  return ["beli", "buy"].includes(String(type).toLowerCase());
};

const isSellType = (type) => {
  return ["jual", "sell"].includes(String(type).toLowerCase());
};

const summarizeTransactions = (transactions = [], currentPrice = 0) => {
  const sortedTransactions = [...transactions].sort((a, b) => {
    const dateA = new Date(a.transactionDate || a.createdAt || 0).getTime();
    const dateB = new Date(b.transactionDate || b.createdAt || 0).getTime();
    return dateA - dateB;
  });

  let totalBuyQuantity = 0;
  let totalSellQuantity = 0;

  let remainingQuantity = 0;
  let remainingCostBasis = 0;

  let realizedProfitLoss = 0;

  for (const trx of sortedTransactions) {
    const quantity = toNumber(trx.quantity);
    const pricePerUnit = toNumber(trx.pricePerUnit);
    const fee = toNumber(trx.fee);
    const transactionType = normalizeTransactionType(trx.transactionType);

    if (isBuyType(transactionType)) {
      totalBuyQuantity += quantity;
      remainingQuantity += quantity;
      remainingCostBasis += quantity * pricePerUnit + fee;
    }

    if (isSellType(transactionType)) {
      totalSellQuantity += quantity;

      if (remainingQuantity <= 0) {
        continue;
      }

      const matchedQty = Math.min(quantity, remainingQuantity);
      const averageCostPerUnit =
        remainingQuantity > 0 ? remainingCostBasis / remainingQuantity : 0;

      const costOfSold = averageCostPerUnit * matchedQty;
      const netSellProceeds = matchedQty * pricePerUnit - fee;

      realizedProfitLoss += netSellProceeds - costOfSold;

      remainingQuantity -= matchedQty;
      remainingCostBasis -= costOfSold;
    }
  }

  const averageBuyPrice =
    remainingQuantity > 0 ? remainingCostBasis / remainingQuantity : 0;

  const costBasis = remainingCostBasis;
  const currentValue = remainingQuantity > 0 ? remainingQuantity * currentPrice : 0;
  const unrealizedProfitLoss = currentValue - costBasis;
  const totalProfitLoss = realizedProfitLoss + unrealizedProfitLoss;

  return {
    totalQuantity: remainingQuantity,
    totalBuyQuantity,
    totalSellQuantity,
    averageBuyPrice,
    costBasis,
    currentValue,
    realizedProfitLoss,
    unrealizedProfitLoss,
    totalProfitLoss,
    profitLoss: totalProfitLoss,
  };
};

const formatAsset = (asset) => {
  const summary = summarizeTransactions(asset.transactions || [], asset.currentPrice);

  return {
    id: asset.id,
    category_id: asset.categoryId,
    category_name: asset.category?.categoryName ?? null,
    asset_name: asset.assetName,
    asset_code: asset.assetCode,
    asset_type: asset.assetType,
    platform: asset.platform,
    risk_level: asset.riskLevel,
    current_price: asset.currentPrice,
    description: asset.description,
    created_at: asset.createdAt,
    updated_at: asset.updatedAt,
    total_quantity: summary.totalQuantity,
    total_buy_quantity: summary.totalBuyQuantity,
    total_sell_quantity: summary.totalSellQuantity,
    average_buy_price: summary.averageBuyPrice,
    cost_basis: summary.costBasis,
    current_value: summary.currentValue,
    realized_profit_loss: summary.realizedProfitLoss,
    unrealized_profit_loss: summary.unrealizedProfitLoss,
    total_profit_loss: summary.totalProfitLoss,
    profit_loss: summary.totalProfitLoss,
  };
};

const formatTransaction = (transaction) => ({
  id: transaction.id,
  asset_id: transaction.assetId,
  asset_name: transaction.asset?.assetName ?? null,
  asset_code: transaction.asset?.assetCode ?? null,
  transaction_type: transaction.transactionType,
  quantity: transaction.quantity,
  price_per_unit: transaction.pricePerUnit,
  fee: transaction.fee,
  transaction_date: transaction.transactionDate,
  notes: transaction.notes,
  created_at: transaction.createdAt,
});

const formatDashboardPerformance = (asset) => {
  const summary = summarizeTransactions(asset.transactions || [], asset.currentPrice);

  return {
    asset_name: asset.assetName,
    asset_code: asset.assetCode,
    current_price: asset.currentPrice,
    remaining_quantity: summary.totalQuantity,
    average_buy_price: summary.averageBuyPrice,
    current_value: summary.currentValue,
    realized_profit_loss: summary.realizedProfitLoss,
    unrealized_profit_loss: summary.unrealizedProfitLoss,
    total_profit_loss: summary.totalProfitLoss,
    profit_loss: summary.totalProfitLoss,
  };
};

export {
  toNumber,
  normalizeTransactionType,
  isBuyType,
  isSellType,
  summarizeTransactions,
  formatAsset,
  formatTransaction,
  formatDashboardPerformance,
};
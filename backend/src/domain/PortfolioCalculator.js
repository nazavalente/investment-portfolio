export class TransactionType {
  static BUY = "Beli";
  static SELL = "Jual";

  static normalize(value) {
    const normalized = String(value || "").toLowerCase();

    if (["buy", "beli"].includes(normalized)) return TransactionType.BUY;
    if (["sell", "jual"].includes(normalized)) return TransactionType.SELL;

    return value;
  }

  static isBuy(value) {
    return TransactionType.normalize(value) === TransactionType.BUY;
  }

  static isSell(value) {
    return TransactionType.normalize(value) === TransactionType.SELL;
  }
}

export default class PortfolioCalculator {
  static toNumber(value, fallback = 0) {
    if (value === undefined || value === null || value === "") return fallback;

    const parsed = Number(value);
    return Number.isNaN(parsed) ? fallback : parsed;
  }

  summarize(transactions = [], currentPrice = 0) {
    const sortedTransactions = [...transactions].sort((first, second) => {
      const firstDate = new Date(
        first.transactionDate || first.createdAt || 0
      ).getTime();
      const secondDate = new Date(
        second.transactionDate || second.createdAt || 0
      ).getTime();
      return firstDate - secondDate;
    });

    let totalBuyQuantity = 0;
    let totalSellQuantity = 0;
    let remainingQuantity = 0;
    let remainingCostBasis = 0;
    let realizedProfitLoss = 0;

    for (const transaction of sortedTransactions) {
      const quantity = PortfolioCalculator.toNumber(transaction.quantity);
      const pricePerUnit = PortfolioCalculator.toNumber(
        transaction.pricePerUnit
      );
      const fee = PortfolioCalculator.toNumber(transaction.fee);

      if (TransactionType.isBuy(transaction.transactionType)) {
        totalBuyQuantity += quantity;
        remainingQuantity += quantity;
        remainingCostBasis += quantity * pricePerUnit + fee;
      }

      if (TransactionType.isSell(transaction.transactionType)) {
        totalSellQuantity += quantity;

        if (remainingQuantity <= 0) continue;

        const matchedQuantity = Math.min(quantity, remainingQuantity);
        const averageCostPerUnit = remainingCostBasis / remainingQuantity;
        const costOfSold = averageCostPerUnit * matchedQuantity;
        const netSellProceeds = matchedQuantity * pricePerUnit - fee;

        realizedProfitLoss += netSellProceeds - costOfSold;
        remainingQuantity -= matchedQuantity;
        remainingCostBasis -= costOfSold;
      }
    }

    const averageBuyPrice =
      remainingQuantity > 0 ? remainingCostBasis / remainingQuantity : 0;
    const currentValue =
      remainingQuantity > 0
        ? remainingQuantity * PortfolioCalculator.toNumber(currentPrice)
        : 0;
    const unrealizedProfitLoss = currentValue - remainingCostBasis;
    const totalProfitLoss = realizedProfitLoss + unrealizedProfitLoss;

    return {
      totalQuantity: remainingQuantity,
      totalBuyQuantity,
      totalSellQuantity,
      averageBuyPrice,
      costBasis: remainingCostBasis,
      currentValue,
      realizedProfitLoss,
      unrealizedProfitLoss,
      totalProfitLoss,
      profitLoss: totalProfitLoss,
    };
  }
}

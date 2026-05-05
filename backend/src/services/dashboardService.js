import prisma from "../config/db.js";
import {
  formatDashboardPerformance,
  summarizeTransactions,
} from "./calculationService.js";

export const getDashboardSummaryData = async (userId) => {
  const assets = await prisma.asset.findMany({
    where: { userId },
    include: { transactions: true },
  });

  const totalTargets = await prisma.financialTarget.count({
    where: { userId },
  });

  const assetSummaries = assets.map((asset) => ({
    asset,
    summary: summarizeTransactions(asset.transactions, asset.currentPrice),
  }));

  const activeAssets = assetSummaries.filter(
    ({ summary }) => summary.totalQuantity > 0
  );

  let totalPortfolio = 0;
  let totalProfitLoss = 0;

  for (const { summary } of assetSummaries) {
    totalPortfolio += summary.currentValue;
    totalProfitLoss += summary.totalProfitLoss;
  }

  return {
    totalPortfolio,
    totalProfitLoss,
    totalAssets: activeAssets.length,
    totalTargets,
  };
};

export const getPortfolioAllocationData = async (userId) => {
  const assets = await prisma.asset.findMany({
    where: { userId },
    include: { transactions: true },
  });

  const grouped = {};

  for (const asset of assets) {
    const summary = summarizeTransactions(asset.transactions, asset.currentPrice);

    if (summary.currentValue <= 0 || summary.totalQuantity <= 0) {
      continue;
    }

    const key = asset.assetType || "Lainnya";

    if (!grouped[key]) {
      grouped[key] = 0;
    }

    grouped[key] += summary.currentValue;
  }

  return Object.entries(grouped).map(([name, value]) => ({
    name,
    value,
  }));
};

export const getPortfolioPerformanceData = async (userId) => {
  const assets = await prisma.asset.findMany({
    where: { userId },
    include: { transactions: true },
  });

  return assets
    .map(formatDashboardPerformance)
    .filter((item) => item.current_value > 0 && item.remaining_quantity > 0);
};

export const getProfitLossSummaryData = async (userId) => {
  const assets = await prisma.asset.findMany({
    where: { userId },
    include: { transactions: true },
  });

  let totalProfit = 0;
  let totalLoss = 0;

  for (const asset of assets) {
    const summary = summarizeTransactions(asset.transactions, asset.currentPrice);

    if (summary.totalProfitLoss > 0) {
      totalProfit += summary.totalProfitLoss;
    } else if (summary.totalProfitLoss < 0) {
      totalLoss += Math.abs(summary.totalProfitLoss);
    }
  }

  return {
    totalProfit,
    totalLoss,
    netProfitLoss: totalProfit - totalLoss,
  };
};
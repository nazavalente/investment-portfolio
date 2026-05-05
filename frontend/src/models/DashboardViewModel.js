import { DEFAULT_CURRENCY } from "../constants";
import { formatCurrency } from "../utils/formatCurrency";

export class DashboardViewModel {
  static emptySummary = {
    totalPortfolio: 0,
    totalProfitLoss: 0,
    totalAssets: 0,
    totalTargets: 0,
  };

  constructor({ summary, allocationData, performanceData }) {
    this.summary = { ...DashboardViewModel.emptySummary, ...summary };
    this.allocationData = allocationData || [];
    this.performanceData = performanceData || [];
  }

  get isProfitPositive() {
    return this.summary.totalProfitLoss >= 0;
  }

  get profitLossAccent() {
    return this.isProfitPositive ? "success" : "danger";
  }

  get profitLossValueClass() {
    return this.isProfitPositive ? "text-[#42d7ff]" : "text-[#FB7185]";
  }

  get statCards() {
    return [
      {
        title: "Total Nilai Portofolio",
        value: formatCurrency(this.summary.totalPortfolio, DEFAULT_CURRENCY),
        description: "Akumulasi nilai seluruh aset aktif",
        accent: "primary",
      },
      {
        title: "Total Profit/Loss",
        value: formatCurrency(this.summary.totalProfitLoss, DEFAULT_CURRENCY),
        description: "Selisih keuntungan atau kerugian saat ini",
        accent: this.profitLossAccent,
        valueClassName: this.profitLossValueClass,
      },
      {
        title: "Jumlah Aset",
        value: this.summary.totalAssets,
        description: "Total aset aktif yang masih tersimpan",
        accent: "accent",
      },
      {
        title: "Target Keuangan",
        value: this.summary.totalTargets,
        description: "Jumlah target keuangan yang sedang dipantau",
        accent: "success",
      },
    ];
  }
}

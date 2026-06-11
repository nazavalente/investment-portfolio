export default class DashboardService {
  constructor({
    assetRepository,
    targetRepository,
    portfolioCalculator,
    responseMapper,
  }) {
    this.assetRepository = assetRepository;
    this.targetRepository = targetRepository;
    this.portfolioCalculator = portfolioCalculator;
    this.responseMapper = responseMapper;
  }

  async getSummary(userId) {
    const [assets, totalTargets] = await Promise.all([
      this.assetRepository.findAllWithTransactions(userId),
      this.targetRepository.countByUser(userId),
    ]);
    const summaries = assets.map((asset) =>
      this.portfolioCalculator.summarize(
        asset.transactions,
        asset.currentPrice
      )
    );

    return {
      totalPortfolio: summaries.reduce(
        (total, summary) => total + summary.currentValue,
        0
      ),
      totalProfitLoss: summaries.reduce(
        (total, summary) => total + summary.totalProfitLoss,
        0
      ),
      totalAssets: summaries.filter((summary) => summary.totalQuantity > 0)
        .length,
      totalTargets,
    };
  }

  async getAllocation(userId) {
    const assets = await this.assetRepository.findAllWithTransactions(userId);
    const grouped = new Map();

    for (const asset of assets) {
      const summary = this.portfolioCalculator.summarize(
        asset.transactions,
        asset.currentPrice
      );
      if (summary.currentValue <= 0 || summary.totalQuantity <= 0) continue;

      const key = asset.assetType || "Lainnya";
      grouped.set(key, (grouped.get(key) || 0) + summary.currentValue);
    }

    return Array.from(grouped, ([name, value]) => ({ name, value }));
  }

  async getPerformance(userId) {
    const assets = await this.assetRepository.findAllWithTransactions(userId);
    return assets
      .map((asset) => this.responseMapper.dashboardPerformance(asset))
      .filter(
        (item) => item.current_value > 0 && item.remaining_quantity > 0
      );
  }

  async getProfitLoss(userId) {
    const assets = await this.assetRepository.findAllWithTransactions(userId);
    let totalProfit = 0;
    let totalLoss = 0;

    for (const asset of assets) {
      const total = this.portfolioCalculator.summarize(
        asset.transactions,
        asset.currentPrice
      ).totalProfitLoss;

      if (total > 0) totalProfit += total;
      if (total < 0) totalLoss += Math.abs(total);
    }

    return {
      totalProfit,
      totalLoss,
      netProfitLoss: totalProfit - totalLoss,
    };
  }
}

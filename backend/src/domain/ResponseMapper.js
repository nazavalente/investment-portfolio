export default class ResponseMapper {
  constructor(portfolioCalculator) {
    this.portfolioCalculator = portfolioCalculator;
  }

  asset(asset) {
    const summary = this.portfolioCalculator.summarize(
      asset.transactions || [],
      asset.currentPrice
    );

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
  }

  transaction(transaction) {
    return {
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
    };
  }

  category(category) {
    return {
      id: category.id,
      category_name: category.categoryName,
      description: category.description,
      created_at: category.createdAt,
    };
  }

  target(target) {
    return {
      id: target.id,
      target_name: target.targetName,
      target_amount: target.targetAmount,
      current_progress: target.currentProgress,
      deadline: target.deadline,
      notes: target.notes,
      created_at: target.createdAt,
    };
  }

  watchlist(item) {
    return {
      id: item.id,
      asset_name: item.assetName,
      asset_code: item.assetCode,
      target_buy_price: item.targetBuyPrice,
      current_price: item.currentPrice,
      priority_level: item.priorityLevel,
      status: item.status,
      notes: item.notes,
      created_at: item.createdAt,
    };
  }

  dashboardPerformance(asset) {
    const summary = this.portfolioCalculator.summarize(
      asset.transactions || [],
      asset.currentPrice
    );

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
  }
}

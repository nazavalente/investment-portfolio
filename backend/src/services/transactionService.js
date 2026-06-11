import AppError from "../core/AppError.js";
import PortfolioCalculator, {
  TransactionType,
} from "../domain/PortfolioCalculator.js";

export default class TransactionService {
  constructor({
    transactionRepository,
    assetRepository,
    portfolioCalculator,
    responseMapper,
  }) {
    this.transactionRepository = transactionRepository;
    this.assetRepository = assetRepository;
    this.portfolioCalculator = portfolioCalculator;
    this.responseMapper = responseMapper;
  }

  async getAll(userId) {
    const transactions =
      await this.transactionRepository.findAllDetailed(userId);
    return transactions.map((item) => this.responseMapper.transaction(item));
  }

  async getById(userId, transactionId) {
    const id = this.parseId(transactionId);
    const transaction =
      await this.transactionRepository.findDetailedById(id, userId);

    if (!transaction) throw new AppError("Transaksi tidak ditemukan", 404);

    return this.responseMapper.transaction(transaction);
  }

  async create(userId, payload) {
    const asset = await this.findAsset(userId, payload);
    if (!asset) {
      throw new AppError("Aset tidak ditemukan atau tidak valid", 400);
    }

    const data = this.buildData(payload);
    this.validateSell(asset, data.transactionType, data.quantity);

    const transaction = await this.transactionRepository.createDetailed({
      ...data,
      userId,
      assetId: asset.id,
    });
    return this.responseMapper.transaction(transaction);
  }

  async update(userId, transactionId, payload) {
    const id = this.parseId(transactionId);
    const existing =
      await this.transactionRepository.findDetailedById(id, userId);

    if (!existing) throw new AppError("Transaksi tidak ditemukan", 404);

    const asset =
      (await this.findAsset(userId, payload)) ||
      (await this.assetRepository.findWithTransactionsById(
        existing.assetId,
        userId
      ));

    if (!asset) throw new AppError("Aset tidak ditemukan", 400);

    const data = this.buildData(payload, existing);
    this.validateSell(asset, data.transactionType, data.quantity, id);

    const transaction = await this.transactionRepository.updateDetailed(id, {
      ...data,
      assetId: asset.id,
    });
    return this.responseMapper.transaction(transaction);
  }

  async delete(userId, transactionId) {
    const id = this.parseId(transactionId);
    const existing = await this.transactionRepository.findByIdAndUser(
      id,
      userId
    );

    if (!existing) throw new AppError("Transaksi tidak ditemukan", 404);

    await this.transactionRepository.delete(id);
    return { id };
  }

  parseId(value) {
    const id = Number(value);
    if (Number.isNaN(id)) throw new AppError("ID transaksi tidak valid", 400);
    return id;
  }

  findAsset(userId, payload) {
    return this.assetRepository.findByIdentity(userId, {
      assetId: payload.asset_id ?? payload.assetId,
      assetName: payload.asset_name ?? payload.assetName,
      assetCode: payload.asset_code ?? payload.assetCode,
    });
  }

  buildData(payload, existing = {}) {
    const transactionType =
      payload.transaction_type !== undefined ||
      payload.transactionType !== undefined
        ? TransactionType.normalize(
            payload.transaction_type ?? payload.transactionType
          )
        : existing.transactionType;
    const quantity =
      payload.quantity !== undefined
        ? PortfolioCalculator.toNumber(payload.quantity)
        : existing.quantity;
    const pricePerUnit =
      payload.price_per_unit !== undefined ||
      payload.pricePerUnit !== undefined
        ? PortfolioCalculator.toNumber(
            payload.price_per_unit ?? payload.pricePerUnit
          )
        : existing.pricePerUnit;
    const transactionDate =
      payload.transaction_date !== undefined ||
      payload.transactionDate !== undefined
        ? new Date(payload.transaction_date ?? payload.transactionDate)
        : existing.transactionDate;

    if (
      !transactionType ||
      quantity <= 0 ||
      pricePerUnit <= 0 ||
      !(transactionDate instanceof Date) ||
      Number.isNaN(transactionDate.getTime())
    ) {
      throw new AppError("Data transaksi tidak valid", 400);
    }

    return {
      transactionType,
      quantity,
      pricePerUnit,
      fee:
        payload.fee !== undefined
          ? PortfolioCalculator.toNumber(payload.fee)
          : existing.fee ?? 0,
      transactionDate,
      notes:
        payload.notes !== undefined ? payload.notes : existing.notes ?? null,
    };
  }

  validateSell(asset, type, quantity, excludedId = null) {
    if (!TransactionType.isSell(type)) return;

    const transactions = excludedId
      ? asset.transactions.filter((item) => item.id !== excludedId)
      : asset.transactions;
    const available = this.portfolioCalculator.summarize(
      transactions,
      asset.currentPrice
    ).totalQuantity;

    if (quantity > available) {
      throw new AppError(
        `Jumlah jual melebihi aset yang dimiliki. Quantity tersedia: ${available}`,
        400
      );
    }
  }
}

import AppError from "../core/AppError.js";
import PortfolioCalculator from "../domain/PortfolioCalculator.js";

export default class WatchlistService {
  constructor({ watchlistRepository, responseMapper }) {
    this.repository = watchlistRepository;
    this.responseMapper = responseMapper;
  }

  async getAll(userId) {
    const items = await this.repository.findAllByUser(userId, {
      orderBy: { createdAt: "desc" },
    });
    return items.map((item) => this.responseMapper.watchlist(item));
  }

  async getById(userId, value) {
    return this.responseMapper.watchlist(await this.getEntity(userId, value));
  }

  async create(userId, payload) {
    const data = this.buildData(payload);
    if (!data.assetName || !data.assetCode || !data.targetBuyPrice) {
      throw new AppError(
        "Nama aset, kode aset, dan target harga beli wajib diisi",
        400
      );
    }

    const item = await this.repository.create({ ...data, userId });
    return this.responseMapper.watchlist(item);
  }

  async update(userId, value, payload) {
    const existing = await this.getEntity(userId, value);
    const item = await this.repository.update(
      existing.id,
      this.buildData(payload, existing)
    );
    return this.responseMapper.watchlist(item);
  }

  async delete(userId, value) {
    const existing = await this.getEntity(userId, value);
    await this.repository.delete(existing.id);
    return { id: existing.id };
  }

  buildData(payload, existing = {}) {
    return {
      assetName:
        payload.asset_name ?? payload.assetName ?? existing.assetName,
      assetCode:
        payload.asset_code ?? payload.assetCode ?? existing.assetCode,
      targetBuyPrice:
        payload.target_buy_price !== undefined ||
        payload.targetBuyPrice !== undefined
          ? PortfolioCalculator.toNumber(
              payload.target_buy_price ?? payload.targetBuyPrice
            )
          : existing.targetBuyPrice,
      currentPrice:
        payload.current_price !== undefined ||
        payload.currentPrice !== undefined
          ? PortfolioCalculator.toNumber(
              payload.current_price ?? payload.currentPrice
            )
          : existing.currentPrice ?? 0,
      priorityLevel:
        payload.priority_level ??
        payload.priorityLevel ??
        existing.priorityLevel ??
        null,
      status: payload.status ?? existing.status ?? "Aktif",
      notes:
        payload.notes !== undefined ? payload.notes : existing.notes ?? null,
    };
  }

  async getEntity(userId, value) {
    const id = Number(value);
    if (Number.isNaN(id)) {
      throw new AppError("ID watchlist tidak valid", 400);
    }

    const item = await this.repository.findByIdAndUser(id, userId);
    if (!item) throw new AppError("Watchlist tidak ditemukan", 404);
    return item;
  }
}

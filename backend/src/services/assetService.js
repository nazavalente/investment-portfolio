import AppError from "../core/AppError.js";
import PortfolioCalculator from "../domain/PortfolioCalculator.js";

export default class AssetService {
  constructor({ assetRepository, categoryRepository, responseMapper }) {
    this.assetRepository = assetRepository;
    this.categoryRepository = categoryRepository;
    this.responseMapper = responseMapper;
  }

  async getAll(userId) {
    const assets = await this.assetRepository.findAllDetailed(userId);
    return assets.map((asset) => this.responseMapper.asset(asset));
  }

  async getById(userId, assetId) {
    const id = this.parseId(assetId);
    const asset = await this.assetRepository.findDetailedById(id, userId);

    if (!asset) throw new AppError("Aset tidak ditemukan", 404);

    return this.responseMapper.asset(asset);
  }

  async create(userId, payload) {
    const data = await this.buildData(userId, payload);
    const asset = await this.assetRepository.createDetailed({ ...data, userId });
    return this.responseMapper.asset(asset);
  }

  async update(userId, assetId, payload) {
    const id = this.parseId(assetId);
    const existing = await this.assetRepository.findDetailedById(id, userId);

    if (!existing) throw new AppError("Aset tidak ditemukan", 404);

    const data = await this.buildData(userId, payload, existing);
    const asset = await this.assetRepository.updateDetailed(id, data);
    return this.responseMapper.asset(asset);
  }

  async delete(userId, assetId) {
    const id = this.parseId(assetId);
    const existing = await this.assetRepository.findByIdAndUser(id, userId);

    if (!existing) throw new AppError("Aset tidak ditemukan", 404);

    await this.assetRepository.delete(id);
    return { id };
  }

  parseId(value) {
    const id = Number(value);
    if (Number.isNaN(id)) throw new AppError("ID aset tidak valid", 400);
    return id;
  }

  async buildData(userId, payload, existing = {}) {
    const assetName =
      payload.asset_name ?? payload.assetName ?? existing.assetName;
    const assetCode =
      payload.asset_code ?? payload.assetCode ?? existing.assetCode;
    const assetType =
      payload.asset_type ?? payload.assetType ?? existing.assetType;
    const categoryValue = payload.category_id ?? payload.categoryId;
    const categoryId =
      categoryValue !== undefined
        ? categoryValue === "" || categoryValue === null
          ? null
          : Number(categoryValue)
        : existing.categoryId ?? null;

    if (!assetName || !assetCode || !assetType) {
      throw new AppError(
        "Nama aset, kode aset, dan tipe aset wajib diisi",
        400
      );
    }

    if (categoryId) {
      const category = await this.categoryRepository.findByIdAndUser(
        categoryId,
        userId
      );
      if (!category) throw new AppError("Kategori tidak valid", 400);
    }

    return {
      assetName,
      assetCode,
      assetType,
      platform:
        payload.platform !== undefined
          ? payload.platform
          : existing.platform ?? null,
      riskLevel:
        payload.risk_level ??
        payload.riskLevel ??
        existing.riskLevel ??
        null,
      currentPrice:
        payload.current_price !== undefined ||
        payload.currentPrice !== undefined
          ? PortfolioCalculator.toNumber(
              payload.current_price ?? payload.currentPrice
            )
          : existing.currentPrice ?? 0,
      description:
        payload.description !== undefined
          ? payload.description
          : existing.description ?? null,
      categoryId,
    };
  }
}

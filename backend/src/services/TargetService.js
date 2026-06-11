import AppError from "../core/AppError.js";
import PortfolioCalculator from "../domain/PortfolioCalculator.js";

export default class TargetService {
  constructor({ targetRepository, responseMapper }) {
    this.repository = targetRepository;
    this.responseMapper = responseMapper;
  }

  async getAll(userId) {
    const targets = await this.repository.findAllByUser(userId, {
      orderBy: { createdAt: "desc" },
    });
    return targets.map((item) => this.responseMapper.target(item));
  }

  async getById(userId, value) {
    return this.responseMapper.target(await this.getEntity(userId, value));
  }

  async create(userId, payload) {
    const data = this.buildData(payload);
    if (!data.targetName || !data.targetAmount) {
      throw new AppError(
        "Nama target dan nominal target wajib diisi",
        400
      );
    }

    const target = await this.repository.create({ ...data, userId });
    return this.responseMapper.target(target);
  }

  async update(userId, value, payload) {
    const existing = await this.getEntity(userId, value);
    const target = await this.repository.update(
      existing.id,
      this.buildData(payload, existing)
    );
    return this.responseMapper.target(target);
  }

  async delete(userId, value) {
    const existing = await this.getEntity(userId, value);
    await this.repository.delete(existing.id);
    return { id: existing.id };
  }

  buildData(payload, existing = {}) {
    return {
      targetName:
        payload.target_name ?? payload.targetName ?? existing.targetName,
      targetAmount:
        payload.target_amount !== undefined ||
        payload.targetAmount !== undefined
          ? PortfolioCalculator.toNumber(
              payload.target_amount ?? payload.targetAmount
            )
          : existing.targetAmount,
      currentProgress:
        payload.current_progress !== undefined ||
        payload.currentProgress !== undefined
          ? PortfolioCalculator.toNumber(
              payload.current_progress ?? payload.currentProgress
            )
          : existing.currentProgress ?? 0,
      deadline:
        payload.deadline !== undefined
          ? payload.deadline
            ? new Date(payload.deadline)
            : null
          : existing.deadline ?? null,
      notes:
        payload.notes !== undefined ? payload.notes : existing.notes ?? null,
    };
  }

  async getEntity(userId, value) {
    const id = Number(value);
    if (Number.isNaN(id)) throw new AppError("ID target tidak valid", 400);

    const target = await this.repository.findByIdAndUser(id, userId);
    if (!target) throw new AppError("Target tidak ditemukan", 404);
    return target;
  }
}

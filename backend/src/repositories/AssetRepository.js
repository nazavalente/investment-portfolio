import BaseRepository from "../core/BaseRepository.js";

export default class AssetRepository extends BaseRepository {
  constructor(prisma) {
    super(prisma.asset);
  }

  findAllDetailed(userId) {
    return this.findAllByUser(userId, {
      include: { category: true, transactions: true },
      orderBy: { createdAt: "desc" },
    });
  }

  findAllWithTransactions(userId) {
    return this.findAllByUser(userId, {
      include: { transactions: true },
    });
  }

  findDetailedById(id, userId) {
    return this.findByIdAndUser(id, userId, {
      include: { category: true, transactions: true },
    });
  }

  findWithTransactionsById(id, userId) {
    return this.findByIdAndUser(id, userId, {
      include: { transactions: true },
    });
  }

  findByIdentity(userId, { assetId, assetName, assetCode }) {
    if (assetId) {
      return this.findWithTransactionsById(Number(assetId), userId);
    }

    if (!assetName && !assetCode) return null;

    return this.model.findFirst({
      where: {
        userId,
        OR: [
          assetName ? { assetName } : undefined,
          assetCode ? { assetCode } : undefined,
        ].filter(Boolean),
      },
      include: { transactions: true },
    });
  }

  createDetailed(data) {
    return this.create(data, {
      include: { category: true, transactions: true },
    });
  }

  updateDetailed(id, data) {
    return this.update(id, data, {
      include: { category: true, transactions: true },
    });
  }
}

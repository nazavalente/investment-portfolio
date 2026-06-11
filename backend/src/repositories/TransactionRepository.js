import BaseRepository from "../core/BaseRepository.js";

export default class TransactionRepository extends BaseRepository {
  constructor(prisma) {
    super(prisma.transaction);
  }

  findAllDetailed(userId) {
    return this.findAllByUser(userId, {
      include: { asset: true },
      orderBy: { transactionDate: "desc" },
    });
  }

  findDetailedById(id, userId) {
    return this.findByIdAndUser(id, userId, {
      include: { asset: true },
    });
  }

  createDetailed(data) {
    return this.create(data, { include: { asset: true } });
  }

  updateDetailed(id, data) {
    return this.update(id, data, { include: { asset: true } });
  }
}

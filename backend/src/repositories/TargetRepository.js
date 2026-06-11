import BaseRepository from "../core/BaseRepository.js";

export default class TargetRepository extends BaseRepository {
  constructor(prisma) {
    super(prisma.financialTarget);
  }
}

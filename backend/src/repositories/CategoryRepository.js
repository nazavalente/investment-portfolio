import BaseRepository from "../core/BaseRepository.js";

export default class CategoryRepository extends BaseRepository {
  constructor(prisma) {
    super(prisma.category);
  }
}

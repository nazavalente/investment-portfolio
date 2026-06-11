import BaseRepository from "../core/BaseRepository.js";

export default class WatchlistRepository extends BaseRepository {
  constructor(prisma) {
    super(prisma.watchlist);
  }
}

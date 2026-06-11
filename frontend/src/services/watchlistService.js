import api from "./api";
import CrudService from "./CrudService";

class WatchlistService extends CrudService {
  constructor(httpClient) {
    super(httpClient, "/watchlist");
    this.bindMethods(
      "getAllWatchlistItems",
      "getWatchlistItemById",
      "createWatchlistItem",
      "updateWatchlistItem",
      "deleteWatchlistItem"
    );
  }

  getAllWatchlistItems() {
    return this.getAll();
  }

  getWatchlistItemById(id) {
    return this.getById(id);
  }

  createWatchlistItem(payload) {
    return this.create(payload);
  }

  updateWatchlistItem(id, payload) {
    return this.update(id, payload);
  }

  deleteWatchlistItem(id) {
    return this.remove(id);
  }
}

export const watchlistService = new WatchlistService(api);

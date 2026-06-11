import ResourceController from "./ResourceController.js";

export default class WatchlistController extends ResourceController {
  constructor(service) {
    super(service, {
      list: "Daftar watchlist berhasil diambil",
      detail: "Detail watchlist berhasil diambil",
      created: "Watchlist berhasil ditambahkan",
      updated: "Watchlist berhasil diperbarui",
      deleted: "Watchlist berhasil dihapus",
    });
  }
}

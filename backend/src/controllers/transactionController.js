import ResourceController from "./ResourceController.js";

export default class TransactionController extends ResourceController {
  constructor(service) {
    super(service, {
      list: "Daftar transaksi berhasil diambil",
      detail: "Detail transaksi berhasil diambil",
      created: "Transaksi berhasil ditambahkan",
      updated: "Transaksi berhasil diperbarui",
      deleted: "Transaksi berhasil dihapus",
    });
  }
}

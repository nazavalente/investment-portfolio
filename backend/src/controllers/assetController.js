import ResourceController from "./ResourceController.js";

export default class AssetController extends ResourceController {
  constructor(service) {
    super(service, {
      list: "Daftar aset berhasil diambil",
      detail: "Detail aset berhasil diambil",
      created: "Aset berhasil ditambahkan",
      updated: "Aset berhasil diperbarui",
      deleted: "Aset berhasil dihapus",
    });
  }
}

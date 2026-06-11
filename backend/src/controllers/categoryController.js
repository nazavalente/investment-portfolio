import ResourceController from "./ResourceController.js";

export default class CategoryController extends ResourceController {
  constructor(service) {
    super(service, {
      list: "Daftar kategori berhasil diambil",
      detail: "Detail kategori berhasil diambil",
      created: "Kategori berhasil ditambahkan",
      updated: "Kategori berhasil diperbarui",
      deleted: "Kategori berhasil dihapus",
    });
  }
}

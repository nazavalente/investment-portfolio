import ResourceController from "./ResourceController.js";

export default class TargetController extends ResourceController {
  constructor(service) {
    super(service, {
      list: "Daftar target berhasil diambil",
      detail: "Detail target berhasil diambil",
      created: "Target berhasil ditambahkan",
      updated: "Target berhasil diperbarui",
      deleted: "Target berhasil dihapus",
    });
  }
}

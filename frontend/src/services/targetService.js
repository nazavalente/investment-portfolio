import api from "./api";
import CrudService from "./CrudService";

class TargetService extends CrudService {
  constructor(httpClient) {
    super(httpClient, "/targets");
    this.bindMethods(
      "getAllTargets",
      "getTargetById",
      "createTarget",
      "updateTarget",
      "deleteTarget"
    );
  }

  getAllTargets() {
    return this.getAll();
  }

  getTargetById(id) {
    return this.getById(id);
  }

  createTarget(payload) {
    return this.create(payload);
  }

  updateTarget(id, payload) {
    return this.update(id, payload);
  }

  deleteTarget(id) {
    return this.remove(id);
  }
}

export const targetService = new TargetService(api);

import api from "./api";
import CrudService from "./CrudService";

class AssetService extends CrudService {
  constructor(httpClient) {
    super(httpClient, "/assets");
    this.bindMethods(
      "getAllAssets",
      "getAssetById",
      "createAsset",
      "updateAsset",
      "deleteAsset"
    );
  }

  getAllAssets() {
    return this.getAll();
  }

  getAssetById(id) {
    return this.getById(id);
  }

  createAsset(payload) {
    return this.create(payload);
  }

  updateAsset(id, payload) {
    return this.update(id, payload);
  }

  deleteAsset(id) {
    return this.remove(id);
  }
}

export const assetService = new AssetService(api);

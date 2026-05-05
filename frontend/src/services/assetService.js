import api from "./api";

export const assetService = {
  getAllAssets: async () => {
    const response = await api.get("/assets");
    return response.data.data;
  },

  getAssetById: async (id) => {
    const response = await api.get(`/assets/${id}`);
    return response.data.data;
  },

  createAsset: async (payload) => {
    const response = await api.post("/assets", payload);
    return response.data.data;
  },

  updateAsset: async (id, payload) => {
    const response = await api.put(`/assets/${id}`, payload);
    return response.data.data;
  },

  deleteAsset: async (id) => {
    const response = await api.delete(`/assets/${id}`);
    return response.data;
  },
};
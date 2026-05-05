import api from "./api";

export const targetService = {
  getAllTargets: async () => {
    const response = await api.get("/targets");
    return response.data.data;
  },

  getTargetById: async (id) => {
    const response = await api.get(`/targets/${id}`);
    return response.data.data;
  },

  createTarget: async (payload) => {
    const response = await api.post("/targets", payload);
    return response.data.data;
  },

  updateTarget: async (id, payload) => {
    const response = await api.put(`/targets/${id}`, payload);
    return response.data.data;
  },

  deleteTarget: async (id) => {
    const response = await api.delete(`/targets/${id}`);
    return response.data;
  },
};
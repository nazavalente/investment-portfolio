import api from "./api";

export const dashboardService = {
  getSummary: async () => {
    const response = await api.get("/dashboard/summary");
    return response.data.data;
  },

  getAllocation: async () => {
    const response = await api.get("/dashboard/allocation");
    return response.data.data;
  },

  getPerformance: async () => {
    const response = await api.get("/dashboard/performance");
    return response.data.data;
  },

  getProfitLossSummary: async () => {
    const response = await api.get("/dashboard/profit-loss");
    return response.data.data;
  },
};
import api from "./api";

export const watchlistService = {
  getAllWatchlistItems: async () => {
    const response = await api.get("/watchlist");
    return response.data.data;
  },

  getWatchlistItemById: async (id) => {
    const response = await api.get(`/watchlist/${id}`);
    return response.data.data;
  },

  createWatchlistItem: async (payload) => {
    const response = await api.post("/watchlist", payload);
    return response.data.data;
  },

  updateWatchlistItem: async (id, payload) => {
    const response = await api.put(`/watchlist/${id}`, payload);
    return response.data.data;
  },

  deleteWatchlistItem: async (id) => {
    const response = await api.delete(`/watchlist/${id}`);
    return response.data;
  },
};
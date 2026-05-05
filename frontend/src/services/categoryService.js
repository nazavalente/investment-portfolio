import api from "./api";

export const categoryService = {
  getAllCategories: async () => {
    const response = await api.get("/categories");
    return response.data.data;
  },

  getCategoryById: async (id) => {
    const response = await api.get(`/categories/${id}`);
    return response.data.data;
  },

  createCategory: async (payload) => {
    const response = await api.post("/categories", payload);
    return response.data.data;
  },

  updateCategory: async (id, payload) => {
    const response = await api.put(`/categories/${id}`, payload);
    return response.data.data;
  },

  deleteCategory: async (id) => {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  },
};
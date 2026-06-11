import api from "./api";
import CrudService from "./CrudService";

class CategoryService extends CrudService {
  constructor(httpClient) {
    super(httpClient, "/categories");
    this.bindMethods(
      "getAllCategories",
      "getCategoryById",
      "createCategory",
      "updateCategory",
      "deleteCategory"
    );
  }

  getAllCategories() {
    return this.getAll();
  }

  getCategoryById(id) {
    return this.getById(id);
  }

  createCategory(payload) {
    return this.create(payload);
  }

  updateCategory(id, payload) {
    return this.update(id, payload);
  }

  deleteCategory(id) {
    return this.remove(id);
  }
}

export const categoryService = new CategoryService(api);

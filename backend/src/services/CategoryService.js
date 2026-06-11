import AppError from "../core/AppError.js";

export default class CategoryService {
  constructor({ categoryRepository, responseMapper }) {
    this.repository = categoryRepository;
    this.responseMapper = responseMapper;
  }

  async getAll(userId) {
    const categories = await this.repository.findAllByUser(userId, {
      orderBy: { createdAt: "desc" },
    });
    return categories.map((item) => this.responseMapper.category(item));
  }

  async getById(userId, value) {
    const category = await this.getEntity(userId, value);
    return this.responseMapper.category(category);
  }

  async create(userId, payload) {
    const categoryName = payload.category_name ?? payload.categoryName;
    if (!categoryName) throw new AppError("Nama kategori wajib diisi", 400);

    const category = await this.repository.create({
      categoryName,
      description: payload.description ?? null,
      userId,
    });
    return this.responseMapper.category(category);
  }

  async update(userId, value, payload) {
    const existing = await this.getEntity(userId, value);
    const category = await this.repository.update(existing.id, {
      categoryName:
        payload.category_name ?? payload.categoryName ?? existing.categoryName,
      description:
        payload.description !== undefined
          ? payload.description
          : existing.description,
    });
    return this.responseMapper.category(category);
  }

  async delete(userId, value) {
    const existing = await this.getEntity(userId, value);
    await this.repository.delete(existing.id);
    return { id: existing.id };
  }

  async getEntity(userId, value) {
    const id = Number(value);
    if (Number.isNaN(id)) {
      throw new AppError("ID kategori tidak valid", 400);
    }

    const category = await this.repository.findByIdAndUser(id, userId);
    if (!category) throw new AppError("Kategori tidak ditemukan", 404);
    return category;
  }
}

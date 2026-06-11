export default class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  findAllByUser(userId, options = {}) {
    return this.model.findMany({
      ...options,
      where: { ...options.where, userId },
    });
  }

  findByIdAndUser(id, userId, options = {}) {
    return this.model.findFirst({
      ...options,
      where: { ...options.where, id, userId },
    });
  }

  create(data, options = {}) {
    return this.model.create({ ...options, data });
  }

  update(id, data, options = {}) {
    return this.model.update({
      ...options,
      where: { id },
      data,
    });
  }

  delete(id) {
    return this.model.delete({ where: { id } });
  }

  countByUser(userId) {
    return this.model.count({ where: { userId } });
  }
}

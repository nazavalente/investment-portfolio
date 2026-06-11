import BaseController from "../core/BaseController.js";

export default class ResourceController extends BaseController {
  constructor(service, messages) {
    super();
    this.service = service;
    this.messages = messages;

    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  getAll(req, res, next) {
    return this.execute(next, async () => {
      const data = await this.service.getAll(req.user.id);
      return this.success(res, data, this.messages.list);
    });
  }

  getById(req, res, next) {
    return this.execute(next, async () => {
      const data = await this.service.getById(req.user.id, req.params.id);
      return this.success(res, data, this.messages.detail);
    });
  }

  create(req, res, next) {
    return this.execute(next, async () => {
      const data = await this.service.create(req.user.id, req.body);
      return this.success(res, data, this.messages.created, 201);
    });
  }

  update(req, res, next) {
    return this.execute(next, async () => {
      const data = await this.service.update(
        req.user.id,
        req.params.id,
        req.body
      );
      return this.success(res, data, this.messages.updated);
    });
  }

  delete(req, res, next) {
    return this.execute(next, async () => {
      const data = await this.service.delete(req.user.id, req.params.id);
      return this.success(res, data, this.messages.deleted);
    });
  }
}

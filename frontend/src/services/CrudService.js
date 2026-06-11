import HttpService from "./HttpService";

export default class CrudService extends HttpService {
  constructor(httpClient, resourcePath) {
    super(httpClient);
    this.resourcePath = resourcePath;
  }

  async getAll() {
    return (await this.get(this.resourcePath)).data;
  }

  async getById(id) {
    return (await this.get(`${this.resourcePath}/${id}`)).data;
  }

  async create(payload) {
    return (await this.post(this.resourcePath, payload)).data;
  }

  async update(id, payload) {
    return (await this.put(`${this.resourcePath}/${id}`, payload)).data;
  }

  remove(id) {
    return this.delete(`${this.resourcePath}/${id}`);
  }
}

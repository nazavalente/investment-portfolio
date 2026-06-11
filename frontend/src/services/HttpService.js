export default class HttpService {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  bindMethods(...methodNames) {
    for (const methodName of methodNames) {
      this[methodName] = this[methodName].bind(this);
    }
  }

  async get(url, config) {
    const response = await this.httpClient.get(url, config);
    return response.data;
  }

  async post(url, payload, config) {
    const response = await this.httpClient.post(url, payload, config);
    return response.data;
  }

  async put(url, payload, config) {
    const response = await this.httpClient.put(url, payload, config);
    return response.data;
  }

  async delete(url, config) {
    const response = await this.httpClient.delete(url, config);
    return response.data;
  }
}

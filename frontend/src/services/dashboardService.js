import api from "./api";
import HttpService from "./HttpService";

class DashboardService extends HttpService {
  constructor(httpClient) {
    super(httpClient);
    this.bindMethods(
      "getSummary",
      "getAllocation",
      "getPerformance",
      "getProfitLossSummary"
    );
  }

  async getSummary() {
    return (await this.get("/dashboard/summary")).data;
  }

  async getAllocation() {
    return (await this.get("/dashboard/allocation")).data;
  }

  async getPerformance() {
    return (await this.get("/dashboard/performance")).data;
  }

  async getProfitLossSummary() {
    return (await this.get("/dashboard/profit-loss")).data;
  }
}

export const dashboardService = new DashboardService(api);

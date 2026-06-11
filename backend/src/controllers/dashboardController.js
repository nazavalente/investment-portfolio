import BaseController from "../core/BaseController.js";

export default class DashboardController extends BaseController {
  constructor(dashboardService) {
    super();
    this.dashboardService = dashboardService;

    this.getSummary = this.getSummary.bind(this);
    this.getAllocation = this.getAllocation.bind(this);
    this.getPerformance = this.getPerformance.bind(this);
    this.getProfitLoss = this.getProfitLoss.bind(this);
  }

  getSummary(req, res, next) {
    return this.execute(next, async () => {
      const data = await this.dashboardService.getSummary(req.user.id);
      return this.success(res, data, "Ringkasan dashboard berhasil diambil");
    });
  }

  getAllocation(req, res, next) {
    return this.execute(next, async () => {
      const data = await this.dashboardService.getAllocation(req.user.id);
      return this.success(
        res,
        data,
        "Data alokasi portofolio berhasil diambil"
      );
    });
  }

  getPerformance(req, res, next) {
    return this.execute(next, async () => {
      const data = await this.dashboardService.getPerformance(req.user.id);
      return this.success(
        res,
        data,
        "Data performa portofolio berhasil diambil"
      );
    });
  }

  getProfitLoss(req, res, next) {
    return this.execute(next, async () => {
      const data = await this.dashboardService.getProfitLoss(req.user.id);
      return this.success(res, data, "Ringkasan profit/loss berhasil diambil");
    });
  }
}

import {
  getDashboardSummaryData,
  getPortfolioAllocationData,
  getPortfolioPerformanceData,
  getProfitLossSummaryData,
} from "../services/dashboardService.js";
import { errorResponse, successResponse } from "../utils/responseFormatter.js";

export const getDashboardSummary = async (req, res) => {
  try {
    const summary = await getDashboardSummaryData(req.user.id);
    return successResponse(res, summary, "Ringkasan dashboard berhasil diambil");
  } catch (error) {
    return errorResponse(res, error.message, error.status || 500);
  }
};

export const getPortfolioAllocation = async (req, res) => {
  try {
    const allocation = await getPortfolioAllocationData(req.user.id);
    return successResponse(res, allocation, "Data alokasi portofolio berhasil diambil");
  } catch (error) {
    return errorResponse(res, error.message, error.status || 500);
  }
};

export const getPortfolioPerformance = async (req, res) => {
  try {
    const performance = await getPortfolioPerformanceData(req.user.id);
    return successResponse(res, performance, "Data performa portofolio berhasil diambil");
  } catch (error) {
    return errorResponse(res, error.message, error.status || 500);
  }
};

export const getProfitLossSummary = async (req, res) => {
  try {
    const summary = await getProfitLossSummaryData(req.user.id);
    return successResponse(res, summary, "Ringkasan profit/loss berhasil diambil");
  } catch (error) {
    return errorResponse(res, error.message, error.status || 500);
  }
};
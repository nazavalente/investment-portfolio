import { useEffect, useMemo, useState } from "react";
import { dashboardService } from "../services/dashboardService";
import { DashboardViewModel } from "../models/DashboardViewModel";

function useDashboardData() {
  const [summary, setSummary] = useState(DashboardViewModel.emptySummary);
  const [allocationData, setAllocationData] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        const [summaryResult, allocationResult, performanceResult] =
          await Promise.all([
            dashboardService.getSummary(),
            dashboardService.getAllocation(),
            dashboardService.getPerformance(),
          ]);

        if (!isMounted) {
          return;
        }

        setSummary(summaryResult);
        setAllocationData(allocationResult);
        setPerformanceData(performanceResult);
      } catch (err) {
        if (isMounted) {
          setError("Gagal memuat data dashboard");
        }
        console.error(err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchDashboardData();

    return () => {
      isMounted = false;
    };
  }, []);

  const viewModel = useMemo(
    () =>
      new DashboardViewModel({
        summary,
        allocationData,
        performanceData,
      }),
    [summary, allocationData, performanceData],
  );

  return { viewModel, loading, error };
}

export default useDashboardData;

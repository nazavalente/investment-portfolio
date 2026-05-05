import PageHeader from "../../components/common/PageHeader";
import StatCard from "../../components/common/StatCard";
import PerformanceLineChart from "../../components/charts/PerformanceLineChart";
import PortfolioPieChart from "../../components/charts/PortfolioPieChart";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import useDashboardData from "../../hooks/useDashboardData";

function Dashboard() {
  const { viewModel, loading, error } = useDashboardData();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen rounded-[24px] border border-[#1d2a44] bg-[#121a2d] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.22)] md:p-6">
      <PageHeader
        title="Dashboard"
        subtitle="Pantau ringkasan portofolio investasi Anda"
      />

      {error && (
        <div className="mb-5 rounded-xl border border-[#FB7185]/30 bg-[#2A1420] px-4 py-3 text-[#FDA4AF] shadow-sm">
          {error}
        </div>
      )}

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {viewModel.statCards.map((card) => (
          <StatCard key={card.title} {...card} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <PerformanceLineChart data={viewModel.performanceData} />
        <PortfolioPieChart data={viewModel.allocationData} />
      </div>
    </div>
  );
}

export default Dashboard;

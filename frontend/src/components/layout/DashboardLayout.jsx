import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#071023] text-[#E7EEF8]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(66,215,255,0.12),transparent_34%),linear-gradient(180deg,rgba(11,18,32,0),rgba(3,7,18,0.55))]" />
      <div className="relative md:grid md:min-h-screen md:grid-cols-[112px_1fr] xl:grid-cols-[260px_1fr]">
        <Sidebar />

        <div className="min-w-0">
          <Topbar />
          <main className="p-4 md:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;

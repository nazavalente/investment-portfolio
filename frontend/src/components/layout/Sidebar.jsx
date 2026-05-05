import { NavLink } from "react-router-dom";
import { navigationItems } from "../../config/navigation";

const iconPaths = {
  dashboard:
    "M4 13h6V4H4v9Zm10 7h6V4h-6v16ZM4 20h6v-5H4v5Z",
  assets:
    "M12 3 3 8l9 5 9-5-9-5Zm-7 8.5 7 4 7-4M5 15.5l7 4 7-4",
  transactions:
    "M7 7h11m0 0-3-3m3 3-3 3M17 17H6m0 0 3 3m-3-3 3-3",
  categories:
    "M5 5h6v6H5V5Zm8 0h6v6h-6V5ZM5 13h6v6H5v-6Zm8 0h6v6h-6v-6Z",
  targets:
    "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-4a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-3a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
  watchlist:
    "M12 5c5.5 0 9 6.5 9 6.5S17.5 18 12 18s-9-6.5-9-6.5S6.5 5 12 5Zm0 10a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z",
  profile:
    "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0",
};

function NavIcon({ icon }) {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={iconPaths[icon]}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Sidebar() {
  return (
    <aside className="hidden border-r border-[#1d2a44] bg-[#091225]/95 px-4 py-6 backdrop-blur md:block">
      <div className="mb-10 xl:px-2">
        <div className="hidden xl:block">
          <h1 className="text-2xl font-extrabold tracking-tight text-white">
            InvestTracker
          </h1>
          <p className="mt-1 text-xs leading-5 text-[#8794ad]">
            Financial Analysis Workspace
          </p>
        </div>
      </div>

      <div className="mb-4 hidden px-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#65728a] xl:block">
        Navigation
      </div>

      <nav className="space-y-2">
        {navigationItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              [
                "group flex items-center justify-center gap-3 rounded-2xl px-4 py-3 text-[15px] font-semibold transition-all duration-200 xl:justify-start",
                isActive
                  ? "bg-[#202b46] text-white shadow-[inset_3px_0_0_#42d7ff,0_14px_30px_rgba(0,0,0,0.22)]"
                  : "text-[#7f8ba3] hover:bg-[#121c31] hover:text-white",
              ].join(" ")
            }
            title={item.name}
          >
            <NavIcon icon={item.icon} />
            <span className="hidden truncate xl:inline">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;

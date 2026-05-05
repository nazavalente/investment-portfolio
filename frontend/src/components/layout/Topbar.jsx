import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { navigationItems } from "../../config/navigation";

function Topbar() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-20 border-b border-[#1d2a44] bg-[#071023]/90 px-4 py-4 backdrop-blur-md md:px-6">
      <div className="md:hidden">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-white">
              InvestTracker
            </h2>
            <p className="mt-1 text-xs text-[#8794ad]">
              Financial Analysis Workspace
            </p>
          </div>

          <button
            onClick={toggleMenu}
            className="inline-flex items-center justify-center rounded-xl border border-[#263450] bg-[#121c31] p-3 text-[#E7EEF8] transition hover:bg-[#1a2844]"
            aria-label="Buka menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="mt-4 rounded-2xl border border-[#263450] bg-[#121a2d] p-3 shadow-[0_20px_45px_rgba(0,0,0,0.32)]">
            <nav className="space-y-2">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    [
                      "block rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-[#202b46] text-white shadow-[inset_3px_0_0_#42d7ff]"
                        : "text-[#b7c0d1] hover:bg-[#0f172a] hover:text-white",
                    ].join(" ")
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>

            <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#263450] pt-4">
              <div className="rounded-xl border border-[#263450] bg-[#0d1628] px-4 py-2 text-sm font-medium text-[#c9d3e5]">
                {user?.name || "User"}
              </div>

              <button
                onClick={logout}
                className="rounded-xl bg-[#FB7185] px-4 py-2.5 text-sm font-semibold text-[#120b12] transition hover:bg-[#FDA4AF]"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="hidden md:flex md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Personal Investment Portfolio
          </h2>
          <p className="mt-1 text-sm text-[#8794ad]">
            Manage your assets, transactions, and financial goals
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-[#263450] bg-[#121c31] px-4 py-2 text-sm font-medium text-[#c9d3e5]">
            {user?.name || "User"}
          </div>

          <button
            onClick={logout}
            className="rounded-xl bg-[#FB7185] px-4 py-2.5 text-sm font-semibold text-[#120b12] transition hover:bg-[#FDA4AF]"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Topbar;

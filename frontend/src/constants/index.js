export const APP_NAME = "InvestTracker";

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  ASSETS: "/assets",
  TRANSACTIONS: "/transactions",
  CATEGORIES: "/categories",
  TARGETS: "/targets",
  WATCHLIST: "/watchlist",
  PROFILE: "/profile",
};

export const ASSET_TYPES = [
  "Saham",
  "Reksa Dana",
  "Obligasi",
  "Kripto",
  "Emas",
  "ETF",
];

export const RISK_LEVELS = [
  "Rendah",
  "Sedang",
  "Tinggi",
];

export const TRANSACTION_TYPES = [
  "Beli",
  "Jual",
];

export const WATCHLIST_STATUSES = [
  "Aktif",
  "Tercapai",
  "Diarsipkan",
];

export const PRIORITY_LEVELS = [
  "Rendah",
  "Sedang",
  "Tinggi",
];

export const DATE_FILTER_OPTIONS = [
  { label: "7 Hari", value: "7d" },
  { label: "30 Hari", value: "30d" },
  { label: "3 Bulan", value: "3m" },
  { label: "1 Tahun", value: "1y" },
  { label: "Semua", value: "all" },
];

export const DEFAULT_CURRENCY = "IDR";
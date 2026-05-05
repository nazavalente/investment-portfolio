import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import DashboardLayout from "../components/layout/DashboardLayout";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";

import AssetsPage from "../pages/assets/AssetsPage";
import AssetForm from "../pages/assets/AssetForm";

import TransactionsPage from "../pages/transactions/TransactionsPage";
import TransactionForm from "../pages/transactions/TransactionForm";

import CategoriesPage from "../pages/categories/CategoriesPage";
import CategoryForm from "../pages/categories/CategoryForm";

import TargetsPage from "../pages/targets/TargetsPage";
import TargetForm from "../pages/targets/TargetForm";

import WatchlistPage from "../pages/watchlist/WatchlistPage";
import WatchlistForm from "../pages/watchlist/WatchlistForm";

import ProfilePage from "../pages/profile/ProfilePage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/assets"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <AssetsPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/assets/create"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <AssetForm />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/assets/edit/:id"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <AssetForm />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/transactions"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <TransactionsPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/transactions/create"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <TransactionForm />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/transactions/edit/:id"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <TransactionForm />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/categories"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <CategoriesPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/categories/create"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <CategoryForm />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/categories/edit/:id"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <CategoryForm />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/targets"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <TargetsPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/targets/create"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <TargetForm />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/targets/edit/:id"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <TargetForm />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/watchlist"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <WatchlistPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/watchlist/create"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <WatchlistForm />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/watchlist/edit/:id"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <WatchlistForm />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <ProfilePage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default AppRoutes;
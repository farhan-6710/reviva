import { createBrowserRouter, Navigate } from "react-router";

import { ProtectedRoute } from "@/features/admin/auth/components/ProtectedRoute";
import { AnalyticsPage } from "@/features/admin/analytics/pages/AnalyticsPage";
import { AppointmentsManagementPage } from "@/features/admin/appointments-management/pages/AppointmentsManagementPage";
import { DashboardPage } from "@/features/admin/dashboard/pages/DashboardPage";
import { ProfilePage } from "@/features/admin/profile/pages/ProfilePage";
import { ReportsPage } from "@/features/admin/reports/pages/ReportsPage";
import { SettingsPage } from "@/features/admin/settings/pages/SettingsPage";
import { NotFoundPage } from "@/features/not-found/pages/NotFoundPage";
import { AboutPage } from "@/features/public/about/pages/AboutPage";
import { AuthPage } from "@/features/public/auth/pages/AuthPage";
import { HomePage } from "@/features/public/home/pages/HomePage";
import { AdminLayout } from "@/shared/layouts/admin/AdminLayout";
import { PublicLayout } from "@/shared/layouts/public/PublicLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
    ],
  },
  { path: "/auth", element: <AuthPage /> },
  {
    path: "/admin",
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: "dashboard", element: <DashboardPage /> },
          {
            path: "appointments-management",
            element: <AppointmentsManagementPage />,
          },
          { path: "analytics", element: <AnalyticsPage /> },
          { path: "reports", element: <ReportsPage /> },
          { path: "settings", element: <SettingsPage /> },
          { path: "profile", element: <ProfilePage /> },
          { path: "*", element: <NotFoundPage /> },
        ],
      },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);

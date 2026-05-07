import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ProtectedRoute } from '@/app/ProtectedRoute'
import { LoginPage } from '@/features/auth/LoginPage'
import { DashboardPage } from '@/features/reports/DashboardPage'
import { ReportDetailPage } from '@/features/reports/ReportDetailPage'
import { TimelinePage } from '@/features/reports/TimelinePage'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/reports/:id" element={<ReportDetailPage />} />
          <Route path="/reports/:id/timeline" element={<TimelinePage />} />
        </Route>

        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

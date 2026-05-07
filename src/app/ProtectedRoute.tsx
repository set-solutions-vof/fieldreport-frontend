import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/features/auth/useAuth'

export function ProtectedRoute() {
  const { state } = useAuth()
  if (state.status !== 'authenticated') {
    return <Navigate to="/login" replace />
  }
  return <Outlet />
}

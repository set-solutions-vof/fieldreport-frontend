import { useCallback, useState } from 'react'
import { LoginPage } from '@/features/auth/LoginPage'
import type { CurrentUser } from '@/types/auth'
import { AdminRouter } from './admin/AdminRouter'
import { InspectorRouter } from './inspector/InspectorRouter'

export function AppRouter() {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null)

  const handleAuthenticationExpired = useCallback((): void => {
    setCurrentUser(null)
  }, [])

  if (currentUser === null) {
    return <LoginPage onLoginSuccess={(user) => setCurrentUser(user)} />
  }

  if (currentUser.role === 'admin') {
    return <AdminRouter onAuthenticationExpired={handleAuthenticationExpired} />
  }

  return (
    <InspectorRouter onAuthenticationExpired={handleAuthenticationExpired} />
  )
}

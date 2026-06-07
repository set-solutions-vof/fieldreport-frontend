import { useCallback, useState } from 'react'
import { AcceptInvitePage } from '@/features/auth/AcceptInvitePage'
import { LoginPage } from '@/features/auth/LoginPage'
import type { CurrentUser } from '@/types/auth'
import { inviteTokenFromPath } from './routes'
import { AdminOnboardingGate } from './admin/AdminOnboardingGate'
import { InspectorRouter } from './inspector/InspectorRouter'

export function AppRouter() {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null)
  const inviteToken = inviteTokenFromPath(window.location.pathname)

  const handleAuthenticationExpired = useCallback((): void => {
    setCurrentUser(null)
  }, [])

  if (currentUser === null && inviteToken !== null) {
    return (
      <AcceptInvitePage
        token={inviteToken}
        onLoginSuccess={(user) => setCurrentUser(user)}
      />
    )
  }

  if (currentUser === null) {
    return <LoginPage onLoginSuccess={(user) => setCurrentUser(user)} />
  }

  if (currentUser.role === 'admin') {
    return (
      <AdminOnboardingGate
        currentUser={currentUser}
        onAuthenticationExpired={handleAuthenticationExpired}
      />
    )
  }

  return (
    <InspectorRouter onAuthenticationExpired={handleAuthenticationExpired} />
  )
}

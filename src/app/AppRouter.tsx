import { useCallback, useEffect, useState } from 'react'
import { Spinner } from '@/design-system'
import { AcceptInvitePage } from '@/features/auth/AcceptInvitePage'
import { ForgotPasswordPage } from '@/features/auth/ForgotPasswordPage'
import { LoginPage } from '@/features/auth/LoginPage'
import { ResetPasswordPage } from '@/features/auth/ResetPasswordPage'
import { refreshAccessToken } from '@/lib/api/auth'
import { getCurrentUser } from '@/lib/api/currentUser'
import {
  clearAuthTokens,
  getStoredRefreshToken,
  hasStoredRefreshToken,
  storeAccessToken,
} from '@/lib/auth/tokenStore'
import type { CurrentUser } from '@/types/auth'
import type { AuthView } from '@/types/authView'
import { inviteTokenFromPath } from './routes'
import { AdminOnboardingGate } from './admin/AdminOnboardingGate'
import { InspectorRouter } from './inspector/InspectorRouter'

export function AppRouter() {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null)
  const [view, setView] = useState<AuthView>('login')
  const [isRestoringSession, setIsRestoringSession] = useState(() =>
    hasStoredRefreshToken(),
  )
  const currentPath = useCurrentPath()
  const inviteToken = inviteTokenFromPath(currentPath)

  useEffect(() => {
    const refreshToken = getStoredRefreshToken()

    if (refreshToken === '') {
      return
    }

    async function restoreSession(): Promise<void> {
      try {
        const refreshedToken = await refreshAccessToken({
          refresh_token: refreshToken,
        })
        storeAccessToken(refreshedToken.access_token, refreshedToken.token_type)
        const user = await getCurrentUser()
        setCurrentUser(user)
      } catch {
        clearAuthTokens()
      } finally {
        setIsRestoringSession(false)
      }
    }

    void restoreSession()
  }, [])

  const handleAuthenticationExpired = useCallback((): void => {
    clearAuthTokens()
    setCurrentUser(null)
  }, [])

  const handleLogout = useCallback((): void => {
    clearAuthTokens()
    setCurrentUser(null)
    window.history.pushState(null, '', '/')
  }, [])

  const handleResetPasswordSuccess = useCallback((): void => {
    setView('login')
    window.history.pushState(null, '', '/')
  }, [])

  if (isRestoringSession) {
    return (
      <main className="fr-dashboard-loading-page">
        <div className="fr-dashboard-state">
          <Spinner size="lg" />
        </div>
      </main>
    )
  }

  if (currentUser === null && inviteToken !== null) {
    return (
      <AcceptInvitePage
        token={inviteToken}
        onLoginSuccess={(user) => setCurrentUser(user)}
      />
    )
  }

  if (currentUser === null && currentPath.startsWith('/reset-password/')) {
    return <ResetPasswordPage onSuccess={handleResetPasswordSuccess} />
  }

  if (currentUser === null) {
    if (view === 'forgot-password') {
      return <ForgotPasswordPage onBack={() => setView('login')} />
    }

    return (
      <LoginPage
        onLoginSuccess={(user) => setCurrentUser(user)}
        onForgotPassword={() => setView('forgot-password')}
      />
    )
  }

  if (currentUser.role === 'admin') {
    return (
      <AdminOnboardingGate
        currentUser={currentUser}
        onAuthenticationExpired={handleAuthenticationExpired}
        onLogout={handleLogout}
      />
    )
  }

  return (
    <InspectorRouter
      onAuthenticationExpired={handleAuthenticationExpired}
      onLogout={handleLogout}
    />
  )
}

function useCurrentPath(): string {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    function updateCurrentPath(): void {
      setCurrentPath(window.location.pathname)
    }

    const originalPushState = window.history.pushState
    const originalReplaceState = window.history.replaceState

    window.history.pushState = function pushState(
      ...parameters: Parameters<History['pushState']>
    ): void {
      originalPushState.apply(window.history, parameters)
      updateCurrentPath()
    }

    window.history.replaceState = function replaceState(
      ...parameters: Parameters<History['replaceState']>
    ): void {
      originalReplaceState.apply(window.history, parameters)
      updateCurrentPath()
    }

    window.addEventListener('popstate', updateCurrentPath)

    return () => {
      window.history.pushState = originalPushState
      window.history.replaceState = originalReplaceState
      window.removeEventListener('popstate', updateCurrentPath)
    }
  }, [])

  return currentPath
}

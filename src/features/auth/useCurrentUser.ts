import { useCallback, useEffect, useState } from 'react'
import { isAuthenticationExpiredError } from '@/lib/api/authenticatedFetch'
import { getCurrentUser } from '@/lib/api/currentUser'
import type { CurrentUser } from '@/types/auth'

type CurrentUserStatus = 'loading' | 'success' | 'error'

type UseCurrentUserParameters = {
  onAuthenticationExpired: () => void
}

type UseCurrentUserResult = {
  currentUser: CurrentUser | null
  isLoading: boolean
  isError: boolean
  errorMessage: string | null
  retry: () => void
}

export function useCurrentUser({
  onAuthenticationExpired,
}: UseCurrentUserParameters): UseCurrentUserResult {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null)
  const [status, setStatus] = useState<CurrentUserStatus>('loading')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const showCurrentUser = useCallback((fetchedCurrentUser: CurrentUser): void => {
    setCurrentUser(fetchedCurrentUser)
    setStatus('success')
  }, [])

  const showCurrentUserError = useCallback(
    (error: unknown): void => {
      if (isAuthenticationExpiredError(error)) {
        onAuthenticationExpired()
        return
      }

      setStatus('error')
      setErrorMessage('Gebruiker kon niet worden geladen.')
    },
    [onAuthenticationExpired],
  )

  const fetchCurrentUser = useCallback((): void => {
    void getCurrentUser().then(showCurrentUser).catch(showCurrentUserError)
  }, [showCurrentUser, showCurrentUserError])

  const loadCurrentUser = useCallback((): void => {
    setStatus('loading')
    setErrorMessage(null)
    fetchCurrentUser()
  }, [fetchCurrentUser])

  useEffect(() => {
    fetchCurrentUser()
  }, [fetchCurrentUser])

  return {
    currentUser,
    isLoading: status === 'loading',
    isError: status === 'error',
    errorMessage,
    retry: loadCurrentUser,
  }
}

import { useCallback, useEffect, useState } from 'react'
import { AuthenticationExpiredError } from '@/lib/api/authenticatedFetch'
import { getCurrentUser } from '@/lib/api/currentUser'
import { translations } from '@/lib/translations'
import type { CurrentUser } from '@/types/auth'
import type {
  CurrentUserStatus,
  UseCurrentUserParameters,
  UseCurrentUserResult,
} from '@/types/authView'

export function useCurrentUser({
  onAuthenticationExpired,
}: UseCurrentUserParameters): UseCurrentUserResult {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null)
  const [status, setStatus] = useState<CurrentUserStatus>('loading')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const showCurrentUser = useCallback(
    (fetchedCurrentUser: CurrentUser): void => {
      setCurrentUser(fetchedCurrentUser)
      setStatus('success')
    },
    [],
  )

  const showCurrentUserError = useCallback(
    (error: unknown): void => {
      if (error instanceof AuthenticationExpiredError) {
        onAuthenticationExpired()
        return
      }

      setStatus('error')
      setErrorMessage(translations.auth.errors.current_user_load_failed)
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

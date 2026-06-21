import { useCallback, useEffect, useState } from 'react'
import { listTeamUsers } from '@/lib/api/team'
import { AuthenticationExpiredError } from '@/lib/api/authenticatedFetch'
import { translations } from '@/lib/translations'
import type { TeamUser } from '@/typing/team'
import type { UseTeamUsersParameters } from '@/typing/teamView'

export function useTeamUsers({
  onAuthenticationExpired,
}: UseTeamUsersParameters) {
  const [users, setUsers] = useState<TeamUser[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const fetchUsers = useCallback((): void => {
    void listTeamUsers()
      .then((loadedUsers) => {
        setUsers(loadedUsers)
        setIsLoading(false)
      })
      .catch((error: unknown) => {
        if (error instanceof AuthenticationExpiredError) {
          onAuthenticationExpired()
          return
        }

        setErrorMessage(translations.team.errors.load_failed)
        setIsLoading(false)
      })
  }, [onAuthenticationExpired])

  const loadUsers = useCallback((): void => {
    setIsLoading(true)
    setErrorMessage(null)
    fetchUsers()
  }, [fetchUsers])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  return {
    users,
    isLoading,
    errorMessage,
    retry: loadUsers,
    refresh: loadUsers,
  }
}

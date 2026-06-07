import { useCallback, useEffect, useState } from 'react'
import { listTeamMembers } from '@/lib/api/team'
import { AuthenticationExpiredError } from '@/lib/api/authenticatedFetch'
import { translations } from '@/lib/translations'
import type { TeamMember } from '@/types/team'
import type { UseTeamMembersParameters } from '@/types/teamView'

export function useTeamMembers({
  onAuthenticationExpired,
}: UseTeamMembersParameters) {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const fetchMembers = useCallback((): void => {
    void listTeamMembers()
      .then((loadedMembers) => {
        setMembers(loadedMembers)
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

  const retry = useCallback((): void => {
    setIsLoading(true)
    setErrorMessage(null)
    fetchMembers()
  }, [fetchMembers])

  useEffect(() => {
    fetchMembers()
  }, [fetchMembers])

  return {
    members,
    isLoading,
    errorMessage,
    retry,
  }
}

import { useCallback, useEffect, useState } from 'react'
import { createInvite, deleteInvite, listInvites } from '@/lib/api/onboarding'
import { AuthenticationExpiredError } from '@/lib/api/authenticatedFetch'
import { translations } from '@/lib/translations'
import type { CreateInvitePayload, InviteResponse } from '@/typing/onboarding'
import type { UseInvitesParameters } from '@/typing/onboardingView'

export function useInvites({ onAuthenticationExpired }: UseInvitesParameters) {
  const [invites, setInvites] = useState<InviteResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const showInviteError = useCallback(
    (error: unknown, message: string): void => {
      if (error instanceof AuthenticationExpiredError) {
        onAuthenticationExpired()
        return
      }

      setErrorMessage(message)
    },
    [onAuthenticationExpired],
  )

  const fetchInvites = useCallback((): void => {
    void listInvites()
      .then((loadedInvites) => {
        setInvites(loadedInvites)
        setIsLoading(false)
      })
      .catch((error: unknown) => {
        showInviteError(error, translations.onboarding.invites.load_failed)
        setIsLoading(false)
      })
  }, [showInviteError])

  const loadInvites = useCallback((): void => {
    setIsLoading(true)
    setErrorMessage(null)
    fetchInvites()
  }, [fetchInvites])

  useEffect(() => {
    fetchInvites()
  }, [fetchInvites])

  async function sendInvite(payload: CreateInvitePayload): Promise<void> {
    setIsSending(true)
    setErrorMessage(null)

    try {
      await createInvite(payload)
      const loadedInvites = await listInvites()
      setInvites(loadedInvites)
    } catch (error) {
      showInviteError(error, translations.onboarding.invites.send_failed)
    } finally {
      setIsSending(false)
    }
  }

  async function removeInvite(inviteId: string): Promise<void> {
    setErrorMessage(null)

    try {
      await deleteInvite(inviteId)
      setInvites((currentInvites) =>
        currentInvites.filter((invite) => invite.id !== inviteId),
      )
    } catch (error) {
      showInviteError(error, translations.onboarding.invites.delete_failed)
    }
  }

  return {
    invites,
    isLoading,
    isSending,
    errorMessage,
    retry: loadInvites,
    sendInvite,
    removeInvite,
  }
}

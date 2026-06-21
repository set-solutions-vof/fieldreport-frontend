import type { ChangeEvent, FormEvent } from 'react'
import { useEffect, useState } from 'react'
import { acceptInvite, getInvitePreview } from '@/lib/api/invites'
import { getCurrentUser } from '@/lib/api/currentUser'
import { storeAuthTokens } from '@/lib/auth/tokenStore'
import { translations } from '@/lib/translations'
import type { InvitePreview } from '@/typing/auth'
import type { UseAcceptInviteFormParameters } from '@/typing/authView'

export function useAcceptInviteForm({
  token,
  onLoginSuccess,
}: UseAcceptInviteFormParameters) {
  const [invitePreview, setInvitePreview] = useState<InvitePreview | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  useEffect(() => {
    void getInvitePreview(token)
      .then((preview) => {
        setInvitePreview(preview)
        setName(`${preview.first_name} ${preview.last_name}`.trim())
        setIsLoading(false)
      })
      .catch(() => {
        setLoadError(translations.auth.invite.invalid_error)
        setIsLoading(false)
      })
  }, [token])

  function handleNameChange(event: ChangeEvent<HTMLInputElement>): void {
    setName(event.currentTarget.value)
  }

  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>): void {
    setPassword(event.currentTarget.value)
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const tokens = await acceptInvite(token, { name, password })
      storeAuthTokens(tokens)

      try {
        const user = await getCurrentUser()
        onLoginSuccess(user)
      } catch {
        setSubmitError(translations.auth.errors.current_user_load_failed)
      }
    } catch {
      setSubmitError(translations.auth.invite.accept_failed_error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    invitePreview,
    isLoading,
    loadError,
    name,
    password,
    isSubmitting,
    submitError,
    handleNameChange,
    handlePasswordChange,
    handleSubmit,
  }
}

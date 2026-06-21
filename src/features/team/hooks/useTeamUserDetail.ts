import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { deleteTeamUser, getTeamUser, updateTeamUser } from '@/lib/api/team'
import {
  ApiError,
  AuthenticationExpiredError,
} from '@/lib/api/authenticatedFetch'
import { translations } from '@/lib/translations'
import type { InviteRole } from '@/typing/onboarding'
import type { UseTeamUserDetailParameters } from '@/typing/teamView'

export function useTeamUserDetail({
  userId,
  onAuthenticationExpired,
  onDeleted,
}: UseTeamUserDetailParameters) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<InviteRole>('inspector')
  const [status, setStatus] = useState<'active' | 'invited'>('active')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [showSuccessToast, setShowSuccessToast] = useState(false)

  useEffect(() => {
    void getTeamUser(userId)
      .then((user) => {
        setFirstName(user.first_name)
        setLastName(user.last_name)
        setEmail(user.email)
        setRole(user.role)
        setStatus(user.status)
        setIsLoading(false)
      })
      .catch((error: unknown) => {
        if (error instanceof AuthenticationExpiredError) {
          onAuthenticationExpired()
          return
        }

        setErrorMessage(translations.team.user_detail.load_failed)
        setIsLoading(false)
      })
  }, [onAuthenticationExpired, userId])

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault()
    setErrorMessage(null)
    setShowSuccessToast(false)
    setIsSaving(true)

    const trimmedFirstName = firstName.trim()
    const trimmedLastName = lastName.trim()

    if (trimmedFirstName === '' || trimmedLastName === '') {
      setErrorMessage(translations.team.user_detail.name_required)
      setIsSaving(false)
      return
    }

    try {
      const updatedUser = await updateTeamUser(userId, {
        first_name: trimmedFirstName,
        last_name: trimmedLastName,
        role,
      })
      setFirstName(updatedUser.first_name)
      setLastName(updatedUser.last_name)
      setRole(updatedUser.role)
      setStatus(updatedUser.status)
      setShowSuccessToast(true)
    } catch (error) {
      if (error instanceof AuthenticationExpiredError) {
        onAuthenticationExpired()
        return
      }

      setErrorMessage(translations.team.user_detail.save_failed)
    } finally {
      setIsSaving(false)
    }
  }

  async function handleDelete(): Promise<void> {
    setErrorMessage(null)
    setIsDeleting(true)

    try {
      await deleteTeamUser(userId)
      onDeleted()
    } catch (error) {
      if (error instanceof AuthenticationExpiredError) {
        onAuthenticationExpired()
        return
      }

      if (error instanceof ApiError && error.status === 400) {
        setErrorMessage(translations.team.user_detail.cannot_delete_self)
        return
      }

      setErrorMessage(translations.team.user_detail.delete_failed)
    } finally {
      setIsDeleting(false)
    }
  }

  return {
    firstName,
    lastName,
    email,
    role,
    status,
    isLoading,
    isSaving,
    isDeleting,
    errorMessage,
    showSuccessToast,
    setFirstName,
    setLastName,
    setRole,
    handleSubmit,
    handleDelete,
  }
}

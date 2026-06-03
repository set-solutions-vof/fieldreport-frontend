import type { ChangeEvent, FormEvent } from 'react'
import { useState } from 'react'
import { login } from '@/lib/api/auth'
import { getCurrentUser } from '@/lib/api/currentUser'
import { translations } from '@/lib/translations'
import type { UseLoginFormParameters } from '@/types/authView'
import { storeAuthTokens } from '@/lib/auth/tokenStore'

export function useLoginForm({ onLoginSuccess }: UseLoginFormParameters) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>): void {
    setEmail(event.currentTarget.value)
  }

  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>): void {
    setPassword(event.currentTarget.value)
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault()
    setIsSubmitting(true)
    setLoginError(null)

    try {
      const tokens = await login({ email, password })
      storeAuthTokens(tokens)

      try {
        const user = await getCurrentUser()
        onLoginSuccess(user)
      } catch {
        setLoginError(translations.auth.errors.current_user_load_failed)
      }
    } catch {
      setLoginError(translations.auth.login.invalid_credentials_error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    email,
    password,
    isSubmitting,
    loginError,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  }
}

import type { ChangeEvent, FormEvent } from 'react'
import { useState } from 'react'
import { login } from '@/lib/api/auth'
import type { UseLoginFormParameters } from '@/types/authView'
import { storeAuthTokens } from './tokenStore'

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
      onLoginSuccess()
    } catch {
      setLoginError('Email or password is invalid.')
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

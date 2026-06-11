import type { ChangeEvent, FormEvent } from 'react'
import { useState } from 'react'
import { Button, Input, Logo } from '@/design-system'
import { confirmPasswordReset } from '@/lib/api/auth'
import { translations } from '@/lib/translations'
import type { ResetPasswordPageProps } from '@/types/authView'
import './ResetPasswordPage.css'

type PasswordResetError = {
  detail: string
}

export function ResetPasswordPage({ onSuccess }: ResetPasswordPageProps) {
  const token = window.location.pathname.split('/reset-password/')[1]
  const [newPassword, setNewPassword] = useState('')
  const [confirmedPassword, setConfirmedPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  function handleNewPasswordChange(
    event: ChangeEvent<HTMLInputElement>,
  ): void {
    setNewPassword(event.currentTarget.value)
  }

  function handleConfirmedPasswordChange(
    event: ChangeEvent<HTMLInputElement>,
  ): void {
    setConfirmedPassword(event.currentTarget.value)
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault()
    setMessage(null)
    setError(null)

    if (newPassword !== confirmedPassword) {
      setError(translations.auth.reset_password.passwords_mismatch)
      return
    }

    setIsSubmitting(true)

    try {
      await confirmPasswordReset(token, newPassword)
      setMessage(translations.auth.reset_password.success)
      window.setTimeout(onSuccess, 1200)
    } catch (passwordResetError) {
      const detail = (passwordResetError as PasswordResetError).detail

      if (detail === 'invalid_or_expired_token') {
        setError(translations.auth.reset_password.invalid_or_expired_token)
      }

      if (detail === 'password_too_short') {
        setError(translations.auth.reset_password.password_too_short)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="fr-login-page">
      <section
        className="fr-login-panel"
        aria-labelledby="reset-password-title"
      >
        <div className="fr-login-brand">
          <Logo variant="accent" />
        </div>
        <div className="fr-login-copy">
          <h1 className="fr-login-title" id="reset-password-title">
            {translations.auth.reset_password.title}
          </h1>
          <p className="fr-login-subtitle">
            {translations.auth.reset_password.subtitle}
          </p>
        </div>
        <form
          className="fr-login-form"
          onSubmit={(event) => void handleSubmit(event)}
        >
          <Input
            label={translations.auth.reset_password.new_password_label}
            type="password"
            autoComplete="new-password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            disabled={isSubmitting || message !== null}
            required
          />
          <Input
            label={translations.auth.reset_password.confirm_password_label}
            type="password"
            autoComplete="new-password"
            value={confirmedPassword}
            onChange={handleConfirmedPasswordChange}
            disabled={isSubmitting || message !== null}
            error={error}
            required
          />
          {message !== null && (
            <p className="fr-login-message" role="status">
              {message}
            </p>
          )}
          <Button
            type="submit"
            variant="primary"
            loading={isSubmitting}
            disabled={message !== null}
          >
            {translations.auth.reset_password.submit}
          </Button>
        </form>
      </section>
    </main>
  )
}

import type { ChangeEvent, FormEvent } from 'react'
import { useState } from 'react'
import { Button, Input, Logo } from '@set-solutions-vof/design-system'
import { PageHeader } from '@/components/PageHeader'
import { confirmPasswordReset } from '@/lib/api/auth'
import { translations } from '@/lib/translations'
import type { ResetPasswordPageProps } from '@/typing/authView'

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

  function handleNewPasswordChange(event: ChangeEvent<HTMLInputElement>): void {
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
    <main className="flex items-center justify-center min-h-[100dvh] box-border [padding:var(--fr-space-6)] [background:var(--fr-background)]">
      <section
        className="flex flex-col [width:min(100%,_calc(var(--fr-space-16)_+_var(--fr-space-15)))] [gap:var(--fr-space-5)] [padding:var(--fr-space-6)] [background:var(--fr-surface)] [border:var(--fr-border-width-sm)_solid_var(--fr-border)] [border-radius:var(--fr-radius-lg)] [box-shadow:var(--fr-shadow-sm)]"
        aria-labelledby="reset-password-title"
      >
        <div className="flex">
          <Logo variant="accent" />
        </div>
        <PageHeader
          title={translations.auth.reset_password.title}
          metadata={translations.auth.reset_password.subtitle}
          titleId="reset-password-title"
        />
        <form
          className="flex flex-col [gap:var(--fr-space-4)]"
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
            <p
              className="[margin:var(--fr-space-0)] [padding:var(--fr-space-3)] [border:var(--fr-border-width-sm)_solid_var(--fr-border)] [border-radius:var(--fr-radius-md)] [background:var(--fr-surface-sunken)] [color:var(--fr-text-secondary)] [font-size:var(--fr-text-sm)] [line-height:var(--fr-leading-normal)]"
              role="status"
            >
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

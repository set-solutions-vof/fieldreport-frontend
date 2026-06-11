import type { ChangeEvent, FormEvent } from 'react'
import { useState } from 'react'
import { Button, Input, Logo } from '@/design-system'
import { requestPasswordReset } from '@/lib/api/auth'
import { translations } from '@/lib/translations'
import type { ForgotPasswordPageProps } from '@/types/authView'
import './ForgotPasswordPage.css'

export function ForgotPasswordPage({ onBack }: ForgotPasswordPageProps) {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>): void {
    setEmail(event.currentTarget.value)
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      await requestPasswordReset(email)
    } finally {
      setIsSubmitted(true)
      setIsSubmitting(false)
    }
  }

  return (
    <main className="fr-login-page">
      <section
        className="fr-login-panel"
        aria-labelledby="forgot-password-title"
      >
        <div className="fr-login-brand">
          <Logo variant="accent" />
        </div>
        <div className="fr-login-copy">
          <h1 className="fr-login-title" id="forgot-password-title">
            {translations.auth.forgot_password.title}
          </h1>
          <p className="fr-login-subtitle">
            {translations.auth.forgot_password.subtitle}
          </p>
        </div>
        <form
          className="fr-login-form"
          onSubmit={(event) => void handleSubmit(event)}
        >
          <Input
            label={translations.auth.forgot_password.email_label}
            type="email"
            autoComplete="email"
            value={email}
            onChange={handleEmailChange}
            disabled={isSubmitting || isSubmitted}
            required
          />
          {isSubmitted && (
            <p className="fr-login-message" role="status">
              {translations.auth.forgot_password.success}
            </p>
          )}
          <Button
            type="submit"
            variant="primary"
            loading={isSubmitting}
            disabled={isSubmitted}
          >
            {translations.auth.forgot_password.submit}
          </Button>
          <button
            className="fr-login-text-link"
            type="button"
            onClick={onBack}
          >
            {translations.auth.forgot_password.back_to_login}
          </button>
        </form>
      </section>
    </main>
  )
}

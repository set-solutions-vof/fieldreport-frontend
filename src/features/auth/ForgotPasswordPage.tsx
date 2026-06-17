import type { ChangeEvent, FormEvent } from 'react'
import { useState } from 'react'
import { Button, Input, Logo } from '@set-solutions-vof/design-system'
import { PageHeader } from '@/components/PageHeader'
import { requestPasswordReset } from '@/lib/api/auth'
import { translations } from '@/lib/translations'
import type { ForgotPasswordPageProps } from '@/typing/authView'

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
    <main className="flex items-center justify-center min-h-[100dvh] box-border [padding:var(--fr-space-6)] [background:var(--fr-background)]">
      <section
        className="flex flex-col [width:min(100%,_calc(var(--fr-space-16)_+_var(--fr-space-15)))] [gap:var(--fr-space-5)] [padding:var(--fr-space-6)] [background:var(--fr-surface)] [border:var(--fr-border-width-sm)_solid_var(--fr-border)] [border-radius:var(--fr-radius-lg)] [box-shadow:var(--fr-shadow-sm)]"
        aria-labelledby="forgot-password-title"
      >
        <div className="flex">
          <Logo variant="accent" />
        </div>
        <PageHeader
          title={translations.auth.forgot_password.title}
          metadata={translations.auth.forgot_password.subtitle}
          titleId="forgot-password-title"
        />
        <form
          className="flex flex-col [gap:var(--fr-space-4)]"
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
            <p
              className="[margin:var(--fr-space-0)] [padding:var(--fr-space-3)] [border:var(--fr-border-width-sm)_solid_var(--fr-border)] [border-radius:var(--fr-radius-md)] [background:var(--fr-surface-sunken)] [color:var(--fr-text-secondary)] [font-size:var(--fr-text-sm)] [line-height:var(--fr-leading-normal)]"
              role="status"
            >
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
            className="[border:var(--fr-border-width-sm)_solid_transparent] [padding:var(--fr-space-0)] bg-transparent [color:var(--fr-accent)] [font:inherit] [font-size:var(--fr-text-sm)] [line-height:var(--fr-leading-normal)] cursor-pointer hover:[color:var(--fr-accent-hover)] focus-visible:[outline:var(--fr-border-width-sm)_solid_var(--fr-focus-ring)] focus-visible:[outline-offset:var(--fr-space-1)]"
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

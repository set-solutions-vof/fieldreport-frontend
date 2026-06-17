import { Button, Input, Logo } from '@set-solutions-vof/design-system'
import { translations } from '@/lib/translations'
import type { LoginPageProps } from '@/types/authView'
import { useLoginForm } from './useLoginForm'

export function LoginPage({
  onLoginSuccess,
  onForgotPassword,
}: LoginPageProps) {
  const {
    email,
    password,
    isSubmitting,
    loginError,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  } = useLoginForm({ onLoginSuccess })

  return (
    <main className="flex items-center justify-center min-h-[100dvh] box-border [padding:var(--fr-space-6)] [background:var(--fr-background)]">
      <section className="flex flex-col [width:min(100%,_calc(var(--fr-space-16)_+_var(--fr-space-15)))] [gap:var(--fr-space-5)] [padding:var(--fr-space-6)] [background:var(--fr-surface)] [border:var(--fr-border-width-sm)_solid_var(--fr-border)] [border-radius:var(--fr-radius-lg)] [box-shadow:var(--fr-shadow-sm)]" aria-labelledby="login-title">
        <div className="flex">
          <Logo variant="accent" />
        </div>
        <div className="flex flex-col [gap:var(--fr-space-2)]">
          <h1 className="[margin:var(--fr-space-0)] [font-size:var(--fr-text-xl)] [font-weight:var(--fr-weight-semibold)] [line-height:var(--fr-leading-snug)] [color:var(--fr-text-primary)]" id="login-title">
            {translations.auth.login.title}
          </h1>
          <p className="[margin:var(--fr-space-0)] [font-size:var(--fr-text-base)] [line-height:var(--fr-leading-normal)] [color:var(--fr-text-secondary)]">
            {translations.auth.login.subtitle}
          </p>
        </div>
        <form className="flex flex-col [gap:var(--fr-space-4)]" onSubmit={handleSubmit}>
          <Input
            label={translations.auth.login.email_label}
            type="email"
            autoComplete="email"
            value={email}
            onChange={handleEmailChange}
            disabled={isSubmitting}
            required
          />
          <Input
            label={translations.auth.login.password_label}
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
            disabled={isSubmitting}
            error={loginError}
            required
          />
          <button
            className="[border:var(--fr-border-width-sm)_solid_transparent] [padding:var(--fr-space-0)] bg-transparent [color:var(--fr-accent)] [font:inherit] [font-size:var(--fr-text-sm)] [line-height:var(--fr-leading-normal)] cursor-pointer hover:[color:var(--fr-accent-hover)] focus-visible:[outline:var(--fr-border-width-sm)_solid_var(--fr-focus-ring)] focus-visible:[outline-offset:var(--fr-space-1)] self-end [margin-top:calc(var(--fr-space-3)_*_-1)]"
            type="button"
            onClick={onForgotPassword}
          >
            {translations.auth.login.forgot_password_link}
          </button>
          <Button type="submit" variant="primary" loading={isSubmitting}>
            {translations.auth.login.submit_button}
          </Button>
        </form>
      </section>
    </main>
  )
}

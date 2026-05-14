import { Button, Input, Logo } from '@/design-system'
import { translations } from '@/lib/translations'
import type { LoginPageProps } from '@/types/authView'
import { useLoginForm } from './useLoginForm'
import './LoginPage.css'

export function LoginPage({ onLoginSuccess }: LoginPageProps) {
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
    <main className="fr-login-page">
      <section className="fr-login-panel" aria-labelledby="login-title">
        <div className="fr-login-brand">
          <Logo variant="accent" />
        </div>
        <div className="fr-login-copy">
          <h1 className="fr-login-title" id="login-title">
            {translations.auth.login.title}
          </h1>
          <p className="fr-login-subtitle">
            {translations.auth.login.subtitle}
          </p>
        </div>
        <form className="fr-login-form" onSubmit={handleSubmit}>
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
          <Button type="submit" variant="primary" loading={isSubmitting}>
            {translations.auth.login.submit_button}
          </Button>
        </form>
      </section>
    </main>
  )
}

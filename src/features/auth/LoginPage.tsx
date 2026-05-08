import { Button, Input, Logo } from '@/design-system'
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
            Inspector access
          </h1>
          <p className="fr-login-subtitle">Sign in to review assigned field reports.</p>
        </div>
        <form className="fr-login-form" onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={handleEmailChange}
            disabled={isSubmitting}
            required
          />
          <Input
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
            disabled={isSubmitting}
            error={loginError}
            required
          />
          <Button type="submit" variant="primary" loading={isSubmitting}>
            Sign in
          </Button>
        </form>
      </section>
    </main>
  )
}

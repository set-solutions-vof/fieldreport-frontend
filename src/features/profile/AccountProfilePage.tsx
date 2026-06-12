import { useState } from 'react'
import type { FormEvent } from 'react'
import { AppShell } from '@/app/AppShell'
import { Button, Divider, Input, Spinner } from '@/design-system'
import { useCurrentUser } from '@/features/auth/useCurrentUser'
import { getUserInitials } from '@/features/reports/lib/getUserInitials'
import {
  ApiError,
  AuthenticationExpiredError,
} from '@/lib/api/authenticatedFetch'
import { changePassword, updateProfile } from '@/lib/api/user'
import { translations } from '@/lib/translations'
import type { CurrentUser } from '@/types/auth'
import './AccountProfilePage.css'

type AccountProfilePageProps = {
  onAuthenticationExpired: () => void
  onCancel: () => void
  onOpenDashboard?: () => void
  onOpenReports?: () => void
  onOpenTemplate?: () => void
  onOpenTeam?: () => void
  onOpenProfile: () => void
  onLogout: () => void
}

export function AccountProfilePage({
  onAuthenticationExpired,
  ...pageProps
}: AccountProfilePageProps) {
  const { currentUser, isLoading, isError, errorMessage, retry } =
    useCurrentUser({
      onAuthenticationExpired,
    })

  if (isLoading || currentUser === null) {
    return (
      <main className="fr-dashboard-loading-page">
        <div className="fr-dashboard-state">
          <Spinner size="lg" />
        </div>
      </main>
    )
  }

  if (isError) {
    return (
      <main className="fr-dashboard-loading-page">
        <div className="fr-dashboard-state">
          <h1>{translations.dashboard.states.reports_load_failed_title}</h1>
          <p>{errorMessage}</p>
          <Button type="button" variant="primary" onClick={retry}>
            {translations.dashboard.states.retry_button}
          </Button>
        </div>
      </main>
    )
  }

  return (
    <AccountProfileContent
      key={currentUser.id}
      currentUser={currentUser}
      onAuthenticationExpired={onAuthenticationExpired}
      {...pageProps}
    />
  )
}

function AccountProfileContent({
  currentUser,
  onAuthenticationExpired,
  onCancel,
  onOpenDashboard,
  onOpenReports,
  onOpenTemplate,
  onOpenTeam,
  onOpenProfile,
  onLogout,
}: AccountProfilePageProps & { currentUser: CurrentUser }) {
  const [profileUser, setProfileUser] = useState(currentUser)
  const [name, setName] = useState(currentUser.name)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmedNewPassword, setConfirmedNewPassword] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [currentPasswordError, setCurrentPasswordError] = useState<
    string | null
  >(null)
  const [newPasswordError, setNewPasswordError] = useState<string | null>(null)
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null)
  const [formError, setFormError] = useState<string | null>(null)
  const [showSuccessToast, setShowSuccessToast] = useState(false)

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault()
    setCurrentPasswordError(null)
    setNewPasswordError(null)
    setConfirmPasswordError(null)
    setFormError(null)
    setShowSuccessToast(false)
    setIsSaving(true)

    const trimmedName = name.trim()

    if (!trimmedName) {
      setFormError('Naam is verplicht')
      setIsSaving(false)
      return
    }

    const wantsPasswordChange =
      newPassword !== '' || confirmedNewPassword !== ''

    const passwordValidationError = wantsPasswordChange
      ? validatePasswordChange(
          currentPassword,
          newPassword,
          confirmedNewPassword,
        )
      : null

    if (passwordValidationError !== null) {
      if (passwordValidationError.field === 'current') {
        setCurrentPasswordError(passwordValidationError.message)
      }
      if (passwordValidationError.field === 'new') {
        setNewPasswordError(passwordValidationError.message)
      }
      if (passwordValidationError.field === 'confirm') {
        setConfirmPasswordError(passwordValidationError.message)
      }
      setIsSaving(false)
      return
    }

    const shouldChangePassword = wantsPasswordChange

    try {
      const updatedUser = await updateProfile({ name: trimmedName })
      setProfileUser(updatedUser)

      if (shouldChangePassword) {
        await changePassword({
          current_password: currentPassword,
          new_password: newPassword,
        })
        setCurrentPassword('')
        setNewPassword('')
        setConfirmedNewPassword('')
      }

      setShowSuccessToast(true)
    } catch (error) {
      if (error instanceof AuthenticationExpiredError) {
        onAuthenticationExpired()
        return
      }

      if (error instanceof ApiError && error.status === 422) {
        if (error.message === 'current_password_incorrect') {
          setCurrentPasswordError('Huidig wachtwoord is onjuist')
          return
        }

        if (error.message === 'password_too_short') {
          setNewPasswordError('Nieuw wachtwoord moet minimaal 8 tekens zijn')
          return
        }
      }

      setFormError('Profiel kon niet worden opgeslagen')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <AppShell
      currentUser={profileUser}
      activeNavigationItem="profile"
      breadcrumbItems={[{ label: translations.dashboard.navigation.profile }]}
      onOpenDashboard={onOpenDashboard}
      onOpenReports={onOpenReports}
      onOpenTemplate={onOpenTemplate}
      onOpenTeam={onOpenTeam}
      onOpenProfile={onOpenProfile}
      onLogout={onLogout}
    >
      <main className="fr-account-profile-page">
        {showSuccessToast && (
          <div className="fr-account-profile-toast" role="status">
            Profiel opgeslagen
          </div>
        )}
        <header className="fr-account-profile-page__header">
          <h1>Account profiel</h1>
        </header>
        <form
          className="fr-account-profile-form"
          noValidate
          onSubmit={(event) => void handleSubmit(event)}
        >
          <section className="fr-account-profile-form__identity">
            <span className="fr-account-profile-avatar">
              {getUserInitials(profileUser.name)}
            </span>
            <div className="fr-account-profile-form__grid">
              <Input
                fieldClassName="fr-account-profile-form__full-width"
                label="Naam"
                value={name}
                onChange={(event) => setName(event.currentTarget.value)}
              />
              <Input
                className="fr-account-profile-form__readonly-input"
                fieldClassName="fr-account-profile-form__full-width"
                label="E-mailadres"
                value={profileUser.email}
                readOnly
              />
            </div>
          </section>

          <Divider spacing="lg" />

          <section className="fr-account-profile-form__section">
            <h2>Wachtwoord wijzigen</h2>
            <div className="fr-account-profile-form__grid">
              <Input
                label="Huidig wachtwoord"
                type="password"
                autoComplete="current-password"
                value={currentPassword}
                error={currentPasswordError}
                onChange={(event) =>
                  setCurrentPassword(event.currentTarget.value)
                }
              />
              <Input
                label="Nieuw wachtwoord"
                type="password"
                autoComplete="new-password"
                value={newPassword}
                error={newPasswordError}
                onChange={(event) => setNewPassword(event.currentTarget.value)}
              />
              <Input
                label="Bevestig nieuw wachtwoord"
                type="password"
                autoComplete="new-password"
                value={confirmedNewPassword}
                error={confirmPasswordError}
                onChange={(event) =>
                  setConfirmedNewPassword(event.currentTarget.value)
                }
              />
            </div>
          </section>

          {formError !== null && (
            <p className="fr-account-profile-form__error" role="alert">
              {formError}
            </p>
          )}

          <footer className="fr-account-profile-form__actions">
            <Button
              type="button"
              variant="ghost"
              disabled={isSaving}
              onClick={onCancel}
            >
              Annuleren
            </Button>
            <Button type="submit" variant="primary" loading={isSaving}>
              Opslaan
            </Button>
          </footer>
        </form>
      </main>
    </AppShell>
  )
}

type PasswordField = 'current' | 'new' | 'confirm'

type PasswordValidationError = {
  field: PasswordField
  message: string
}

function validatePasswordChange(
  currentPassword: string,
  newPassword: string,
  confirmedNewPassword: string,
): PasswordValidationError | null {
  if (currentPassword === '') {
    return {
      field: 'current',
      message: 'Huidig wachtwoord is verplicht',
    }
  }

  if (newPassword === '') {
    return {
      field: 'new',
      message: 'Nieuw wachtwoord is verplicht',
    }
  }

  if (confirmedNewPassword === '') {
    return {
      field: 'confirm',
      message: 'Bevestig je nieuwe wachtwoord',
    }
  }

  if (newPassword.length < 8) {
    return {
      field: 'new',
      message: 'Nieuw wachtwoord moet minimaal 8 tekens zijn',
    }
  }

  if (newPassword !== confirmedNewPassword) {
    return {
      field: 'confirm',
      message: 'Wachtwoorden komen niet overeen',
    }
  }

  return null
}

import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { useAppChrome } from '@/app/useAppChrome'
import { PageSummaryHeader } from '@/components/PageSummaryHeader'
import { Button, Input } from '@set-solutions-vof/design-system'
import { getUserInitials } from '@/features/reports/lib/getUserInitials'
import {
  ApiError,
  AuthenticationExpiredError,
} from '@/lib/api/authenticatedFetch'
import { changePassword, updateProfile } from '@/lib/api/user'
import { useLocale } from '@/lib/useLocale'
import { translations, type Locale } from '@/lib/translations'
import { currentUserDisplayName, type CurrentUser } from '@/typing/auth'

type AccountProfilePageProps = {
  currentUser: CurrentUser
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
  currentUser,
  onAuthenticationExpired,
  onCancel,
}: AccountProfilePageProps) {
  const { locale, setLocale } = useLocale()
  const [profileUser, setProfileUser] = useState(currentUser)
  const [firstName, setFirstName] = useState(currentUser.first_name)
  const [lastName, setLastName] = useState(currentUser.last_name)
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

  useAppChrome({ currentUser: profileUser })

  function handleLocaleChange(event: ChangeEvent<HTMLSelectElement>): void {
    setLocale(event.currentTarget.value as Locale)
  }

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

    const trimmedFirstName = firstName.trim()
    const trimmedLastName = lastName.trim()

    if (trimmedFirstName === '' || trimmedLastName === '') {
      setFormError(translations.profile.errors.name_required)
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
      const updatedUser = await updateProfile({
        first_name: trimmedFirstName,
        last_name: trimmedLastName,
      })
      setProfileUser(updatedUser)
      setFirstName(updatedUser.first_name)
      setLastName(updatedUser.last_name)

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
          setCurrentPasswordError(
            translations.profile.errors.current_password_incorrect,
          )
          return
        }

        if (error.message === 'password_too_short') {
          setNewPasswordError(translations.profile.errors.password_too_short)
          return
        }
      }

      setFormError(translations.profile.errors.save_failed)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <main className="flex-1 overflow-y-auto [padding:var(--fr-space-5)] [background:var(--fr-background)]">
      {showSuccessToast && (
        <div
          className="fixed [top:var(--fr-space-5)] [right:var(--fr-space-5)] [z-index:2] [padding:var(--fr-space-3)_var(--fr-space-4)] [color:var(--fr-status-approved-fg)] [background:var(--fr-status-approved-bg)] [border:var(--fr-border-width-sm)_solid_var(--fr-status-approved-border)] [border-radius:var(--fr-radius-lg)] [font-size:var(--fr-text-sm)] [font-weight:var(--fr-weight-medium)]"
          role="status"
        >
          {translations.profile.success_toast}
        </div>
      )}

      <PageSummaryHeader title={translations.profile.title} />

      <form
        className="mt-[var(--fr-space-4)] flex flex-col [gap:var(--fr-space-4)] [padding:var(--fr-space-5)] [background:var(--fr-surface)] [border:var(--fr-border-width-sm)_solid_var(--fr-border)] [border-radius:var(--fr-radius-lg)] [box-shadow:var(--fr-shadow-md)]"
        noValidate
        onSubmit={(event) => void handleSubmit(event)}
      >
        <section className="grid [grid-template-columns:var(--fr-space-10)_minmax(var(--fr-space-0),_1fr)] [gap:var(--fr-space-4)] items-start">
          <span className="inline-flex [width:var(--fr-space-10)] [height:var(--fr-space-10)] items-center justify-center [border-radius:var(--fr-radius-full)] [color:var(--fr-text-on-accent)] [background:var(--fr-accent)] [font-size:var(--fr-text-xl)] [font-weight:var(--fr-weight-semibold)]">
            {getUserInitials(currentUserDisplayName(profileUser))}
          </span>
          <div className="grid [grid-template-columns:repeat(2,_minmax(var(--fr-space-0),_1fr))] [gap:var(--fr-space-4)]">
            <Input
              label={translations.profile.first_name_label}
              value={firstName}
              onChange={(event) => setFirstName(event.currentTarget.value)}
            />
            <Input
              label={translations.profile.last_name_label}
              value={lastName}
              onChange={(event) => setLastName(event.currentTarget.value)}
            />
            <Input
              className="[color:var(--fr-text-disabled)] cursor-not-allowed [background:var(--fr-surface-sunken)]"
              fieldClassName="[grid-column:1_/_-1]"
              label={translations.profile.email_label}
              helperText={translations.profile.email_helper}
              value={profileUser.email}
              readOnly
              disabled
            />
          </div>
        </section>

        <section className="flex flex-col [gap:var(--fr-space-3)] [padding-top:var(--fr-space-4)] [border-top:var(--fr-border-width-sm)_solid_var(--fr-border)] [&_h2]:[margin:var(--fr-space-0)] [&_h2]:[font-size:var(--fr-text-lg)] [&_h2]:[font-weight:var(--fr-weight-bold)] [&_h2]:[letter-spacing:var(--fr-tracking-section)] [&_h2]:[line-height:var(--fr-leading-snug)] [&_h2]:[color:var(--fr-text-primary)]">
          <h2>{translations.profile.language_section_title}</h2>
          <label className="flex flex-col [gap:var(--fr-space-2)] [max-width:calc(var(--fr-space-16)_+_var(--fr-space-10))] [font-size:var(--fr-text-sm)] [font-weight:var(--fr-weight-medium)] [color:var(--fr-text-primary)]">
            <span>{translations.profile.language_label}</span>
            <select
              className="[height:var(--fr-control-height-md)] [padding:var(--fr-space-0)_var(--fr-space-3)] [font:inherit] [color:var(--fr-text-primary)] [background:var(--fr-surface)] [border:var(--fr-border-width-sm)_solid_var(--fr-border-strong)] [border-radius:var(--fr-radius-md)] focus:[border-color:var(--fr-border-focus)] focus:outline-none focus:[box-shadow:var(--fr-shadow-focus)]"
              value={locale}
              onChange={handleLocaleChange}
            >
              <option value="nl">
                {translations.profile.language_options.nl}
              </option>
              <option value="en">
                {translations.profile.language_options.en}
              </option>
            </select>
          </label>
        </section>

        <section className="flex flex-col [gap:var(--fr-space-3)] [padding-top:var(--fr-space-4)] [border-top:var(--fr-border-width-sm)_solid_var(--fr-border)] [&_h2]:[margin:var(--fr-space-0)] [&_h2]:[font-size:var(--fr-text-lg)] [&_h2]:[font-weight:var(--fr-weight-bold)] [&_h2]:[letter-spacing:var(--fr-tracking-section)] [&_h2]:[line-height:var(--fr-leading-snug)] [&_h2]:[color:var(--fr-text-primary)]">
          <h2>{translations.profile.password_section_title}</h2>
          <div className="grid [grid-template-columns:repeat(2,_minmax(var(--fr-space-0),_1fr))] [gap:var(--fr-space-4)]">
            <Input
              label={translations.profile.current_password_label}
              type="password"
              autoComplete="current-password"
              value={currentPassword}
              error={currentPasswordError}
              onChange={(event) =>
                setCurrentPassword(event.currentTarget.value)
              }
            />
            <Input
              label={translations.profile.new_password_label}
              type="password"
              autoComplete="new-password"
              value={newPassword}
              error={newPasswordError}
              onChange={(event) => setNewPassword(event.currentTarget.value)}
            />
            <Input
              label={translations.profile.confirm_password_label}
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
          <p
            className="[margin:var(--fr-space-0)] [font-size:var(--fr-text-sm)] [color:var(--fr-destructive)]"
            role="alert"
          >
            {formError}
          </p>
        )}

        <div className="flex items-center justify-end [gap:var(--fr-space-3)] [padding-top:var(--fr-space-3)] [border-top:var(--fr-border-width-sm)_solid_var(--fr-border)]">
          <Button
            type="button"
            variant="ghost"
            disabled={isSaving}
            onClick={onCancel}
          >
            {translations.profile.cancel_button}
          </Button>
          <Button type="submit" variant="primary" loading={isSaving}>
            {translations.profile.save_button}
          </Button>
        </div>
      </form>
    </main>
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
      message: translations.profile.errors.current_password_required,
    }
  }

  if (newPassword === '') {
    return {
      field: 'new',
      message: translations.profile.errors.new_password_required,
    }
  }

  if (confirmedNewPassword === '') {
    return {
      field: 'confirm',
      message: translations.profile.errors.confirm_password_required,
    }
  }

  if (newPassword.length < 8) {
    return {
      field: 'new',
      message: translations.profile.errors.password_too_short,
    }
  }

  if (newPassword !== confirmedNewPassword) {
    return {
      field: 'confirm',
      message: translations.profile.errors.passwords_mismatch,
    }
  }

  return null
}

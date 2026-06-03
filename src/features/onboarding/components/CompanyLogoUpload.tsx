import { useRef } from 'react'
import type { ChangeEvent, DragEvent } from 'react'
import { Spinner } from '@/design-system'
import { translations } from '@/lib/translations'
import type { CompanyLogoUploadProps } from '@/types/onboardingView'
import { OnboardingIcon } from './icons/OnboardingIcon'
import './CompanyLogoUpload.css'

export function CompanyLogoUpload({
  logoUrl,
  isUploading,
  errorMessage,
  onUpload,
}: CompanyLogoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  function openFilePicker(): void {
    inputRef.current?.click()
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    const files = Array.from(event.currentTarget.files ?? [])
    if (files.length > 0) {
      void onUpload(files[0])
    }
    event.currentTarget.value = ''
  }

  function handleDrop(event: DragEvent<HTMLButtonElement>): void {
    event.preventDefault()
    void onUpload(Array.from(event.dataTransfer.files)[0])
  }

  function handleDragOver(event: DragEvent<HTMLButtonElement>): void {
    event.preventDefault()
  }

  return (
    <div className="fr-onboarding-logo-upload">
      <strong>{translations.onboarding.company_profile.logo_label}</strong>
      <input
        ref={inputRef}
        className="fr-onboarding-file-input"
        type="file"
        accept="image/png,image/jpeg,image/svg+xml"
        onChange={handleChange}
      />
      <button
        type="button"
        className="fr-onboarding-logo-upload__zone"
        onClick={openFilePicker}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {isUploading ? (
          <Spinner size="md" />
        ) : logoUrl !== null ? (
          <img
            src={logoUrl}
            alt={translations.onboarding.company_profile.logo_alt}
          />
        ) : (
          <span className="fr-onboarding-logo-upload__content">
            <span
              className="fr-onboarding-logo-upload__icon"
              aria-hidden="true"
            >
              <OnboardingIcon name="photo" className="fr-onboarding-icon" />
            </span>
            <span>
              <strong>
                {translations.onboarding.company_profile.logo_drop_label}{' '}
                <span>
                  {translations.onboarding.company_profile.logo_browse_label}
                </span>
              </strong>
              <small>
                {translations.onboarding.company_profile.logo_helper}
              </small>
            </span>
          </span>
        )}
      </button>
      {errorMessage !== null && (
        <p className="fr-onboarding-action-error">{errorMessage}</p>
      )}
    </div>
  )
}

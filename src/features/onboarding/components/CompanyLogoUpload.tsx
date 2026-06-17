import { useRef } from 'react'
import type { ChangeEvent, DragEvent } from 'react'
import { Spinner } from '@set-solutions-vof/design-system'
import { translations } from '@/lib/translations'
import type { CompanyLogoUploadProps } from '@/typing/onboardingView'
import { OnboardingIcon } from './icons/OnboardingIcon'

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
    <div className="flex flex-col items-start [gap:var(--fr-space-2)] [&>strong]:[font-size:var(--fr-text-sm)] [&>strong]:[font-weight:var(--fr-weight-semibold)] [&>strong]:[line-height:var(--fr-leading-snug)] [&>strong]:[color:var(--fr-text-primary)]">
      <strong>{translations.onboarding.company_profile.logo_label}</strong>
      <input
        ref={inputRef}
        className="absolute [width:var(--fr-space-0)] [height:var(--fr-space-0)] overflow-hidden [opacity:0] pointer-events-none"
        type="file"
        accept="image/png,image/jpeg,image/svg+xml"
        onChange={handleChange}
      />
      <button
        type="button"
        className="flex items-center justify-start w-full [min-height:var(--fr-space-10)] [padding:var(--fr-space-4)] [font:inherit] [color:var(--fr-text-secondary)] cursor-pointer bg-transparent [border:var(--fr-border-width-sm)_dashed_var(--fr-border-strong)] [border-radius:var(--fr-radius-paper)] hover:[border-color:var(--fr-border-focus)] hover:outline-none focus-visible:[border-color:var(--fr-border-focus)] focus-visible:outline-none focus-visible:[box-shadow:var(--fr-shadow-focus)]"
        onClick={openFilePicker}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {isUploading ? (
          <Spinner size="md" />
        ) : logoUrl !== null ? (
          <img
            className="block [width:var(--fr-space-12)] [height:var(--fr-space-9)] [object-fit:contain] [object-position:center]"
            src={logoUrl}
            alt={translations.onboarding.company_profile.logo_alt}
          />
        ) : (
          <span className="flex items-center [gap:var(--fr-space-5)] text-left [&_strong]:[font-size:var(--fr-text-sm)] [&_strong]:[line-height:var(--fr-leading-snug)] [&_strong]:[color:var(--fr-text-primary)] [&_small]:[font-size:var(--fr-text-sm)] [&_small]:[line-height:var(--fr-leading-snug)] [&_small]:[color:var(--fr-text-secondary)]">
            <span
              className="inline-flex items-center justify-center [width:var(--fr-space-7)] [height:var(--fr-space-7)] shrink-0 [border-radius:var(--fr-radius-paper)] [color:var(--fr-text-tertiary)] [background:var(--fr-surface)] [border:var(--fr-border-width-sm)_solid_var(--fr-border)]"
              aria-hidden="true"
            >
              <OnboardingIcon name="photo" className="block [width:var(--fr-space-4)] [height:var(--fr-space-4)] shrink-0 [width:var(--fr-space-5)] [height:var(--fr-space-5)]" />
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
        <p className="[margin:var(--fr-space-0)] [font-size:var(--fr-text-sm)] [color:var(--fr-destructive)]">{errorMessage}</p>
      )}
    </div>
  )
}

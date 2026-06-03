import { Input } from '@/design-system'
import { translations } from '@/lib/translations'
import type { Step1CompanyProfileProps } from '@/types/onboardingView'
import { ColorPicker } from '../components/ColorPicker'
import { CompanyLogoUpload } from '../components/CompanyLogoUpload'
import { OnboardingIcon } from '../components/icons/OnboardingIcon'
import { ReportPreviewMini } from '../components/ReportPreviewMini'

export function Step1CompanyProfile({
  currentUser,
  logoUrl,
  primaryColor,
  logoUploadError,
  colorSaveError,
  isUploadingLogo,
  onLogoUpload,
  onPrimaryColorChange,
}: Step1CompanyProfileProps) {
  return (
    <section className="fr-onboarding-step fr-onboarding-step--profile">
      <div className="fr-onboarding-profile-grid">
        <div className="fr-onboarding-form-panel">
          <div className="fr-onboarding-step__eyebrow">
            <span className="fr-onboarding-step__icon" aria-hidden="true">
              <OnboardingIcon
                name="buildingProfile"
                className="fr-onboarding-icon"
              />
            </span>
            <span className="fr-onboarding-step__badge">
              {translations.onboarding.company_profile.optional_badge}
            </span>
          </div>
          <div className="fr-onboarding-step__header">
            <h1>{translations.onboarding.company_profile.title}</h1>
            <span>{translations.onboarding.company_profile.description}</span>
          </div>
          <div className="fr-onboarding-locked-field">
            <Input
              label={translations.onboarding.company_profile.company_name_label}
              value={currentUser.company_name}
              readOnly
              fieldClassName="fr-onboarding-locked-field__input"
              helperText={
                translations.onboarding.company_profile.company_name_helper
              }
            />
            <OnboardingIcon
              name="lock"
              className="fr-onboarding-locked-field__icon fr-onboarding-icon"
            />
          </div>
          <CompanyLogoUpload
            logoUrl={logoUrl}
            isUploading={isUploadingLogo}
            errorMessage={logoUploadError}
            onUpload={onLogoUpload}
          />
          <ColorPicker
            value={primaryColor}
            errorMessage={colorSaveError}
            onChange={onPrimaryColorChange}
          />
        </div>
        <ReportPreviewMini
          companyName={currentUser.company_name}
          logoUrl={logoUrl}
        />
      </div>
    </section>
  )
}

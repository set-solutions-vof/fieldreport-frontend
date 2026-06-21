import { Input } from '@set-solutions-vof/design-system'
import { pageTitleClassName } from '@/components/pageTitleClassName'
import { translations } from '@/lib/translations'
import type { Step1CompanyProfileProps } from '@/typing/onboardingView'
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
    <section className="flex [min-height:100%] [width:min(100%,_calc(var(--fr-space-16)_*_5))] box-border flex-col [gap:var(--fr-space-6)] [padding:var(--fr-space-8)_var(--fr-space-7)]">
      <div className="grid [grid-template-columns:minmax(var(--fr-space-15),_calc(var(--fr-space-16)_*_3))_minmax(var(--fr-space-15),_calc(var(--fr-space-16)_*_2))] justify-between [gap:var(--fr-space-8)] [align-items:start]">
        <div className="flex flex-col [gap:var(--fr-space-5)]">
          <div className="flex items-center [gap:var(--fr-space-3)]">
            <span
              className="inline-flex items-center justify-center [width:var(--fr-space-8)] [height:var(--fr-space-8)] [border-radius:var(--fr-radius-lg)] [color:var(--fr-accent)] [background:var(--fr-accent-subtle)]"
              aria-hidden="true"
            >
              <OnboardingIcon
                name="buildingProfile"
                className="block [width:var(--fr-space-4)] [height:var(--fr-space-4)] shrink-0 [width:var(--fr-space-5)] [height:var(--fr-space-5)]"
              />
            </span>
            <span className="inline-flex items-center [min-height:var(--fr-control-height-sm)] [padding:var(--fr-space-0)_var(--fr-space-3)] [border-radius:var(--fr-radius-full)] [font-size:var(--fr-text-sm)] [font-weight:var(--fr-weight-semibold)] [color:var(--fr-text-secondary)] [background:var(--fr-surface-sunken)]">
              {translations.onboarding.company_profile.optional_badge}
            </span>
          </div>
          <div className="flex flex-col [gap:var(--fr-space-3)] [max-width:calc(var(--fr-space-16)_*_2_+_var(--fr-space-8))]">
            <h1 className={pageTitleClassName}>
              {translations.onboarding.company_profile.title}
            </h1>
            <span className="[font-size:var(--fr-text-base)] [line-height:var(--fr-leading-relaxed)] [color:var(--fr-text-secondary)]">
              {translations.onboarding.company_profile.description}
            </span>
          </div>
          <div className="relative">
            <Input
              label={translations.onboarding.company_profile.company_name_label}
              value={currentUser.company_name}
              readOnly
              helperText={
                translations.onboarding.company_profile.company_name_helper
              }
              style={{
                paddingRight:
                  'calc(var(--fr-space-3) + var(--fr-space-4) + var(--fr-space-2))',
              }}
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute [right:var(--fr-space-3)] [width:var(--fr-space-4)] [height:var(--fr-space-4)] [color:var(--fr-text-tertiary)]"
              style={{
                top: 'calc(var(--fr-text-sm) * var(--fr-leading-snug) + var(--fr-space-2) + var(--fr-control-height-md) / 2)',
                transform: 'translateY(-50%)',
              }}
            >
              <OnboardingIcon
                name="lock"
                className="block [width:var(--fr-space-4)] [height:var(--fr-space-4)] shrink-0"
              />
            </span>
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

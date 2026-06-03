import { Card } from '@/design-system'
import './ReportPreviewMini.css'
import { translations } from '@/lib/translations'
import type { ReportPreviewMiniProps } from '@/types/onboardingView'

export function ReportPreviewMini({
  companyName,
  logoUrl,
}: ReportPreviewMiniProps) {
  const initials = companyName
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="fr-onboarding-preview-shell">
      <strong>{translations.onboarding.preview.label}</strong>
      <Card className="fr-onboarding-preview" padding="lg">
        <div className="fr-onboarding-preview__topline" />
        <div className="fr-onboarding-preview__header">
          <span className="fr-onboarding-preview__mark">
            {logoUrl !== null ? <img src={logoUrl} alt="" /> : initials}
          </span>
          <div>
            <span>{translations.onboarding.preview.dossier}</span>
            <strong>XX-0000-0000</strong>
          </div>
        </div>
        <div className="fr-onboarding-preview__title">
          <span>
            {companyName} · {translations.onboarding.preview.inspection}
          </span>
          <h2>{translations.onboarding.preview.report_title}</h2>
        </div>
        <div className="fr-onboarding-preview__section">
          <strong>
            <span>01</span>
            {translations.onboarding.preview.project_details}
          </strong>
          <div className="fr-onboarding-preview__content">
            <span />
            <span />
            <span />
          </div>
        </div>
      </Card>
      <p>{translations.onboarding.preview.helper}</p>
    </div>
  )
}

import { Card } from '@set-solutions-vof/design-system'
import { translations } from '@/lib/translations'
import type { ReportPreviewMiniProps } from '@/typing/onboardingView'

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
    <div className="flex flex-col [gap:var(--fr-space-4)] [padding-top:var(--fr-space-11)] [&>strong]:[font-size:var(--fr-text-sm)] [&>strong]:[font-weight:var(--fr-weight-bold)] [&>strong]:[letter-spacing:var(--fr-space-0)] [&>strong]:[line-height:var(--fr-leading-snug)] [&>strong]:[color:var(--fr-text-tertiary)] [&>strong]:uppercase [&>p]:[margin:var(--fr-space-0)] [&>p]:text-center [&>p]:[font-size:var(--fr-text-base)] [&>p]:[color:var(--fr-text-secondary)]">
      <strong>{translations.onboarding.preview.label}</strong>
      <Card
        className="relative w-full overflow-hidden [justify-self:stretch] [border-radius:var(--fr-radius-paper)] [box-shadow:var(--fr-shadow-paper)]"
        padding="lg"
      >
        <div className="absolute [top:var(--fr-space-0)] [right:var(--fr-space-0)] [left:var(--fr-space-0)] [height:var(--fr-space-1)] [background:var(--fr-onboarding-company-color,_var(--fr-accent))]" />
        <div className="flex items-start justify-between [gap:var(--fr-space-5)] [&_div]:flex [&_div]:flex-col [&_div]:items-end [&_div]:[gap:var(--fr-space-1)]">
          <span
            className={[
              'inline-flex items-center justify-center [width:var(--fr-space-9)] [height:var(--fr-space-9)] shrink-0 overflow-hidden [border-radius:var(--fr-radius-lg)] [font-size:var(--fr-text-lg)] [font-weight:var(--fr-weight-bold)]',
              logoUrl === null &&
                '[color:var(--fr-text-on-accent)] [background:var(--fr-onboarding-company-color,_var(--fr-accent))]',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {logoUrl !== null ? (
              <img
                className="[width:calc(100%_-_var(--fr-space-4))] [height:calc(100%_-_var(--fr-space-4))] [object-fit:contain] [object-position:center]"
                src={logoUrl}
                alt=""
              />
            ) : (
              initials
            )}
          </span>
          <div>
            <span>{translations.onboarding.preview.dossier}</span>
            <strong>XX-0000-0000</strong>
          </div>
        </div>
        <div className="flex flex-col [&_span]:[font-size:var(--fr-text-xs)] [&_span]:[font-weight:var(--fr-weight-semibold)] [&_span]:[color:var(--fr-text-tertiary)] [&_span]:uppercase [gap:var(--fr-space-2)] [margin-top:var(--fr-space-6)] [&_h2]:[margin:var(--fr-space-0)] [&_h2]:[font-size:var(--fr-text-2xl)] [&_h2]:[line-height:var(--fr-leading-tight)] [&_h2]:[color:var(--fr-text-primary)]">
          <span>
            {companyName} · {translations.onboarding.preview.inspection}
          </span>
          <h2>{translations.onboarding.preview.report_title}</h2>
        </div>
        <div className="flex flex-col [gap:var(--fr-space-3)] [margin-top:var(--fr-space-5)] [&_strong]:flex [&_strong]:items-center [&_strong]:[gap:var(--fr-space-3)] [&_strong]:[font-size:var(--fr-text-lg)] [&_strong]:[color:var(--fr-text-primary)]">
          <strong>
            <span>01</span>
            {translations.onboarding.preview.project_details}
          </strong>
          <div className="flex flex-col [gap:var(--fr-space-2)] [margin-top:var(--fr-space-3)] [&_span]:[height:var(--fr-space-2)] [&_span]:[border-radius:var(--fr-radius-full)] [&_span]:[background:var(--fr-surface-sunken)]">
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

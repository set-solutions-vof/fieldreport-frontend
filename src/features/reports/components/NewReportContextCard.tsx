import { Card, CardHeader, CardTitle, Textarea } from '@/design-system'
import { translations } from '@/lib/translations'
import type { NewReportContextCardProps } from '@/types/newReportView'

export function NewReportContextCard({
  extraContext,
  isSubmitting,
  onExtraContextChange,
}: NewReportContextCardProps) {
  return (
    <Card padding="lg" className="fr-new-report-card">
      <CardHeader>
        <CardTitle className="fr-new-report-section-title">
          <span
            className="fr-new-report-section-bar fr-new-report-section-bar--optional"
            aria-hidden="true"
          />
          {translations.new_report.sections.context}
          <span className="fr-new-report-section-optional-label">
            — optioneel
          </span>
        </CardTitle>
      </CardHeader>
      <div className="fr-new-report-ai-callout" role="note">
        {translations.new_report.fields.context_help}
      </div>
      <Textarea
        label={translations.new_report.fields.context_label}
        placeholder={translations.new_report.fields.context_placeholder}
        value={extraContext}
        disabled={isSubmitting}
        rows={8}
        onChange={onExtraContextChange}
      />
    </Card>
  )
}

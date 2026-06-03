import { Button, Card, CardHeader, CardTitle, Input } from '@/design-system'
import { translations } from '@/lib/translations'
import type { NewReportProjectDetailsCardProps } from '@/types/newReportView'
import { DynamicMetadataForm } from './DynamicMetadataForm'

export function NewReportProjectDetailsCard({
  fields,
  inspectorName,
  isSubmitting,
  isTemplateError,
  isTemplateLoading,
  metadataValue,
  showMetadataErrors,
  templateErrorMessage,
  onMetadataChange,
  onRetryTemplate,
}: NewReportProjectDetailsCardProps) {
  return (
    <Card padding="lg" className="fr-new-report-card">
      <CardHeader>
        <CardTitle className="fr-new-report-section-title">
          <span className="fr-new-report-section-bar" aria-hidden="true" />
          {translations.new_report.sections.project_details}
        </CardTitle>
      </CardHeader>
      <div className="fr-new-report-grid">
        <Input
          label={translations.new_report.fields.inspector_label}
          value={inspectorName}
          disabled
          readOnly
        />
      </div>
      {isTemplateLoading && (
        <div
          className="fr-new-report-template-skeleton"
          aria-label={translations.new_report.states.template_loading}
        >
          <span />
          <span />
          <span />
          <span />
        </div>
      )}
      {isTemplateError && (
        <div className="fr-new-report-template-error" role="alert">
          <p>{templateErrorMessage}</p>
          <Button type="button" variant="secondary" onClick={onRetryTemplate}>
            {translations.dashboard.states.retry_button}
          </Button>
        </div>
      )}
      {!isTemplateLoading && !isTemplateError && (
        <fieldset className="fr-new-report-fieldset" disabled={isSubmitting}>
          <DynamicMetadataForm
            fields={fields}
            value={metadataValue}
            onChange={onMetadataChange}
            showErrors={showMetadataErrors}
          />
        </fieldset>
      )}
    </Card>
  )
}

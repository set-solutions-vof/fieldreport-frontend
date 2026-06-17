import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  Input,
} from '@set-solutions-vof/design-system'
import { translations } from '@/lib/translations'
import type { NewReportProjectDetailsCardProps } from '@/typing/newReportView'
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
    <Card padding="lg" className="flex flex-col [gap:var(--fr-space-4)]">
      <CardHeader>
        <CardTitle className="flex items-center [gap:var(--fr-space-2)]">
          <span
            className="inline-block [width:calc(var(--fr-space-1)_-_var(--fr-border-width-sm))] [height:calc(var(--fr-space-4)_-_var(--fr-space-1)_/_2)] [border-radius:var(--fr-radius-sm)] [background:var(--fr-accent)] shrink-0"
            aria-hidden="true"
          />
          {translations.new_report.sections.project_details}
        </CardTitle>
      </CardHeader>
      <div className="grid [grid-template-columns:repeat(2,_minmax(var(--fr-space-0),_1fr))] [gap:var(--fr-space-4)]">
        <Input
          label={translations.new_report.fields.inspector_label}
          value={inspectorName}
          disabled
          readOnly
        />
      </div>
      {isTemplateLoading && (
        <div
          className="grid [grid-template-columns:repeat(2,_minmax(var(--fr-space-0),_1fr))] [gap:var(--fr-space-4)] [&_span]:[height:var(--fr-control-height-md)] [&_span]:[border-radius:var(--fr-radius-md)] [&_span]:[background:var(--fr-surface-sunken)]"
          aria-label={translations.new_report.states.template_loading}
        >
          <span />
          <span />
          <span />
          <span />
        </div>
      )}
      {isTemplateError && (
        <div
          className="flex items-center justify-between [gap:var(--fr-space-4)] [padding:var(--fr-space-3)] [border:var(--fr-border-width-sm)_solid_var(--fr-destructive)] [border-radius:var(--fr-radius-md)] [color:var(--fr-destructive)] [&_p]:[margin:var(--fr-space-0)] [&_p]:[font-size:var(--fr-text-sm)] [&_p]:[line-height:var(--fr-leading-snug)]"
          role="alert"
        >
          <p>{templateErrorMessage}</p>
          <Button type="button" variant="secondary" onClick={onRetryTemplate}>
            {translations.dashboard.states.retry_button}
          </Button>
        </div>
      )}
      {!isTemplateLoading && !isTemplateError && (
        <fieldset
          className="[min-width:var(--fr-space-0)] [padding:var(--fr-space-0)] [margin:var(--fr-space-0)] border-0"
          disabled={isSubmitting}
        >
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

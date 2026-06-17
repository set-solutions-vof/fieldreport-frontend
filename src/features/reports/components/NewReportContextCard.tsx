import {
  Card,
  CardHeader,
  CardTitle,
  Textarea,
} from '@set-solutions-vof/design-system'
import { translations } from '@/lib/translations'
import type { NewReportContextCardProps } from '@/typing/newReportView'

export function NewReportContextCard({
  extraContext,
  isSubmitting,
  onExtraContextChange,
}: NewReportContextCardProps) {
  return (
    <Card padding="lg" className="flex flex-col [gap:var(--fr-space-4)]">
      <CardHeader>
        <CardTitle className="flex items-center [gap:var(--fr-space-2)]">
          <span
            className="inline-block [width:calc(var(--fr-space-1)_-_var(--fr-border-width-sm))] [height:calc(var(--fr-space-4)_-_var(--fr-space-1)_/_2)] [border-radius:var(--fr-radius-sm)] [background:var(--fr-accent)] shrink-0 [background:var(--fr-border-strong)]"
            aria-hidden="true"
          />
          {translations.new_report.sections.context}
          <span className="[font-size:var(--fr-text-sm)] [font-weight:var(--fr-weight-regular)] [color:var(--fr-text-tertiary)] [margin-left:var(--fr-space-1)]">
            — optioneel
          </span>
        </CardTitle>
      </CardHeader>
      <div
        className="[background:var(--fr-accent-soft)] [border:var(--fr-border-width-sm)_solid_var(--fr-color-accent-200)] [border-radius:var(--fr-radius-md)] [padding:var(--fr-space-2)_var(--fr-space-3)] [font-size:var(--fr-text-sm)] [color:var(--fr-color-accent-700)] [margin-bottom:var(--fr-space-3)]"
        role="note"
      >
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

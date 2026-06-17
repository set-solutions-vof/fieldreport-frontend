import { translations } from '@/lib/translations'
import type { NewReportCompletionProgressProps } from '@/types/newReportView'

export function NewReportCompletionProgress({
  metadataFields,
  metadataValue,
}: NewReportCompletionProgressProps) {
  const requiredFieldStates = metadataFields
    .filter((field) => field.required)
    .map((field) => Boolean(metadataValue[field.key]?.trim()))
  const filledCount = requiredFieldStates.filter(Boolean).length
  const requiredCount = requiredFieldStates.length

  return (
    <div className="flex items-center justify-between [margin-bottom:var(--fr-space-5)]">
      <h1 className="[font-size:var(--fr-text-xl)] [font-weight:var(--fr-weight-medium)] [color:var(--fr-text-primary)] [margin:var(--fr-space-0)]">
        {translations.new_report.page_title}
      </h1>
      {requiredCount > 0 && (
        <div
          className="flex items-center [gap:var(--fr-space-2)] [font-size:var(--fr-text-sm)] [color:var(--fr-text-secondary)]"
          aria-label={`${filledCount} van ${requiredCount} vereiste velden ingevuld`}
        >
          <div className="flex [gap:var(--fr-space-1)]" aria-hidden="true">
            {requiredFieldStates.map((filled, index) => (
              <span
                key={index}
                className={[
                  '[width:calc(var(--fr-space-2)_-_var(--fr-space-1)_/_2)] [height:calc(var(--fr-space-2)_-_var(--fr-space-1)_/_2)] [border-radius:var(--fr-radius-full)] [background:var(--fr-border)]',
                  filled && '[background:var(--fr-accent)]',
                ]
                  .filter(Boolean)
                  .join(' ')}
              />
            ))}
          </div>
          <span>
            {filledCount} van {requiredCount} vereiste velden
          </span>
        </div>
      )}
    </div>
  )
}

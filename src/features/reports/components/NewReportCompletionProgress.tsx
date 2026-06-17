import { PageHeader } from '@/components/PageHeader'
import { translations } from '@/lib/translations'
import type { NewReportCompletionProgressProps } from '@/typing/newReportView'

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
    <div className="flex items-start justify-between [gap:var(--fr-space-4)]">
      <PageHeader title={translations.new_report.page_title} />
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
                  '[width:calc(var(--fr-space-2)_-_var(--fr-space-1)_/_2)] [height:calc(var(--fr-space-2)_-_var(--fr-space-1)_/_2)] [border-radius:var(--fr-radius-full)]',
                  filled
                    ? '[background:var(--fr-accent)]'
                    : '[background:var(--fr-border)]',
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

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
    <div className="fr-new-report-title-row">
      <h1 className="fr-new-report-page-title">
        {translations.new_report.page_title}
      </h1>
      {requiredCount > 0 && (
        <div
          className="fr-new-report-progress"
          aria-label={`${filledCount} van ${requiredCount} vereiste velden ingevuld`}
        >
          <div className="fr-new-report-progress-dots" aria-hidden="true">
            {requiredFieldStates.map((filled, index) => (
              <span
                key={index}
                className={[
                  'fr-new-report-dot',
                  filled && 'fr-new-report-dot--filled',
                ]
                  .filter(Boolean)
                  .join(' ')}
              />
            ))}
          </div>
          <span className="fr-new-report-progress-label">
            {filledCount} van {requiredCount} vereiste velden
          </span>
        </div>
      )}
    </div>
  )
}

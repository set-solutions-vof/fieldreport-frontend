import { translations } from '@/lib/translations'
import type { NewReportCompletionProgressProps } from '@/types/newReportView'

export function NewReportCompletionProgress({
  errors,
  form,
}: NewReportCompletionProgressProps) {
  const requiredFieldStates = [
    form.address.trim().length > 0 && errors.address === undefined,
    form.inspectionDate.length > 0 && errors.inspectionDate === undefined,
    form.investigationType !== '' && errors.investigationType === undefined,
    form.clientType !== '' && errors.clientType === undefined,
  ]
  const filledCount = requiredFieldStates.filter(Boolean).length

  return (
    <div className="fr-new-report-title-row">
      <h1 className="fr-new-report-page-title">
        {translations.new_report.page_title}
      </h1>
      <div
        className="fr-new-report-progress"
        aria-label={`${filledCount} van 4 vereiste velden ingevuld`}
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
          {filledCount} van 4 vereiste velden
        </span>
      </div>
    </div>
  )
}

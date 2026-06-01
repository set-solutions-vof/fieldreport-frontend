import { Card, CardHeader, CardTitle, Input } from '@/design-system'
import { translations } from '@/lib/translations'
import type { NewReportProjectDetailsCardProps } from '@/types/newReportView'

export function NewReportProjectDetailsCard({
  clientTypes,
  errors,
  form,
  investigationTypes,
  isSubmitting,
  onFieldChange,
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
          label={translations.new_report.fields.address_label}
          placeholder={translations.new_report.fields.address_placeholder}
          value={form.address}
          error={errors.address}
          disabled={isSubmitting}
          required
          onChange={(event) =>
            onFieldChange('address', event.currentTarget.value)
          }
        />
        <Input
          label={translations.new_report.fields.date_label}
          type="date"
          value={form.inspectionDate}
          error={errors.inspectionDate}
          disabled={isSubmitting}
          required
          onChange={(event) =>
            onFieldChange('inspectionDate', event.currentTarget.value)
          }
        />
        <div className="fr-field">
          <label className="fr-field__label" htmlFor="investigation-type">
            {translations.new_report.fields.investigation_type_label}
            <span className="fr-field__required" aria-hidden="true">
              *
            </span>
          </label>
          <select
            id="investigation-type"
            className="fr-select"
            value={form.investigationType}
            disabled={isSubmitting}
            required
            aria-invalid={errors.investigationType ? true : undefined}
            aria-describedby={
              errors.investigationType ? 'investigation-type-error' : undefined
            }
            onChange={(event) =>
              onFieldChange('investigationType', event.currentTarget.value)
            }
          >
            <option value="">
              {translations.new_report.fields.investigation_type_placeholder}
            </option>
            {investigationTypes.map((investigationType) => (
              <option value={investigationType} key={investigationType}>
                {translations.new_report.investigation_types[investigationType]}
              </option>
            ))}
          </select>
          {errors.investigationType && (
            <div
              id="investigation-type-error"
              className="fr-field__error"
              role="alert"
            >
              {errors.investigationType}
            </div>
          )}
        </div>
        <div className="fr-field">
          <label className="fr-field__label" htmlFor="client-type">
            {translations.new_report.fields.client_type_label}
            <span className="fr-field__required" aria-hidden="true">
              *
            </span>
          </label>
          <select
            id="client-type"
            className="fr-select"
            value={form.clientType}
            disabled={isSubmitting}
            required
            aria-invalid={errors.clientType ? true : undefined}
            aria-describedby={
              errors.clientType ? 'client-type-error' : undefined
            }
            onChange={(event) =>
              onFieldChange('clientType', event.currentTarget.value)
            }
          >
            <option value="">
              {translations.new_report.fields.client_type_placeholder}
            </option>
            {clientTypes.map((clientType) => (
              <option value={clientType} key={clientType}>
                {translations.new_report.client_types[clientType]}
              </option>
            ))}
          </select>
          {errors.clientType && (
            <div
              id="client-type-error"
              className="fr-field__error"
              role="alert"
            >
              {errors.clientType}
            </div>
          )}
        </div>
        <Input
          label={translations.new_report.fields.reference_label}
          placeholder={translations.new_report.fields.reference_placeholder}
          value={form.referenceNumber}
          disabled={isSubmitting}
          onChange={(event) =>
            onFieldChange('referenceNumber', event.currentTarget.value)
          }
        />
      </div>
    </Card>
  )
}

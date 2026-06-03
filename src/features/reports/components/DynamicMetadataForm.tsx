import { Input } from '@/design-system'
import { translations } from '@/lib/translations'
import type { MetadataField } from '@/types/template'
import type { DynamicMetadataFormProps } from '@/types/newReportView'

export function DynamicMetadataForm({
  fields,
  value,
  onChange,
  showErrors,
}: DynamicMetadataFormProps) {
  function updateField(field: MetadataField, fieldValue: string): void {
    onChange({ ...value, [field.key]: fieldValue })
  }

  function fieldError(field: MetadataField): string | undefined {
    if (!showErrors || !field.required || value[field.key]?.trim()) {
      return undefined
    }

    return translations.new_report.errors.required_metadata_field
  }

  return (
    <div className="fr-new-report-grid">
      {fields.map((field) => {
        const error = fieldError(field)
        const fieldValue = value[field.key] ?? ''

        if (
          field.type === 'text' ||
          field.type === 'phone' ||
          field.type === 'email'
        ) {
          return (
            <Input
              key={field.key}
              id={`metadata-${field.key}`}
              label={field.label}
              type={field.type}
              value={fieldValue}
              error={error}
              required={field.required}
              onChange={(event) =>
                updateField(field, event.currentTarget.value)
              }
            />
          )
        }

        if (field.type === 'date') {
          return (
            <Input
              key={field.key}
              id={`metadata-${field.key}`}
              label={field.label}
              type="date"
              value={fieldValue}
              error={error}
              required={field.required}
              onChange={(event) =>
                updateField(field, event.currentTarget.value)
              }
            />
          )
        }

        if (field.type === 'select') {
          return (
            <div className="fr-field" key={field.key}>
              <label
                className="fr-field__label"
                htmlFor={`metadata-${field.key}`}
              >
                {field.label}
                {field.required && (
                  <span className="fr-field__required" aria-hidden="true">
                    *
                  </span>
                )}
              </label>
              <select
                id={`metadata-${field.key}`}
                className="fr-select"
                value={fieldValue}
                required={field.required}
                aria-invalid={error ? true : undefined}
                aria-describedby={
                  error ? `metadata-${field.key}-error` : undefined
                }
                onChange={(event) =>
                  updateField(field, event.currentTarget.value)
                }
              >
                <option value="">
                  {translations.new_report.fields.select_placeholder}
                </option>
                {field.options?.map((option) => (
                  <option value={option} key={option}>
                    {option}
                  </option>
                ))}
              </select>
              {error && (
                <div
                  id={`metadata-${field.key}-error`}
                  className="fr-field__error"
                  role="alert"
                >
                  {error}
                </div>
              )}
            </div>
          )
        }

        return (
          <div className="fr-field" key={field.key}>
            <label className="fr-new-report-checkbox">
              <input
                type="checkbox"
                checked={fieldValue === 'true'}
                required={field.required}
                aria-invalid={error ? true : undefined}
                aria-describedby={
                  error ? `metadata-${field.key}-error` : undefined
                }
                onChange={(event) =>
                  updateField(field, event.currentTarget.checked ? 'true' : '')
                }
              />
              <span>
                {field.label}
                {field.required && (
                  <span className="fr-field__required" aria-hidden="true">
                    *
                  </span>
                )}
              </span>
            </label>
            {error && (
              <div
                id={`metadata-${field.key}-error`}
                className="fr-field__error"
                role="alert"
              >
                {error}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

import { Input } from '@set-solutions-vof/design-system'
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
    <div className="grid [grid-template-columns:repeat(2,_minmax(var(--fr-space-0),_1fr))] [gap:var(--fr-space-4)]">
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
            <div
              className="flex flex-col [gap:var(--fr-space-2)] min-w-0"
              key={field.key}
            >
              <label
                className="[font-size:var(--fr-text-sm)] [font-weight:var(--fr-weight-semibold)] [grid-row:1] [grid-column:1]"
                htmlFor={`metadata-${field.key}`}
              >
                {field.label}
                {field.required && (
                  <span
                    className="[color:var(--fr-destructive)] [margin-left:var(--fr-space-1)]"
                    aria-hidden="true"
                  >
                    *
                  </span>
                )}
              </label>
              <select
                id={`metadata-${field.key}`}
                className="[height:var(--fr-control-height-md)] w-full [padding:var(--fr-space-0)_var(--fr-space-3)] [color:var(--fr-text-primary)] [background:var(--fr-surface)] [border:var(--fr-border-width-sm)_solid_var(--fr-border)] [border-radius:var(--fr-radius-md)] [font-family:var(--fr-font-sans)] [font-size:var(--fr-text-base)] [line-height:var(--fr-leading-normal)] [transition:var(--fr-transition-base)] focus:[border-color:var(--fr-border-focus)] focus:[box-shadow:var(--fr-shadow-focus)] focus:outline-none [&[aria-invalid='true']]:[border-color:var(--fr-destructive)] disabled:[color:var(--fr-text-disabled)] disabled:cursor-not-allowed disabled:[background:var(--fr-surface-sunken)]"
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
                  className="[font-family:var(--fr-font-sans)] [font-size:var(--fr-text-xs)] [color:var(--fr-destructive)] [line-height:var(--fr-leading-snug)] flex items-start [gap:var(--fr-space-1)]"
                  role="alert"
                >
                  {error}
                </div>
              )}
            </div>
          )
        }

        return (
          <div
            className="flex flex-col [gap:var(--fr-space-2)] min-w-0"
            key={field.key}
          >
            <label className="flex [min-height:var(--fr-control-height-md)] items-center [gap:var(--fr-space-2)] [color:var(--fr-text-primary)] [font-size:var(--fr-text-sm)] [font-weight:var(--fr-weight-medium)] [line-height:var(--fr-leading-snug)] [&_input]:[width:var(--fr-space-4)] [&_input]:[height:var(--fr-space-4)] [&_input]:[accent-color:var(--fr-accent)]">
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
                  <span
                    className="[color:var(--fr-destructive)] [margin-left:var(--fr-space-1)]"
                    aria-hidden="true"
                  >
                    *
                  </span>
                )}
              </span>
            </label>
            {error && (
              <div
                id={`metadata-${field.key}-error`}
                className="[font-family:var(--fr-font-sans)] [font-size:var(--fr-text-xs)] [color:var(--fr-destructive)] [line-height:var(--fr-leading-snug)] flex items-start [gap:var(--fr-space-1)]"
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

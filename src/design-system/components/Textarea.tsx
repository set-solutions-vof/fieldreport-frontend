import * as React from 'react'
import './Input.css'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: React.ReactNode
  helperText?: React.ReactNode
  error?: React.ReactNode
  required?: boolean
  fieldClassName?: string
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    {
      label,
      helperText,
      error,
      required,
      id: idProp,
      className,
      fieldClassName,
      disabled,
      rows = 4,
      'aria-describedby': ariaDescribedByProp,
      ...rest
    },
    ref,
  ) {
    const reactId = React.useId()
    const id = idProp ?? reactId
    const helperId = helperText ? `${id}-helper` : undefined
    const errorId = error ? `${id}-error` : undefined

    const describedBy =
      [ariaDescribedByProp, errorId, !error ? helperId : undefined]
        .filter(Boolean)
        .join(' ') || undefined

    const cls = ['fr-input', 'fr-textarea', className].filter(Boolean).join(' ')

    return (
      <div className={['fr-field', fieldClassName].filter(Boolean).join(' ')}>
        {label && (
          <label htmlFor={id} className="fr-field__label">
            {label}
            {required && (
              <span className="fr-field__required" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          className={cls}
          rows={rows}
          required={required}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          {...rest}
        />
        {error ? (
          <div id={errorId} className="fr-field__error" role="alert">
            {error}
          </div>
        ) : helperText ? (
          <div id={helperId} className="fr-field__helper">
            {helperText}
          </div>
        ) : null}
      </div>
    )
  },
)

Textarea.displayName = 'Textarea'

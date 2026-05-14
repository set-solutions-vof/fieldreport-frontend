import * as React from 'react'
import './Input.css'

export type InputSize = 'sm' | 'md' | 'lg'

export interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size'
> {
  label?: React.ReactNode
  helperText?: React.ReactNode
  error?: React.ReactNode
  required?: boolean
  inputSize?: InputSize
  fieldClassName?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input(
    {
      label,
      helperText,
      error,
      required,
      inputSize = 'md',
      id: idProp,
      className,
      fieldClassName,
      disabled,
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

    const inputCls = [
      'fr-input',
      inputSize !== 'md' && `fr-input--${inputSize}`,
      className,
    ]
      .filter(Boolean)
      .join(' ')

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
        <input
          ref={ref}
          id={id}
          className={inputCls}
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

Input.displayName = 'Input'

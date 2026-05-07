import * as React from "react";
import "./Input.css";

export type InputSize = "sm" | "md" | "lg";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Visible label rendered above the input. Required for accessibility unless `aria-label` is provided. */
  label?: React.ReactNode;
  /** Helper copy under the input. Hidden when an error is shown. */
  helperText?: React.ReactNode;
  /** Error copy under the input. Toggles error styling and aria-invalid. */
  error?: React.ReactNode;
  /** Show a `*` after the label and set required on the input. */
  required?: boolean;
  /** Control height. Default `md`. */
  inputSize?: InputSize;
  /** Class on the outer field wrapper. `className` falls through to the input element. */
  fieldClassName?: string;
}

/**
 * Input — text field with label, helper text, and error state.
 * Always provide a `label` (visible) or `aria-label` (off-screen).
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input(
    {
      label,
      helperText,
      error,
      required,
      inputSize = "md",
      id: idProp,
      className,
      fieldClassName,
      disabled,
      "aria-describedby": ariaDescribedByProp,
      ...rest
    },
    ref
  ) {
    const reactId = React.useId();
    const id = idProp ?? reactId;
    const helperId = helperText ? `${id}-helper` : undefined;
    const errorId = error ? `${id}-error` : undefined;

    const describedBy =
      [ariaDescribedByProp, errorId, !error ? helperId : undefined]
        .filter(Boolean)
        .join(" ") || undefined;

    const inputCls = [
      "fr-input",
      inputSize !== "md" && `fr-input--${inputSize}`,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={["fr-field", fieldClassName].filter(Boolean).join(" ")}>
        {label && (
          <label htmlFor={id} className="fr-field__label">
            {label}
            {required && <span className="fr-field__required" aria-hidden="true">*</span>}
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
    );
  }
);

Input.displayName = "Input";

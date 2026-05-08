import * as React from "react";
import { Spinner } from "./Spinner";
import "./Button.css";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled"> {
  /** Visual treatment. Default `secondary`. */
  variant?: ButtonVariant;
  /** Control height. Default `md`. */
  size?: ButtonSize;
  /** Disable interaction. */
  disabled?: boolean;
  /** Show inline spinner; button stays focusable but blocks click. */
  loading?: boolean;
  /** Optional leading icon (size yourself with width/height — colors inherit). */
  leadingIcon?: React.ReactNode;
  /** Optional trailing icon. */
  trailingIcon?: React.ReactNode;
}

/**
 * Button — primary / secondary / ghost / destructive variants.
 * Communicates state through layout (spinner placement, opacity) and
 * border/background change — never color alone.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "secondary",
      size = "md",
      disabled = false,
      loading = false,
      leadingIcon,
      trailingIcon,
      type = "button",
      className,
      children,
      onClick,
      ...rest
    },
    ref
  ) {
    const isInert = disabled || loading;
    const cls = [
      "fr-button",
      `fr-button--${variant}`,
      `fr-button--${size}`,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const spinnerSize = size === "lg" ? "md" : "sm";

    return (
      <button
        ref={ref}
        type={type}
        className={cls}
        disabled={disabled}
        aria-disabled={isInert || undefined}
        aria-busy={loading || undefined}
        data-loading={loading || undefined}
        onClick={(e) => {
          if (isInert) {
            e.preventDefault();
            return;
          }
          onClick?.(e);
        }}
        {...rest}
      >
        {loading ? (
          <Spinner size={spinnerSize} label="" aria-hidden="true" />
        ) : (
          leadingIcon && <span aria-hidden="true">{leadingIcon}</span>
        )}
        <span className="fr-button__label">{children}</span>
        {!loading && trailingIcon && <span aria-hidden="true">{trailingIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";

import * as React from "react";
import "./Spinner.css";

export type SpinnerSize = "sm" | "md" | "lg";

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Visual size. Default `md`. */
  size?: SpinnerSize;
  /** Accessible label. Defaults to "Loading". Pass `""` to hide from AT (e.g. when adjacent text is already announced). */
  label?: string;
}

/**
 * Spinner — single animated loading indicator.
 * Inherits `currentColor` so it adapts to its surrounding text color
 * (e.g. white inside a primary Button, accent on a light surface).
 */
export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  function Spinner({ size = "md", label = "Loading", className, ...rest }, ref) {
    const cls = ["fr-spinner", `fr-spinner--${size}`, className]
      .filter(Boolean)
      .join(" ");
    return (
      <span
        ref={ref}
        className={cls}
        role={label ? "status" : undefined}
        aria-live={label ? "polite" : undefined}
        aria-label={label || undefined}
        {...rest}
      />
    );
  }
);

Spinner.displayName = "Spinner";

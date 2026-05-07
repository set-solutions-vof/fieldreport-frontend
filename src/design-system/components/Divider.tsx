import * as React from "react";
import "./Divider.css";

export interface DividerProps extends React.HTMLAttributes<HTMLElement> {
  /** Direction. Default `horizontal`. */
  orientation?: "horizontal" | "vertical";
  /** Vertical block-margin spacing. Default `none`. */
  spacing?: "none" | "sm" | "md" | "lg";
  /** Whether the divider is purely decorative (default) or marks a section break. */
  decorative?: boolean;
}

/**
 * Divider — horizontal or vertical rule using the border token.
 * Defaults to decorative; pass `decorative={false}` to expose as a
 * semantic separator to assistive tech.
 */
export const Divider = React.forwardRef<HTMLElement, DividerProps>(
  function Divider(
    {
      orientation = "horizontal",
      spacing = "none",
      decorative = true,
      className,
      ...rest
    },
    ref
  ) {
    const cls = [
      "fr-divider",
      `fr-divider--${orientation}`,
      spacing !== "none" && `fr-divider--spacing-${spacing}`,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    if (orientation === "horizontal" && decorative) {
      return <hr ref={ref as React.Ref<HTMLHRElement>} className={cls} {...rest} />;
    }
    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={cls}
        role={decorative ? "presentation" : "separator"}
        aria-orientation={!decorative ? orientation : undefined}
        {...rest}
      />
    );
  }
);

Divider.displayName = "Divider";

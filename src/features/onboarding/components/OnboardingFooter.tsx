import { Button } from '@set-solutions-vof/design-system'
import type { OnboardingFooterProps } from '@/typing/onboardingView'

export function OnboardingFooter({
  leftLabel,
  rightLabel,
  leftLeadingIcon,
  rightTrailingIcon,
  rightDisabled = false,
  rightLoading = false,
  helperText,
  errorMessage,
  onLeftClick,
  onRightClick,
}: OnboardingFooterProps) {
  return (
    <footer className="flex items-center justify-between [gap:var(--fr-space-4)] [padding:var(--fr-space-4)_var(--fr-space-7)] [background:var(--fr-surface)] [border-top:var(--fr-border-width-sm)_solid_var(--fr-border)]">
      <Button
        type="button"
        variant="ghost"
        leadingIcon={leftLeadingIcon}
        onClick={onLeftClick}
      >
        {leftLabel}
      </Button>
      <div className="flex items-center [gap:var(--fr-space-4)]">
        {helperText !== null && helperText !== undefined && (
          <p className="[font-size:var(--fr-text-sm)] [line-height:var(--fr-leading-snug)] [color:var(--fr-text-secondary)]">{helperText}</p>
        )}
        {errorMessage !== null && errorMessage !== undefined && (
          <p className="[margin:var(--fr-space-0)] [font-size:var(--fr-text-sm)] [color:var(--fr-destructive)]">{errorMessage}</p>
        )}
        <Button
          type="button"
          variant="primary"
          disabled={rightDisabled}
          loading={rightLoading}
          trailingIcon={rightTrailingIcon}
          onClick={onRightClick}
        >
          {rightLabel}
        </Button>
      </div>
    </footer>
  )
}

import { Button } from '@/design-system'
import type { OnboardingFooterProps } from '@/types/onboardingView'
import './OnboardingFooter.css'

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
    <footer className="fr-onboarding-footer">
      <Button
        type="button"
        variant="ghost"
        leadingIcon={leftLeadingIcon}
        onClick={onLeftClick}
      >
        {leftLabel}
      </Button>
      <div className="fr-onboarding-footer__right">
        {helperText !== null && helperText !== undefined && (
          <p className="fr-onboarding-footer__helper">{helperText}</p>
        )}
        {errorMessage !== null && errorMessage !== undefined && (
          <p className="fr-onboarding-action-error">{errorMessage}</p>
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

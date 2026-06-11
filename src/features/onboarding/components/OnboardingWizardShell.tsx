import { Button, Logo } from '@/design-system'
import { translations } from '@/lib/translations'
import type { OnboardingWizardShellProps } from '@/types/onboardingView'
import { OnboardingFooter } from './OnboardingFooter'
import { OnboardingIcon } from './icons/OnboardingIcon'
import { OnboardingStepper } from './OnboardingStepper'
import './OnboardingWizardLayout.css'

export function OnboardingWizardShell({
  currentStep,
  fileInputRef,
  footer,
  showWelcomeOverlay,
  onDrop,
  onDragOver,
  onFileInputChange,
  onFinishWelcome,
  onLogout,
  children,
}: OnboardingWizardShellProps) {
  return (
    <main
      className="fr-onboarding-page"
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <input
        ref={fileInputRef}
        className="fr-onboarding-file-input"
        type="file"
        multiple
        accept="application/pdf"
        onChange={onFileInputChange}
      />
      <header className="fr-onboarding-header">
        <Logo variant="accent" />
        <OnboardingStepper currentStep={currentStep} />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="fr-onboarding-header__logout"
          onClick={onLogout}
        >
          {translations.auth.logout_button}
        </Button>
      </header>
      <div className="fr-onboarding-content">{children}</div>
      <OnboardingFooter {...footer} />
      {showWelcomeOverlay && (
        <div
          className="fr-onboarding-welcome-overlay"
          onClick={onFinishWelcome}
          role="presentation"
        >
          <span className="fr-onboarding-welcome-card">
            <span
              className="fr-onboarding-welcome-card__icon"
              aria-hidden="true"
            >
              <OnboardingIcon
                name="check"
                className="fr-onboarding-welcome-card__check fr-onboarding-icon"
              />
            </span>
            <span className="fr-onboarding-welcome-card__title">
              {translations.onboarding.welcome.title}
            </span>
            <span className="fr-onboarding-welcome-card__subtitle">
              {translations.onboarding.welcome.subtitle}
            </span>
            <Button
              type="button"
              variant="secondary"
              onClick={(event) => {
                event.stopPropagation()
                onFinishWelcome()
              }}
            >
              {translations.onboarding.welcome.button}
            </Button>
          </span>
        </div>
      )}
    </main>
  )
}

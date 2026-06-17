import { Button, Logo } from '@set-solutions-vof/design-system'
import { PageHeader } from '@/components/PageHeader'
import { translations } from '@/lib/translations'
import type { OnboardingWizardShellProps } from '@/types/onboardingView'
import { OnboardingFooter } from './OnboardingFooter'
import { OnboardingIcon } from './icons/OnboardingIcon'
import { OnboardingStepper } from './OnboardingStepper'

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
      className="min-h-[100dvh] [background:var(--fr-background)] grid [grid-template-rows:auto_minmax(var(--fr-space-0),_1fr)_auto]"
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <input
        ref={fileInputRef}
        className="absolute [width:var(--fr-space-0)] [height:var(--fr-space-0)] overflow-hidden [opacity:0] pointer-events-none"
        type="file"
        multiple
        accept="application/pdf"
        onChange={onFileInputChange}
      />
      <header className="grid [grid-template-columns:1fr_auto_1fr] items-center [gap:var(--fr-space-4)] [min-width:var(--fr-space-0)] [padding:var(--fr-space-4)_var(--fr-space-7)] [background:var(--fr-surface)] [border-bottom:var(--fr-border-width-sm)_solid_var(--fr-border)]">
        <Logo variant="accent" />
        <OnboardingStepper currentStep={currentStep} />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="[justify-self:end]"
          onClick={onLogout}
        >
          {translations.auth.logout_button}
        </Button>
      </header>
      <div className="flex justify-center [min-width:var(--fr-space-0)] [min-height:var(--fr-space-0)] [overflow:auto]">
        {children}
      </div>
      <OnboardingFooter {...footer} />
      {showWelcomeOverlay && (
        <div
          className="fixed [inset:var(--fr-space-0)] flex items-center justify-center [padding:var(--fr-space-6)] [background:color-mix(in_oklch,_var(--fr-background)_64%,_transparent)] [backdrop-filter:blur(var(--fr-space-3))]"
          onClick={onFinishWelcome}
          role="presentation"
        >
          <span className="flex [width:min(100%,_calc(var(--fr-space-16)_+_var(--fr-space-12)))] flex-col items-center [gap:var(--fr-space-3)] [padding:var(--fr-space-0)] text-center">
            <span
              className="[color:var(--fr-status-approved-fg)] [background:var(--fr-status-approved-bg)] [border:var(--fr-border-width-sm)_solid_var(--fr-status-approved-border)] inline-flex items-center justify-center [width:var(--fr-space-8)] [height:var(--fr-space-8)] [margin-bottom:var(--fr-space-2)] [border-radius:var(--fr-radius-lg)] [color:var(--fr-text-on-accent)] [background:var(--fr-accent)] [border:var(--fr-border-width-sm)_solid_var(--fr-accent)] [box-shadow:var(--fr-shadow-lg)]"
              aria-hidden="true"
            >
              <OnboardingIcon
                name="check"
                className="[width:var(--fr-space-5)] [height:var(--fr-space-5)] [stroke-width:2.25] block [width:var(--fr-space-4)] [height:var(--fr-space-4)] shrink-0 [width:var(--fr-space-5)] [height:var(--fr-space-5)]"
              />
            </span>
            <div className="[max-width:calc(var(--fr-space-16)_+_var(--fr-space-10))]">
              <PageHeader
                title={translations.onboarding.welcome.title}
                metadata={translations.onboarding.welcome.subtitle}
              />
            </div>
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

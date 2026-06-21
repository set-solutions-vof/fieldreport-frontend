import { Button, Logo } from '@set-solutions-vof/design-system'
import { pageTitleClassName } from '@/components/pageTitleClassName'
import { translations } from '@/lib/translations'
import type { OnboardingWizardShellProps } from '@/typing/onboardingView'
import { OnboardingFooter } from './OnboardingFooter'
import { OnboardingIcon } from './icons/OnboardingIcon'
import { OnboardingStepper } from './OnboardingStepper'

const welcomeContentWidthClass =
  '[width:min(100%,calc(var(--fr-space-16)_*_3))]'

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
      className="h-[100dvh] overflow-hidden [background:var(--fr-background)] grid [grid-template-rows:auto_minmax(var(--fr-space-0),_1fr)_auto]"
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
      <div
        className={[
          'flex [min-width:var(--fr-space-0)] [min-height:var(--fr-space-0)] flex-1',
          currentStep === 3
            ? 'flex-col overflow-hidden'
            : 'flex-col items-center justify-center overflow-auto',
        ].join(' ')}
      >
        {children}
      </div>
      {!showWelcomeOverlay && <OnboardingFooter {...footer} />}
      {showWelcomeOverlay && (
        <div
          className="fixed [inset:var(--fr-space-0)] z-20 flex items-center justify-center [padding:var(--fr-space-7)] [background:color-mix(in_oklch,_var(--fr-background)_64%,_transparent)] [backdrop-filter:blur(var(--fr-space-3))]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="onboarding-welcome-title"
        >
          <section
            className={`box-border flex flex-col items-center [gap:var(--fr-space-6)] text-center ${welcomeContentWidthClass}`}
          >
            <span
              className="inline-flex items-center justify-center [width:var(--fr-space-9)] [height:var(--fr-space-9)] [border-radius:var(--fr-radius-lg)] [color:var(--fr-status-approved-fg)] [background:var(--fr-status-approved-bg)] [border:var(--fr-border-width-sm)_solid_var(--fr-status-approved-border)]"
              aria-hidden="true"
            >
              <OnboardingIcon
                name="check"
                className="block [width:var(--fr-space-5)] [height:var(--fr-space-5)] [stroke-width:2.25]"
              />
            </span>
            <div
              className={`flex flex-col items-center [gap:var(--fr-space-3)] ${welcomeContentWidthClass}`}
            >
              <h1 id="onboarding-welcome-title" className={pageTitleClassName}>
                {translations.onboarding.welcome.title}
              </h1>
              <p className="[margin:var(--fr-space-0)] [max-width:calc(var(--fr-space-16)_+_var(--fr-space-12))] [font-size:var(--fr-text-sm)] [line-height:var(--fr-leading-snug)] [color:var(--fr-text-secondary)]">
                {translations.onboarding.welcome.subtitle}
              </p>
            </div>
            <Button type="button" variant="primary" onClick={onFinishWelcome}>
              {translations.onboarding.welcome.button}
            </Button>
          </section>
        </div>
      )}
    </main>
  )
}

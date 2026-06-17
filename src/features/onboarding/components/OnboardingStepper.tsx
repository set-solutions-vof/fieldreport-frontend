import type { OnboardingStep, OnboardingStepStatus } from '@/types/onboarding'
import type {
  OnboardingStepDefinition,
  OnboardingStepperProps,
} from '@/types/onboardingView'
import { translations } from '@/lib/translations'
import { OnboardingIcon } from './icons/OnboardingIcon'

const steps: OnboardingStepDefinition[] = [
  {
    step: 1,
    label: translations.onboarding.stepper.steps.company_profile,
    optional: true,
  },
  { step: 2, label: translations.onboarding.stepper.steps.upload_reports },
  { step: 3, label: translations.onboarding.stepper.steps.review_template },
  { step: 4, label: translations.onboarding.stepper.steps.invite_team },
]

export function OnboardingStepper({ currentStep }: OnboardingStepperProps) {
  return (
    <ol
      className="flex items-center justify-center [gap:var(--fr-space-3)] [width:min(100%,_calc(var(--fr-space-16)_*_4_+_var(--fr-space-8)))] [margin:var(--fr-space-0)] [padding:var(--fr-space-0)] list-none"
      aria-label={translations.onboarding.stepper.aria_label}
    >
      {steps.map((stepItem) => {
        const status = stepStatus(stepItem.step, currentStep)
        const hasCompletedConnector =
          stepItem.step > 1 && stepItem.step - 1 < currentStep

        return (
          <li
            className="relative flex items-start [gap:var(--fr-space-2)] [min-width:var(--fr-space-0)]"
            key={stepItem.step}
          >
            <span
              className={[
                'static [width:var(--fr-space-11)] [height:var(--fr-border-width-sm)] shrink-0 [margin-top:var(--fr-space-3)] [background:var(--fr-border-strong)]',
                stepItem.step === 1 && 'hidden',
                hasCompletedConnector && '[background:var(--fr-accent)]',
              ]
                .filter(Boolean)
                .join(' ')}
            />
            <span
              className={[
                'inline-flex items-center justify-center [width:var(--fr-space-6)] [height:var(--fr-space-6)] shrink-0 [border-radius:var(--fr-radius-full)] [font-size:var(--fr-text-sm)] [font-weight:var(--fr-weight-semibold)] [color:var(--fr-text-tertiary)] [background:var(--fr-surface-sunken)] [border:var(--fr-border-width-sm)_solid_var(--fr-border-strong)]',
                status !== 'inactive' &&
                  '[color:var(--fr-text-on-accent)] [background:var(--fr-accent)] [border-color:var(--fr-accent)]',
                status === 'active' && '[box-shadow:var(--fr-shadow-focus)]',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {status === 'completed' ? (
                <OnboardingIcon
                  name="check"
                  className="[width:var(--fr-space-3)] [height:var(--fr-space-3)] [stroke-width:2.5] block [width:var(--fr-space-4)] [height:var(--fr-space-4)] shrink-0 [width:var(--fr-space-5)] [height:var(--fr-space-5)]"
                />
              ) : (
                stepItem.step
              )}
            </span>
            <span
              className={[
                'flex [min-width:var(--fr-space-0)] [min-height:var(--fr-space-6)] flex-col [gap:var(--fr-space-1)] justify-center [font-size:var(--fr-text-base)] [font-weight:var(--fr-weight-medium)] [line-height:var(--fr-leading-snug)] [color:var(--fr-text-tertiary)]',
                status === 'active' &&
                  '[font-weight:var(--fr-weight-semibold)] [color:var(--fr-text-primary)]',
                status === 'completed' && '[color:var(--fr-text-secondary)]',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <span>{stepItem.label}</span>
              {stepItem.optional === true && (
                <span className="[width:fit-content] [padding:var(--fr-space-1)_var(--fr-space-2)] [border-radius:var(--fr-radius-full)] [font-size:var(--fr-text-xs)] [color:var(--fr-citation-fg)] [background:var(--fr-citation-bg)]">
                  {translations.onboarding.stepper.optional_badge}
                </span>
              )}
            </span>
          </li>
        )
      })}
    </ol>
  )
}

function stepStatus(
  step: OnboardingStep,
  currentStep: OnboardingStep,
): OnboardingStepStatus {
  if (step < currentStep) {
    return 'completed'
  }

  if (step === currentStep) {
    return 'active'
  }

  return 'inactive'
}

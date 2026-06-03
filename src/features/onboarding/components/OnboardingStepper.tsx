import type { OnboardingStep, OnboardingStepStatus } from '@/types/onboarding'
import type {
  OnboardingStepDefinition,
  OnboardingStepperProps,
} from '@/types/onboardingView'
import { translations } from '@/lib/translations'
import { OnboardingIcon } from './icons/OnboardingIcon'
import './OnboardingStepper.css'

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
      className="fr-onboarding-stepper"
      aria-label={translations.onboarding.stepper.aria_label}
    >
      {steps.map((stepItem) => {
        const status = stepStatus(stepItem.step, currentStep)

        return (
          <li
            className={[
              'fr-onboarding-stepper__item',
              `fr-onboarding-stepper__item--${status}`,
            ].join(' ')}
            key={stepItem.step}
          >
            <span className="fr-onboarding-stepper__connector" />
            <span className="fr-onboarding-stepper__circle">
              {status === 'completed' ? (
                <OnboardingIcon
                  name="check"
                  className="fr-onboarding-stepper__check fr-onboarding-icon"
                />
              ) : (
                stepItem.step
              )}
            </span>
            <span className="fr-onboarding-stepper__text">
              <span>{stepItem.label}</span>
              {stepItem.optional === true && (
                <span className="fr-onboarding-stepper__badge">
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

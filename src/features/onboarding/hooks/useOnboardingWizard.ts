import { useCallback, useState } from 'react'
import { dashboardRoute } from '@/app/routes'
import { updateOnboardingCompany } from '@/lib/api/onboarding'
import { AuthenticationExpiredError } from '@/lib/api/authenticatedFetch'
import { translations } from '@/lib/translations'
import type { OnboardingStep } from '@/typing/onboarding'
import type { UseOnboardingWizardParameters } from '@/typing/onboardingView'

export function useOnboardingWizard({
  onCompleted,
  onAuthenticationExpired,
}: UseOnboardingWizardParameters) {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(1)
  const [isCompleting, setIsCompleting] = useState(false)
  const [completionErrorMessage, setCompletionErrorMessage] = useState<
    string | null
  >(null)
  const [showWelcomeOverlay, setShowWelcomeOverlay] = useState(false)

  function goToPreviousStep(): void {
    setCurrentStep((step) => Math.max(1, step - 1) as OnboardingStep)
  }

  const goToNextStep = useCallback((): void => {
    setCurrentStep((step) => Math.min(4, step + 1) as OnboardingStep)
  }, [])

  function skipToNextStep(): void {
    goToNextStep()
  }

  function finishWelcome(): void {
    window.history.replaceState(null, '', dashboardRoute)
    onCompleted()
  }

  async function completeOnboarding(): Promise<void> {
    setIsCompleting(true)
    setCompletionErrorMessage(null)

    try {
      await updateOnboardingCompany({ onboarding_completed: true })
      setShowWelcomeOverlay(true)
    } catch (error) {
      if (error instanceof AuthenticationExpiredError) {
        onAuthenticationExpired()
        return
      }

      setCompletionErrorMessage(
        translations.onboarding.states.completion_failed,
      )
    } finally {
      setIsCompleting(false)
    }
  }

  return {
    currentStep,
    isCompleting,
    completionErrorMessage,
    showWelcomeOverlay,
    goToPreviousStep,
    goToNextStep,
    skipToNextStep,
    completeOnboarding,
    finishWelcome,
  }
}

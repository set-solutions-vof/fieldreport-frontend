import { OnboardingIcon } from '../components/icons/OnboardingIcon'
import { useCompanyBranding } from './useCompanyBranding'
import { useOnboardingWizard } from './useOnboardingWizard'
import { useTemplateConfiguration } from '@/features/templates/hooks/useTemplateConfiguration'
import { translations } from '@/lib/translations'
import type { UseOnboardingWizardPageParameters } from '@/typing/onboardingView'

export function useOnboardingWizardPage({
  initialCompany,
  onCompleted,
  onAuthenticationExpired,
}: UseOnboardingWizardPageParameters) {
  const templateConfiguration = useTemplateConfiguration({
    onAuthenticationExpired,
  })
  const branding = useCompanyBranding({
    initialCompany,
    onAuthenticationExpired,
  })
  const wizard = useOnboardingWizard({ onCompleted, onAuthenticationExpired })
  const { currentStep } = wizard

  function handleSecondaryAction(): void {
    if (wizard.currentStep === 1) {
      wizard.skipToNextStep()
    }
  }

  async function handlePrimaryAction(): Promise<void> {
    if (wizard.currentStep === 1) {
      wizard.goToNextStep()
      return
    }

    if (wizard.currentStep === 2) {
      if (templateConfiguration.pageState.kind === 'approved') {
        wizard.goToNextStep()
        return
      }

      const templateConfirmed =
        await templateConfiguration.confirmCurrentTemplate()
      if (templateConfirmed) {
        wizard.goToNextStep()
      }
      return
    }

    await wizard.completeOnboarding()
  }

  const leftLabel =
    wizard.currentStep === 1 ? translations.onboarding.footer.skip : null

  const leftLeadingIcon = undefined

  const rightLabel = (() => {
    if (wizard.currentStep === 1) return translations.onboarding.footer.next
    if (wizard.currentStep === 2)
      return translations.onboarding.footer.confirm_template
    return translations.onboarding.footer.go_to_dashboard
  })()

  const rightTrailingIcon =
    currentStep === 2 ? (
      <OnboardingIcon
        name="check"
        className="[width:var(--fr-space-4)] [height:var(--fr-space-4)] [color:var(--fr-text-on-accent)] block [width:var(--fr-space-4)] [height:var(--fr-space-4)] shrink-0 [width:var(--fr-space-5)] [height:var(--fr-space-5)]"
      />
    ) : currentStep === 1 ? (
      <OnboardingIcon
        name="chevronRight"
        className="[width:var(--fr-space-4)] [height:var(--fr-space-4)] [color:var(--fr-text-on-accent)] block [width:var(--fr-space-4)] [height:var(--fr-space-4)] shrink-0 [width:var(--fr-space-5)] [height:var(--fr-space-5)]"
      />
    ) : undefined

  const rightDisabled = (() => {
    if (wizard.currentStep === 2) {
      return !(
        templateConfiguration.pageState.kind === 'preview' ||
        templateConfiguration.pageState.kind === 'approved' ||
        templateConfiguration.pageState.kind === 'editing'
      )
    }
    return false
  })()

  const footerHelperText = null

  const footerErrorMessage =
    wizard.currentStep === 3
      ? wizard.completionErrorMessage
      : templateConfiguration.actionErrorMessage

  const footerAlign: 'center' | 'end' =
    wizard.currentStep === 3 ? 'center' : 'end'

  return {
    wizard,
    branding,
    templateConfiguration,
    handlePrimaryAction,
    handleSecondaryAction,
    leftLabel,
    leftLeadingIcon,
    rightLabel,
    rightTrailingIcon,
    rightDisabled,
    footerHelperText,
    footerErrorMessage,
    footerAlign,
  }
}

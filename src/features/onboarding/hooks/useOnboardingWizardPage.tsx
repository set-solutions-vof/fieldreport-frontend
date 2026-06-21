import { useEffect, useRef } from 'react'
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
  const fileInputRef = useRef<HTMLInputElement>(null)

  const templateConfiguration = useTemplateConfiguration({
    onAuthenticationExpired,
  })
  const branding = useCompanyBranding({
    initialCompany,
    onAuthenticationExpired,
  })
  const wizard = useOnboardingWizard({ onCompleted, onAuthenticationExpired })
  const { currentStep, goToNextStep } = wizard

  useEffect(() => {
    if (currentStep !== 2) {
      return
    }

    const pageKind = templateConfiguration.pageState.kind
    if (pageKind !== 'preview' && pageKind !== 'approved') {
      return
    }

    goToNextStep()
  }, [currentStep, goToNextStep, templateConfiguration.pageState.kind])

  function openFilePicker(): void {
    fileInputRef.current?.click()
  }

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
      if (
        templateConfiguration.pageState.kind === 'preview' ||
        templateConfiguration.pageState.kind === 'approved'
      ) {
        wizard.goToNextStep()
        return
      }

      const analysisOutcome = await templateConfiguration.startAnalysis()
      if (analysisOutcome === 'ready') {
        wizard.goToNextStep()
      }
      return
    }

    if (wizard.currentStep === 3) {
      if (templateConfiguration.pageState.kind === 'approved') {
        wizard.goToNextStep()
        return
      }

      if (templateConfiguration.pageState.kind === 'editing') {
        await templateConfiguration.confirmCurrentTemplate()
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

  const templateReady =
    templateConfiguration.pageState.kind === 'preview' ||
    templateConfiguration.pageState.kind === 'approved' ||
    templateConfiguration.pageState.kind === 'editing'

  const leftLabel =
    wizard.currentStep === 1 ? translations.onboarding.footer.skip : null

  const leftLeadingIcon = undefined

  const rightLabel = (() => {
    if (wizard.currentStep === 1) return translations.onboarding.footer.next
    if (wizard.currentStep === 2) {
      return templateReady
        ? translations.onboarding.footer.next
        : translations.onboarding.footer.analyze
    }
    if (wizard.currentStep === 3)
      return translations.onboarding.footer.confirm_template
    return translations.onboarding.footer.go_to_dashboard
  })()

  const rightTrailingIcon =
    wizard.currentStep === 3 ? (
      <OnboardingIcon
        name="check"
        className="[width:var(--fr-space-4)] [height:var(--fr-space-4)] [color:var(--fr-text-on-accent)] block [width:var(--fr-space-4)] [height:var(--fr-space-4)] shrink-0 [width:var(--fr-space-5)] [height:var(--fr-space-5)]"
      />
    ) : wizard.currentStep === 4 ? undefined : (
      <OnboardingIcon
        name="chevronRight"
        className="[width:var(--fr-space-4)] [height:var(--fr-space-4)] [color:var(--fr-text-on-accent)] block [width:var(--fr-space-4)] [height:var(--fr-space-4)] shrink-0 [width:var(--fr-space-5)] [height:var(--fr-space-5)]"
      />
    )

  const rightDisabled = (() => {
    if (wizard.currentStep === 2) {
      if (templateReady) return false
      return (
        templateConfiguration.pageState.kind !== 'uploading' ||
        templateConfiguration.pageState.files.length === 0
      )
    }
    if (wizard.currentStep === 3) return !templateReady
    return false
  })()

  const footerHelperText = (() => {
    if (wizard.currentStep !== 2) return null
    if (
      templateConfiguration.pageState.kind === 'empty' ||
      (templateConfiguration.pageState.kind === 'uploading' &&
        templateConfiguration.pageState.files.length === 0)
    ) {
      return translations.onboarding.footer.upload_required
    }
    return null
  })()

  const footerErrorMessage =
    wizard.currentStep === 4
      ? wizard.completionErrorMessage
      : templateConfiguration.actionErrorMessage

  const footerAlign: 'center' | 'end' =
    wizard.currentStep === 4 ? 'center' : 'end'

  return {
    wizard,
    branding,
    templateConfiguration,
    fileInputRef,
    openFilePicker,
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

import type { ChangeEvent, DragEvent } from 'react'
import { OnboardingStateScreen } from '../components/OnboardingStateScreen'
import { OnboardingWizardShell } from '../components/OnboardingWizardShell'
import { useOnboardingWizardPage } from '../hooks/useOnboardingWizardPage'
import { Step1CompanyProfile } from '../steps/Step1CompanyProfile'
import { Step2UploadReports } from '../steps/Step2UploadReports'
import { Step3ReviewTemplate } from '../steps/Step3ReviewTemplate'
import { Step4InviteTeam } from '../steps/Step4InviteTeam'
import type { OnboardingWizardPageProps } from '@/typing/onboarding'

export function OnboardingWizardPage({
  currentUser,
  initialCompany,
  onCompleted,
  onAuthenticationExpired,
  onLogout,
}: OnboardingWizardPageProps) {
  const {
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
  } = useOnboardingWizardPage({
    initialCompany,
    onCompleted,
    onAuthenticationExpired,
  })

  function handleFileInputChange(event: ChangeEvent<HTMLInputElement>): void {
    templateConfiguration.addFiles(Array.from(event.target.files ?? []))
    event.target.value = ''
  }

  function handleDrop(event: DragEvent<HTMLElement>): void {
    event.preventDefault()
    if (wizard.currentStep === 2) {
      templateConfiguration.addFiles(Array.from(event.dataTransfer.files))
    }
  }

  function handleDragOver(event: DragEvent<HTMLElement>): void {
    event.preventDefault()
  }

  function renderStep() {
    if (wizard.currentStep === 1) {
      return (
        <Step1CompanyProfile
          currentUser={currentUser}
          logoUrl={branding.logoUrl}
          primaryColor={branding.primaryColor}
          logoUploadError={branding.logoUploadError}
          colorSaveError={branding.colorSaveError}
          isUploadingLogo={branding.isUploadingLogo}
          onLogoUpload={branding.uploadLogo}
          onPrimaryColorChange={branding.setPrimaryColor}
        />
      )
    }

    if (wizard.currentStep === 2) {
      return (
        <Step2UploadReports
          templateConfiguration={templateConfiguration}
          onOpenFilePicker={openFilePicker}
        />
      )
    }

    if (wizard.currentStep === 3) {
      return (
        <Step3ReviewTemplate templateConfiguration={templateConfiguration} />
      )
    }

    return <Step4InviteTeam onAuthenticationExpired={onAuthenticationExpired} />
  }

  if (templateConfiguration.isLoading) {
    return <OnboardingStateScreen kind="loading" />
  }

  if (templateConfiguration.isError) {
    return (
      <OnboardingStateScreen
        kind="error"
        message={templateConfiguration.errorMessage}
        onRetry={templateConfiguration.retry}
      />
    )
  }

  return (
    <OnboardingWizardShell
      currentStep={wizard.currentStep}
      fileInputRef={fileInputRef}
      showWelcomeOverlay={wizard.showWelcomeOverlay}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onFileInputChange={handleFileInputChange}
      onFinishWelcome={wizard.finishWelcome}
      onLogout={onLogout}
      footer={{
        leftLabel,
        rightLabel,
        leftLeadingIcon,
        rightTrailingIcon,
        rightDisabled,
        rightLoading: templateConfiguration.isConfirming || wizard.isCompleting,
        helperText: footerHelperText,
        errorMessage: footerErrorMessage,
        align: footerAlign,
        onLeftClick:
          wizard.currentStep === 1 ? handleSecondaryAction : undefined,
        onRightClick: () => void handlePrimaryAction(),
      }}
    >
      {renderStep()}
    </OnboardingWizardShell>
  )
}

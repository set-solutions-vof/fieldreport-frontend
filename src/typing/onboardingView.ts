import type { ChangeEvent, DragEvent, ReactNode, RefObject } from 'react'
import type { CurrentUser } from '@/typing/auth'
import type {
  InviteResponse,
  InviteRole,
  OnboardingCompany,
  OnboardingStep,
} from '@/typing/onboarding'
import type { UseTemplateConfigurationResult } from '@/typing/templateConfiguration'

export type OnboardingFooterProps = {
  leftLabel: string
  rightLabel: string
  leftLeadingIcon?: ReactNode
  rightTrailingIcon?: ReactNode
  rightDisabled?: boolean
  rightLoading?: boolean
  helperText?: string | null
  errorMessage?: string | null
  onLeftClick: () => void
  onRightClick: () => void
}

export type OnboardingStepperProps = {
  currentStep: OnboardingStep
}

export type OnboardingStepDefinition = {
  step: OnboardingStep
  label: string
  optional?: boolean
}

export type ReportPreviewMiniProps = {
  companyName: string
  logoUrl: string | null
}

export type ColorPickerProps = {
  value: string
  errorMessage: string | null
  onChange: (color: string) => void
}

export type CompanyLogoUploadProps = {
  logoUrl: string | null
  isUploading: boolean
  errorMessage: string | null
  onUpload: (file: File) => Promise<void>
}

export type InviteRowProps =
  | {
      mode: 'confirmed'
      invite: InviteResponse
      onDelete: (inviteId: string) => void
    }
  | {
      mode: 'active'
      isSending: boolean
      onSend: (email: string, role: InviteRole) => Promise<void>
    }

export type ActiveInviteRowProps = {
  isSending: boolean
  onSend: (email: string, role: InviteRole) => Promise<void>
}

export type Step1CompanyProfileProps = {
  currentUser: CurrentUser
  logoUrl: string | null
  primaryColor: string
  logoUploadError: string | null
  colorSaveError: string | null
  isUploadingLogo: boolean
  onLogoUpload: (file: File) => Promise<void>
  onPrimaryColorChange: (color: string) => void
}

export type Step2UploadReportsProps = {
  templateConfiguration: UseTemplateConfigurationResult
  onOpenFilePicker: () => void
}

export type Step3ReviewTemplateProps = {
  templateConfiguration: UseTemplateConfigurationResult
}

export type Step4InviteTeamProps = {
  onAuthenticationExpired: () => void
}

export type UseCompanyBrandingParameters = {
  initialCompany: OnboardingCompany
  onAuthenticationExpired: () => void
}

export type UseInvitesParameters = {
  onAuthenticationExpired: () => void
}

export type UseOnboardingWizardParameters = {
  onCompleted: () => void
  onAuthenticationExpired: () => void
}

export type UseAdminOnboardingGateParameters = {
  onAuthenticationExpired: () => void
}

export type UseOnboardingWizardPageParameters = {
  initialCompany: OnboardingCompany
  onCompleted: () => void
  onAuthenticationExpired: () => void
}

export type OnboardingStateScreenProps =
  | { kind: 'loading' }
  | { kind: 'error'; message?: string | null; onRetry: () => void }

export type OnboardingWizardShellProps = {
  currentStep: OnboardingStep
  fileInputRef: RefObject<HTMLInputElement | null>
  footer: OnboardingFooterProps
  showWelcomeOverlay: boolean
  onDrop: (event: DragEvent<HTMLElement>) => void
  onDragOver: (event: DragEvent<HTMLElement>) => void
  onFileInputChange: (event: ChangeEvent<HTMLInputElement>) => void
  onFinishWelcome: () => void
  onLogout: () => void
  children: ReactNode
}

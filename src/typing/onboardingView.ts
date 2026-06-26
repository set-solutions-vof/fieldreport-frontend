import type { ReactNode } from 'react'
import type { CurrentUser } from '@/typing/auth'
import type {
  InviteResponse,
  InviteRole,
  OnboardingCompany,
  OnboardingStep,
} from '@/typing/onboarding'

export type OnboardingFooterProps = {
  leftLabel?: string | null
  rightLabel: string
  leftLeadingIcon?: ReactNode
  rightTrailingIcon?: ReactNode
  rightDisabled?: boolean
  rightLoading?: boolean
  helperText?: string | null
  errorMessage?: string | null
  align?: 'end' | 'center'
  onLeftClick?: () => void
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
  footer: OnboardingFooterProps
  showWelcomeOverlay: boolean
  onFinishWelcome: () => void
  onLogout: () => void
  children: ReactNode
}

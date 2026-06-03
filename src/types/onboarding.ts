import type { CurrentUser } from '@/types/auth'

export type OnboardingCompany = {
  logo_url: string | null
  primary_color: string | null
  onboarding_completed: boolean
}

export type UpdateOnboardingCompanyPayload = {
  logo_url?: string | null
  primary_color?: string | null
  onboarding_completed?: boolean
}

export type InviteRole = 'admin' | 'inspector'

export type CreateInvitePayload = {
  email: string
  role: InviteRole
}

export type CreateInviteResponse = {
  id: string
  email: string
  role: InviteRole
  created_at: string
}

export type InviteResponse = {
  id: string
  email: string
  role: InviteRole
}

export type OnboardingWizardPageProps = {
  currentUser: CurrentUser
  initialCompany: OnboardingCompany
  onCompleted: () => void
  onAuthenticationExpired: () => void
}

export type OnboardingStep = 1 | 2 | 3 | 4

export type OnboardingStepStatus = 'inactive' | 'active' | 'completed'

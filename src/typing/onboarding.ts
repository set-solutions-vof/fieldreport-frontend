import type { CurrentUser } from '@/typing/auth'

export type OnboardingCompany = {
  id: string
  name: string
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

export type InviteCreatedResponse = {
  id: string
  email: string
  role: InviteRole
  is_accepted: boolean
  created_at: string
  expires_at: string
}

export type InviteResponse = {
  id: string
  email: string
  role: InviteRole
  is_accepted: boolean
  created_at: string
  expires_at: string
}

export type OnboardingWizardPageProps = {
  currentUser: CurrentUser
  initialCompany: OnboardingCompany
  onCompleted: () => void
  onAuthenticationExpired: () => void
  onLogout: () => void
}

export type OnboardingStep = 1 | 2 | 3

export type OnboardingStepStatus = 'inactive' | 'active' | 'completed'

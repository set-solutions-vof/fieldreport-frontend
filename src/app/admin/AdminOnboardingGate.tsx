import { OnboardingStateScreen } from '@/features/onboarding/components/OnboardingStateScreen'
import { OnboardingWizardPage } from '@/features/onboarding/pages/OnboardingWizardPage'
import { useAdminOnboardingGate } from '@/features/onboarding/hooks/useAdminOnboardingGate'
import type { AdminOnboardingGateProps } from '@/types/routes'
import { AdminRouter } from './AdminRouter'

export function AdminOnboardingGate({
  currentUser,
  onAuthenticationExpired,
}: AdminOnboardingGateProps) {
  const { status, company, retry, completeOnboarding } = useAdminOnboardingGate(
    {
      onAuthenticationExpired,
    },
  )

  if (status === 'error') {
    return <OnboardingStateScreen kind="error" onRetry={retry} />
  }

  if (status === 'loading') {
    return <OnboardingStateScreen kind="loading" />
  }

  if (!company!.onboarding_completed) {
    return (
      <OnboardingWizardPage
        currentUser={currentUser}
        initialCompany={company!}
        onCompleted={completeOnboarding}
        onAuthenticationExpired={onAuthenticationExpired}
      />
    )
  }

  return <AdminRouter onAuthenticationExpired={onAuthenticationExpired} />
}

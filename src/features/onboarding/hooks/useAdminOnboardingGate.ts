import { useCallback, useEffect, useState } from 'react'
import { onboardingRoute } from '@/app/routes'
import { getOnboardingCompany } from '@/lib/api/onboarding'
import { AuthenticationExpiredError } from '@/lib/api/authenticatedFetch'
import type { OnboardingCompany } from '@/types/onboarding'
import type { UseAdminOnboardingGateParameters } from '@/types/onboardingView'

type AdminOnboardingGateStatus = 'loading' | 'ready' | 'error'

export function useAdminOnboardingGate({
  onAuthenticationExpired,
}: UseAdminOnboardingGateParameters) {
  const [status, setStatus] = useState<AdminOnboardingGateStatus>('loading')
  const [company, setCompany] = useState<OnboardingCompany | null>(null)

  const loadCompany = useCallback((): void => {
    void getOnboardingCompany()
      .then((loadedCompany) => {
        setCompany(loadedCompany)
        setStatus('ready')

        if (!loadedCompany.onboarding_completed) {
          window.history.replaceState(null, '', onboardingRoute)
        }
      })
      .catch((error: unknown) => {
        if (error instanceof AuthenticationExpiredError) {
          onAuthenticationExpired()
          return
        }

        setStatus('error')
      })
  }, [onAuthenticationExpired])

  useEffect(() => {
    loadCompany()
  }, [loadCompany])

  function retry(): void {
    setStatus('loading')
    loadCompany()
  }

  function completeOnboarding(): void {
    setCompany((currentCompany) =>
      currentCompany === null
        ? null
        : { ...currentCompany, onboarding_completed: true },
    )
  }

  return {
    status,
    company,
    retry,
    completeOnboarding,
  }
}

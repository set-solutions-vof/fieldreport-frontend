import type { ReactNode } from 'react'
import { Button, Spinner } from '@/design-system'
import { translations } from '@/lib/translations'
import type { OnboardingStateScreenProps } from '@/types/onboardingView'

export function OnboardingStateScreen(props: OnboardingStateScreenProps) {
  if (props.kind === 'loading') {
    return (
      <OnboardingStatePage>
        <Spinner size="lg" />
      </OnboardingStatePage>
    )
  }

  return (
    <OnboardingStatePage>
      <h1>{translations.onboarding.states.load_failed_title}</h1>
      {props.message != null && <p>{props.message}</p>}
      <Button type="button" variant="primary" onClick={props.onRetry}>
        {translations.onboarding.states.retry}
      </Button>
    </OnboardingStatePage>
  )
}

function OnboardingStatePage({ children }: { children: ReactNode }) {
  return (
    <main className="fr-onboarding-loading-page">
      <div className="fr-onboarding-state">{children}</div>
    </main>
  )
}

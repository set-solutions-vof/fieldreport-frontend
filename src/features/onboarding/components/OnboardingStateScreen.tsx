import type { ReactNode } from 'react'
import { Button, Spinner } from '@set-solutions-vof/design-system'
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
    <main className="min-h-[100dvh] [background:var(--fr-background)] flex items-center justify-center">
      <div className="flex items-center justify-center flex-col [gap:var(--fr-space-4)] [color:var(--fr-text-secondary)] [&_h1]:[margin:var(--fr-space-0)] [&_p]:[margin:var(--fr-space-0)] [&_h1]:[font-size:var(--fr-text-xl)] [&_h1]:[line-height:var(--fr-leading-snug)] [&_h1]:[color:var(--fr-text-primary)]">{children}</div>
    </main>
  )
}

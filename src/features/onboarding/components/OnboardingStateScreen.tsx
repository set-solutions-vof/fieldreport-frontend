import type { ReactNode } from 'react'
import { Button, Spinner } from '@set-solutions-vof/design-system'
import { PageHeader } from '@/components/PageHeader'
import { translations } from '@/lib/translations'
import type { OnboardingStateScreenProps } from '@/typing/onboardingView'

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
      <PageHeader
        title={translations.onboarding.states.load_failed_title}
        metadata={props.message}
      />
      <Button type="button" variant="primary" onClick={props.onRetry}>
        {translations.onboarding.states.retry}
      </Button>
    </OnboardingStatePage>
  )
}

function OnboardingStatePage({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-[100dvh] [background:var(--fr-background)] flex items-center justify-center">
      <div className="flex items-center justify-center flex-col [color:var(--fr-text-secondary)] text-center">
        {children}
      </div>
    </main>
  )
}

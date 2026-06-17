import { Button, Spinner } from '@set-solutions-vof/design-system'
import { PageHeader } from '@/components/PageHeader'
import { translations } from '@/lib/translations'
import type { ShellContentErrorProps } from '@/typing/shellContent'

export function ShellContentLoader() {
  return (
    <div className="flex flex-1 items-start [padding:var(--fr-space-7)]">
      <Spinner size="lg" />
    </div>
  )
}

export function ShellContentError({
  title,
  message,
  onRetry,
}: ShellContentErrorProps) {
  return (
    <div className="flex flex-1 flex-col items-start [gap:var(--fr-space-4)] [padding:var(--fr-space-7)]">
      <PageHeader title={title} metadata={message} />
      <Button type="button" variant="primary" onClick={onRetry}>
        {translations.dashboard.states.retry_button}
      </Button>
    </div>
  )
}

import { Button } from '@set-solutions-vof/design-system'
import { translations } from '@/lib/translations'
import type { TemplateFailedStateProps } from '@/types/templateView'
import { TemplateIcon } from './icons/TemplateIcon'

export function TemplateFailedState({
  errorMessage,
  onTryAgain,
}: TemplateFailedStateProps) {
  return (
    <section className="flex flex-1 flex-col items-center justify-center [gap:var(--fr-space-5)] box-border [padding:var(--fr-space-6)] text-center [&_h1]:[margin:var(--fr-space-0)] [&_h1]:[font-size:var(--fr-text-xl)] [&_h1]:[font-weight:var(--fr-weight-semibold)] [&_h1]:[line-height:var(--fr-leading-snug)] [&_h1]:[color:var(--fr-text-primary)] [&_p]:[max-width:calc(var(--fr-space-16)_+_var(--fr-space-12))] [&_p]:[margin:var(--fr-space-0)] [&_p]:[font-size:var(--fr-text-base)] [&_p]:[line-height:var(--fr-leading-relaxed)] [&_p]:[color:var(--fr-text-secondary)]">
      <TemplateIcon name="documentDashed" className="[width:calc(var(--fr-space-6)_-_var(--fr-space-1))] [height:calc(var(--fr-space-6)_-_var(--fr-space-1))] [color:var(--fr-text-tertiary)] [stroke-width:1.4]" />
      <h1>{translations.template.failed.title}</h1>
      <p>{errorMessage}</p>
      <Button
        variant="primary"
        size="lg"
        leadingIcon={
          <TemplateIcon name="upload" className="block [width:var(--fr-space-4)] [height:var(--fr-space-4)] [stroke-width:1.6]" />
        }
        onClick={onTryAgain}
      >
        {translations.template.failed.try_again_button}
      </Button>
    </section>
  )
}

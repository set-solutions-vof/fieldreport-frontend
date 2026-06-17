import { Button } from '@set-solutions-vof/design-system'
import { PageHeader } from '@/components/PageHeader'
import { translations } from '@/lib/translations'
import type { TemplateFailedStateProps } from '@/types/templateView'
import { TemplateIcon } from './icons/TemplateIcon'

export function TemplateFailedState({
  errorMessage,
  onTryAgain,
}: TemplateFailedStateProps) {
  return (
    <section className="flex flex-1 flex-col items-center justify-center [gap:var(--fr-space-5)] box-border [padding:var(--fr-space-6)] text-center">
      <TemplateIcon
        name="documentDashed"
        className="[width:calc(var(--fr-space-6)_-_var(--fr-space-1))] [height:calc(var(--fr-space-6)_-_var(--fr-space-1))] [color:var(--fr-text-tertiary)] [stroke-width:1.4]"
      />
      <div className="[max-width:calc(var(--fr-space-16)_+_var(--fr-space-12))]">
        <PageHeader
          title={translations.template.failed.title}
          metadata={errorMessage}
        />
      </div>
      <Button
        variant="primary"
        size="lg"
        leadingIcon={
          <TemplateIcon
            name="upload"
            className="block [width:var(--fr-space-4)] [height:var(--fr-space-4)] [stroke-width:1.6]"
          />
        }
        onClick={onTryAgain}
      >
        {translations.template.failed.try_again_button}
      </Button>
    </section>
  )
}

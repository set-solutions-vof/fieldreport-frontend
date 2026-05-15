import { Button } from '@/design-system'
import { translations } from '@/lib/translations'
import type { TemplateFailedStateProps } from '../types/templateView'
import { TemplateIcon } from './TemplateIcon'

export function TemplateFailedState({
  errorMessage,
  onTryAgain,
}: TemplateFailedStateProps) {
  return (
    <section className="fr-template-empty">
      <TemplateIcon name="documentDashed" className="fr-template-empty__icon" />
      <h1>{translations.template.failed.title}</h1>
      <p>{errorMessage}</p>
      <Button
        variant="primary"
        size="lg"
        leadingIcon={
          <TemplateIcon name="upload" className="fr-template-button-icon" />
        }
        onClick={onTryAgain}
      >
        {translations.template.failed.try_again_button}
      </Button>
    </section>
  )
}

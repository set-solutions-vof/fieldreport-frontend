import { Button } from '@/design-system'
import { translations } from '@/lib/translations'
import type { TemplateEmptyStateProps } from '../types/templateView'
import { templateTypeMeta } from '../lib/templateMeta'
import { TemplateIcon } from './TemplateIcon'
import { TemplateTypePill } from './TemplateTypePill'

export function TemplateEmptyState({
  onUploadReports,
}: TemplateEmptyStateProps) {
  return (
    <section className="fr-template-empty">
      <TemplateIcon name="documentDashed" className="fr-template-empty__icon" />
      <h1>{translations.template.empty.title}</h1>
      <p>{translations.template.empty.description}</p>
      <Button
        variant="primary"
        size="lg"
        leadingIcon={
          <TemplateIcon name="upload" className="fr-template-button-icon" />
        }
        onClick={onUploadReports}
      >
        {translations.template.empty.upload_button}
      </Button>
      <div className="fr-template-empty__extract">
        <span>{translations.template.empty.extract_label}</span>
        <div className="fr-template-empty__pills">
          {Object.keys(templateTypeMeta).map((type) => (
            <TemplateTypePill
              key={type}
              type={type as keyof typeof templateTypeMeta}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

import type { TemplateSectionType } from '@/types/template'
import { templateTypeMeta } from '../lib/templateMeta'
import { TemplateIcon } from './TemplateIcon'

type TemplateTypePillProps = {
  type: TemplateSectionType
}

export function TemplateTypePill({ type }: TemplateTypePillProps) {
  const meta = templateTypeMeta[type]

  return (
    <span className="fr-template-type-pill">
      <TemplateIcon name={meta.icon} className="fr-template-type-pill__icon" />
      {meta.label}
    </span>
  )
}

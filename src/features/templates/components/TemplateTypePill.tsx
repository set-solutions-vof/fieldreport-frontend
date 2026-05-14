import { templateTypeMeta } from '../lib/templateMeta'
import type { TemplateTypePillProps } from '../types/templateView'
import { TemplateIcon } from './TemplateIcon'

export function TemplateTypePill({ type }: TemplateTypePillProps) {
  const meta = templateTypeMeta[type]

  return (
    <span className="fr-template-type-pill">
      <TemplateIcon name={meta.icon} className="fr-template-type-pill__icon" />
      {meta.label}
    </span>
  )
}

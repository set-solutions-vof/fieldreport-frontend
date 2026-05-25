import type { TemplateFieldChipProps } from '@/types/templateView'
import { TemplateIcon } from './icons/TemplateIcon'

export function TemplateFieldChip({
  children,
  neutral = false,
  onRemove,
  removeLabel,
}: TemplateFieldChipProps) {
  return (
    <span
      className={[
        'fr-template-field-chip',
        neutral && 'fr-template-field-chip--neutral',
        onRemove && 'fr-template-field-chip--removable',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
      {onRemove && (
        <button
          type="button"
          className="fr-template-field-chip__remove"
          aria-label={removeLabel}
          onClick={onRemove}
        >
          <TemplateIcon name="x" className="fr-template-field-chip__icon" />
        </button>
      )}
    </span>
  )
}

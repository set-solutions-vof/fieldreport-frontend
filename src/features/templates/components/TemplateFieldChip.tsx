import type { TemplateFieldChipProps } from '../types/templateView'

export function TemplateFieldChip({
  children,
  neutral = false,
}: TemplateFieldChipProps) {
  return (
    <span
      className={[
        'fr-template-field-chip',
        neutral && 'fr-template-field-chip--neutral',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </span>
  )
}

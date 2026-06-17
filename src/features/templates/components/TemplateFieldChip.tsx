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
        'inline-flex [height:var(--fr-space-5)] items-center [gap:var(--fr-space-1)] [padding:var(--fr-space-0)_var(--fr-space-2)] [border-radius:var(--fr-radius-full)] [background:var(--fr-accent-soft)] [color:var(--fr-color-accent-800)] [font-size:var(--fr-text-xs)] [font-weight:var(--fr-weight-medium)] [line-height:var(--fr-leading-tight)]',
        neutral && '[color:var(--fr-text-tertiary)] [background:var(--fr-color-neutral-100)]',
        onRemove && '[padding-right:var(--fr-space-1)]',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
      {onRemove && (
        <button
          type="button"
          className="inline-flex items-center justify-center [width:var(--fr-space-4)] [height:var(--fr-space-4)] [padding:var(--fr-space-0)] [color:inherit] cursor-pointer bg-transparent border-0 [border-radius:var(--fr-radius-full)] hover:[background:color-mix(in_oklch,_currentColor_12%,_transparent)] hover:outline-none focus-visible:[background:color-mix(in_oklch,_currentColor_12%,_transparent)] focus-visible:outline-none"
          aria-label={removeLabel}
          onClick={onRemove}
        >
          <TemplateIcon name="x" className="block [width:var(--fr-space-4)] [height:var(--fr-space-4)] [stroke-width:1.6]" />
        </button>
      )}
    </span>
  )
}

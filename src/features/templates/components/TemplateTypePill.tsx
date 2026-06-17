import { getTemplateTypeMeta } from '../lib/templateMeta'
import type { TemplateTypePillProps } from '@/types/templateView'
import { TemplateIcon } from './icons/TemplateIcon'

export function TemplateTypePill({ type }: TemplateTypePillProps) {
  const meta = getTemplateTypeMeta(type)

  return (
    <span className="inline-flex [width:fit-content] [height:calc(var(--fr-space-5)_-_var(--fr-space-1)_/_2)] items-center [gap:calc(var(--fr-space-2)_-_var(--fr-space-1)_/_2)] self-start [padding:var(--fr-space-0)_var(--fr-space-3)] [border-radius:var(--fr-radius-full)] [background:var(--fr-color-neutral-100)] [color:var(--fr-text-secondary)] [font-size:var(--fr-text-xs)] [font-weight:var(--fr-weight-medium)] [line-height:var(--fr-leading-tight)]">
      <TemplateIcon name={meta.icon} className="block [width:var(--fr-space-4)] [height:var(--fr-space-4)] [stroke-width:1.6] [width:var(--fr-space-3)] [height:var(--fr-space-3)] [color:var(--fr-text-tertiary)]" />
      {meta.label}
    </span>
  )
}

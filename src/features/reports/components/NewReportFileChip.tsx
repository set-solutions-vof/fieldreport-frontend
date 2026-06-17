import type { ReactElement } from 'react'
import type { FileChipProps } from '@/types/newReportView'

export function FileChip({ file, onRemove }: FileChipProps): ReactElement {
  return (
    <span className="inline-flex items-center [gap:var(--fr-space-1)] [max-width:var(--fr-space-13)] [padding:calc(var(--fr-space-1)_/_2)_var(--fr-space-2)] [color:var(--fr-text-secondary)] [background:var(--fr-surface-sunken)] [border:var(--fr-border-width-sm)_solid_var(--fr-border)] [border-radius:var(--fr-radius-full)] [font-size:var(--fr-text-xs)]">
      <span className="overflow-hidden text-ellipsis whitespace-nowrap">{file.name}</span>
      <button
        type="button"
        className="shrink-0 [padding:var(--fr-space-0)] [color:var(--fr-text-tertiary)] cursor-pointer bg-transparent [border:none] [font-size:var(--fr-text-sm)] [line-height:var(--fr-leading-tight)] hover:[color:var(--fr-text-primary)]"
        onClick={(event) => {
          event.stopPropagation()
          onRemove(file.name)
        }}
        aria-label={`${file.name} verwijderen`}
      >
        ×
      </button>
    </span>
  )
}

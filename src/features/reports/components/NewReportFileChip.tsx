import type { ReactElement } from 'react'
import type { FileChipProps } from '@/types/newReportView'
import './NewReportFileChip.css'

export function FileChip({ file, onRemove }: FileChipProps): ReactElement {
  return (
    <span className="fr-file-chip">
      <span className="fr-file-chip__name">{file.name}</span>
      <button
        type="button"
        className="fr-file-chip__remove"
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

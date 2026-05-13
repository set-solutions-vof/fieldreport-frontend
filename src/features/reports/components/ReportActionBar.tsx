import { Button } from '@/design-system'
import { saveStatusLabel } from '../lib/reportDetailView'
import type { ReportActionBarProps } from '../types/reportDetailView'

export function ReportActionBar({
  dirtyCount,
  saveStatus,
}: ReportActionBarProps) {
  return (
    <div className="fr-report-action-bar">
      <div className="fr-report-action-bar-status">
        <span>{saveStatusLabel(saveStatus, dirtyCount)}</span>
      </div>
      <div className="fr-report-action-bar-actions">
        <Button
          type="button"
          variant="primary"
          disabled
          title="Komt binnenkort"
        >
          Voorbeeld PDF
        </Button>
      </div>
    </div>
  )
}

import { Button } from '@/design-system'
import { translations } from '@/lib/translations'
import { saveStatusLabel } from '../lib/reportDetailView'
import type { ReportActionBarProps } from '@/types/reportDetailView'

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
          title={translations.report_detail.action_bar.coming_soon}
        >
          {translations.report_detail.action_bar.pdf_button}
        </Button>
      </div>
    </div>
  )
}

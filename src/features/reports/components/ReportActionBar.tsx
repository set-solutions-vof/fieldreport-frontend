import { Button } from '@set-solutions-vof/design-system'
import { translations } from '@/lib/translations'
import { saveStatusLabel } from '../lib/reportDetailView'
import type { ReportActionBarProps } from '@/types/reportDetailView'

export function ReportActionBar({
  dirtyCount,
  saveStatus,
}: ReportActionBarProps) {
  return (
    <div className="sticky [bottom:var(--fr-space-0)] [z-index:5] flex items-center justify-between [gap:var(--fr-space-4)] [padding:var(--fr-space-3)_var(--fr-space-7)] [border-top:1px_solid_var(--fr-border)] [background:color-mix(in_oklch,_var(--fr-background)_85%,_transparent)] [backdrop-filter:blur(8px)]">
      <div className="flex items-center [gap:var(--fr-space-4)] [font-size:var(--fr-text-sm)] [line-height:var(--fr-leading-normal)] [color:var(--fr-text-secondary)]">
        <span>{saveStatusLabel(saveStatus, dirtyCount)}</span>
      </div>
      <div className="flex items-center [gap:var(--fr-space-2)]">
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

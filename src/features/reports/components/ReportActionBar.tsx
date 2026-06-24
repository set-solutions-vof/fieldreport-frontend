import { useState } from 'react'
import { Button } from '@set-solutions-vof/design-system'
import { translations } from '@/lib/translations'
import { saveStatusLabel } from '../lib/reportDetailView'
import { exportReport } from '@/lib/api/reports'
import type { ReportActionBarProps } from '@/typing/reportDetailView'

export function ReportActionBar({
  dirtyCount,
  saveStatus,
  reportId,
  allSectionsApproved,
}: ReportActionBarProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [exportError, setExportError] = useState<string | null>(null)

  const handleExport = async () => {
    setIsExporting(true)
    setExportError(null)
    try {
      const blob = await exportReport(reportId)
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `rapport-${reportId}.pdf`
      a.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      setExportError(err instanceof Error ? err.message : 'Export mislukt')
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="sticky [bottom:var(--fr-space-0)] [z-index:5] flex items-center justify-between [gap:var(--fr-space-4)] [padding:var(--fr-space-3)_var(--fr-space-5)] [border-top:1px_solid_var(--fr-border)] [background:color-mix(in_oklch,_var(--fr-background)_85%,_transparent)] [backdrop-filter:blur(8px)]">
      <div className="flex items-center [gap:var(--fr-space-4)] [font-size:var(--fr-text-sm)] [line-height:var(--fr-leading-normal)] [color:var(--fr-text-secondary)]">
        <span>{saveStatusLabel(saveStatus, dirtyCount)}</span>
        {exportError && (
          <span className="[color:var(--fr-error)]">{exportError}</span>
        )}
      </div>
      <div className="flex items-center [gap:var(--fr-space-2)]">
        <Button
          type="button"
          variant="primary"
          disabled={!allSectionsApproved || isExporting}
          title={!allSectionsApproved ? translations.report_detail.action_bar.coming_soon : undefined}
          onClick={handleExport}
        >
          {isExporting ? 'Exporteren…' : translations.report_detail.action_bar.pdf_button}
        </Button>
      </div>
    </div>
  )
}

import { Card } from '@set-solutions-vof/design-system'
import { translations } from '@/lib/translations'
import type {
  EvidenceRailItem,
  ReportDetailTab,
} from '@/typing/reportDetailView'
import { formatDuration } from '../lib/formatDuration'
import {
  evidenceTypeLabel,
  evidenceTypeIconType,
  truncateSummary,
} from '../lib/reportDetailView'
import { reportDetailViewClassName } from '../lib/reportDetailClassNames'
import { EvidenceTypeIcon } from './icons/EvidenceTypeIcon'
import { InspectionPhoto } from './InspectionPhoto'

type ReportEvidenceViewProps = {
  activeTab: ReportDetailTab
  items: EvidenceRailItem[]
}

export function ReportEvidenceView({
  activeTab,
  items,
}: ReportEvidenceViewProps) {
  return (
    <div
      className={reportDetailViewClassName(activeTab, 'evidence')}
      id="view-evidence"
      role="tabpanel"
    >
      <div className="grid [gap:var(--fr-space-4)] [padding:var(--fr-space-6)_var(--fr-space-7)_var(--fr-space-10)] [grid-template-columns:repeat(auto-fill,_minmax(280px,_1fr))]">
        {items.length === 0 ? (
          <Card padding="md">
            <p className="[margin:var(--fr-space-0)] [font-size:var(--fr-text-base)] [line-height:var(--fr-leading-normal)] [color:var(--fr-text-secondary)]">
              {translations.report_detail.evidence.empty}
            </p>
          </Card>
        ) : (
          items.map((evidenceRailItem) => (
            <Card
              key={evidenceRailItem.id}
              padding="md"
              className="grid [gap:var(--fr-space-3)]"
            >
              <div className="flex items-center justify-between [gap:var(--fr-space-3)]">
                <span className="inline-flex items-center [gap:var(--fr-space-2)] [font-size:var(--fr-text-sm)] [font-weight:var(--fr-weight-medium)] [color:var(--fr-text-primary)]">
                  <EvidenceTypeIcon
                    type={evidenceTypeIconType(
                      evidenceRailItem.evidenceItem.evidence_type,
                    )}
                    size={14}
                  />
                  {evidenceTypeLabel(
                    evidenceRailItem.evidenceItem.evidence_type,
                  )}
                </span>
                {evidenceRailItem.evidenceItem.evidence_type ===
                  'transcription_segment' && (
                  <span className="[font-size:var(--fr-text-xs)] [font-variant-numeric:tabular-nums] [color:var(--fr-text-tertiary)]">
                    {evidenceTimeRange(evidenceRailItem)}
                  </span>
                )}
              </div>

              {evidenceRailItem.evidenceItem.storage_key && (
                <InspectionPhoto
                  storageKey={evidenceRailItem.evidenceItem.storage_key}
                  alt={evidenceRailItem.evidenceItem.content_summary}
                  className="w-full [border-radius:var(--fr-radius-md)] object-cover [aspect-ratio:4_/_3] [background:var(--fr-surface-active)]"
                />
              )}

              <p className="[margin:var(--fr-space-0)] [font-size:var(--fr-text-sm)] [line-height:var(--fr-leading-normal)] [color:var(--fr-text-secondary)]">
                {truncateSummary(
                  evidenceRailItem.evidenceItem.content_summary ||
                    translations.report_detail.evidence_rail
                      .fallback_source_title,
                  500,
                )}
              </p>

              <p className="[margin:var(--fr-space-0)] [font-size:var(--fr-text-xs)] [line-height:var(--fr-leading-normal)] [color:var(--fr-text-tertiary)]">
                {translations.report_detail.evidence_rail.sections_label}:{' '}
                <strong>{evidenceRailItem.sectionLabels.join(', ')}</strong>
              </p>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

function evidenceTimeRange(evidenceRailItem: EvidenceRailItem): string {
  const evidenceItem = evidenceRailItem.evidenceItem

  if (evidenceItem.evidence_type !== 'transcription_segment') {
    return ''
  }

  const startSeconds =
    evidenceItem.start_seconds ?? evidenceItem.timeline_seconds ?? 0
  const endSeconds = evidenceItem.end_seconds

  if (endSeconds === null) {
    return formatDuration(startSeconds)
  }

  return `${formatDuration(startSeconds)} – ${formatDuration(endSeconds)}`
}

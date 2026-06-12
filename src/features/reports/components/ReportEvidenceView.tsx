import { Card } from '@/design-system'
import { translations } from '@/lib/translations'
import type {
  EvidenceRailItem,
  ReportDetailTab,
} from '@/types/reportDetailView'
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
      <div className="fr-report-evidence-view">
        {items.length === 0 ? (
          <Card padding="md">
            <p className="fr-report-detail-empty">
              {translations.report_detail.evidence.empty}
            </p>
          </Card>
        ) : (
          items.map((evidenceRailItem) => (
            <Card
              key={evidenceRailItem.id}
              padding="md"
              className="fr-report-evidence-card"
            >
              <div className="fr-report-evidence-card-head">
                <span className="fr-report-evidence-card-type">
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
                <span className="fr-report-evidence-card-time">
                  {evidenceTimeRange(evidenceRailItem)}
                </span>
              </div>

              {evidenceRailItem.evidenceItem.storage_key && (
                <InspectionPhoto
                  storageKey={evidenceRailItem.evidenceItem.storage_key}
                  alt={evidenceRailItem.evidenceItem.content_summary}
                  className="fr-report-evidence-card-image"
                />
              )}

              <p className="fr-report-evidence-card-summary">
                {truncateSummary(
                  evidenceRailItem.evidenceItem.content_summary ||
                    translations.report_detail.evidence_rail
                      .fallback_source_title,
                  500,
                )}
              </p>

              <p className="fr-report-evidence-card-sections">
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

  if (evidenceItem.evidence_type === 'transcription_segment') {
    const startSeconds =
      evidenceItem.start_seconds ?? evidenceItem.timeline_seconds
    const endSeconds = evidenceItem.end_seconds

    if (endSeconds === null) {
      return formatDuration(startSeconds)
    }

    return `${formatDuration(startSeconds)} – ${formatDuration(endSeconds)}`
  }

  return formatDuration(evidenceItem.timeline_seconds)
}

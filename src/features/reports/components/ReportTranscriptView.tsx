import { Card, TranscriptBlock } from '@/design-system'
import { translations } from '@/lib/translations'
import type { ReportEvidenceItem } from '@/types/report'
import type {
  EvidenceRailItem,
  ReportDetailTab,
} from '@/types/reportDetailView'
import { formatDuration } from '../lib/formatDuration'
import { reportDetailViewClassName } from '../lib/reportDetailClassNames'

type ReportTranscriptViewProps = {
  activeTab: ReportDetailTab
  inspectorName: string
  segments: ReportEvidenceItem[]
  evidenceRailItems: EvidenceRailItem[]
}

export function ReportTranscriptView({
  activeTab,
  inspectorName,
  segments,
  evidenceRailItems,
}: ReportTranscriptViewProps) {
  return (
    <div
      className={reportDetailViewClassName(activeTab, 'transcript')}
      id="view-transcript"
      role="tabpanel"
    >
      <div className="fr-report-transcript-view">
        {segments.length === 0 ? (
          <Card padding="md">
            <p className="fr-report-detail-empty">
              {translations.report_detail.transcript.empty}
            </p>
          </Card>
        ) : (
          segments.map((segment) => (
            <TranscriptBlock
              key={segment.id}
              timestamp={segmentTimestamp(segment)}
              speaker={inspectorName}
              tags={sectionLabelsForEvidence(segment.id, evidenceRailItems)}
            >
              {segment.content_summary}
            </TranscriptBlock>
          ))
        )}
      </div>
    </div>
  )
}

function segmentTimestamp(segment: ReportEvidenceItem): string {
  const startSeconds = segment.start_seconds ?? segment.timeline_seconds
  const endSeconds = segment.end_seconds

  if (endSeconds === null) {
    return formatDuration(startSeconds)
  }

  return `${formatDuration(startSeconds)} – ${formatDuration(endSeconds)}`
}

function sectionLabelsForEvidence(
  evidenceItemId: string,
  evidenceRailItems: EvidenceRailItem[],
): string[] {
  return (
    evidenceRailItems.find((item) => item.id === evidenceItemId)
      ?.sectionLabels ?? []
  )
}

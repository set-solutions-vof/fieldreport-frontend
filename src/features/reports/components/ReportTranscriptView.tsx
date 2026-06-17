import { Card, TranscriptBlock } from '@set-solutions-vof/design-system'
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
      <div className="grid [gap:var(--fr-space-4)] [padding:var(--fr-space-6)_var(--fr-space-7)_var(--fr-space-10)]">
        {segments.length === 0 ? (
          <Card padding="md">
            <p className="[margin:var(--fr-space-0)] [font-size:var(--fr-text-base)] [line-height:var(--fr-leading-normal)] [color:var(--fr-text-secondary)]">
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
  const startSeconds = segment.start_seconds ?? segment.timeline_seconds ?? 0
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

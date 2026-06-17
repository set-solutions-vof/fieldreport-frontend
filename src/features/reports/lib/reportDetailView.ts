import { translations } from '@/lib/translations'
import type {
  ReportSectionContent,
  ReportSection as ReportSectionModel,
  ReportEvidenceItem,
  ReportSectionUpdateResponse,
} from '@/types/report'
import type { SaveAllStatus, EvidenceRailItem } from '@/types/reportDetailView'
import { formatDuration } from './formatDuration'

export function allSectionsApproved(sections: ReportSectionModel[]): boolean {
  return sections.length > 0 && sections.every((section) => section.approved)
}

export function sectionContent(
  section: Pick<ReportSectionContent, 'reviewed_content' | 'generated_content'>,
): string {
  return section.reviewed_content ?? section.generated_content
}

export function initialDraftContent(
  sections: ReportSectionModel[],
): Record<string, string> {
  return Object.fromEntries(
    sections.map((section) => [section.id, sectionContent(section)]),
  )
}

export function reportReference(reportId: string): string {
  return `LK-${reportId.slice(0, 8).toUpperCase()}`
}

export function buildEvidenceRailItems(
  sections: ReportSectionModel[],
  evidenceItems: ReportEvidenceItem[],
): EvidenceRailItem[] {
  const sectionsByEvidenceItemId = new Map<string, ReportSectionModel[]>()

  sections.forEach((section) => {
    section.evidence_item_ids.forEach((evidenceItemId) => {
      const linkedSections = sectionsByEvidenceItemId.get(evidenceItemId) ?? []

      linkedSections.push(section)
      sectionsByEvidenceItemId.set(evidenceItemId, linkedSections)
    })
  })

  return evidenceItems
    .filter((evidenceItem) => sectionsByEvidenceItemId.has(evidenceItem.id))
    .map((evidenceItem) => {
      const linkedSections = sectionsByEvidenceItemId.get(evidenceItem.id)!

      return {
        id: evidenceItem.id,
        primarySectionId: linkedSections[0]!.id,
        sectionIds: linkedSections.map((section) => section.id),
        sectionLabels: linkedSections.map((section) => section.label),
        allSectionsApproved: linkedSections.every(
          (section) => section.approved,
        ),
        hasOpenSections: linkedSections.some((section) => !section.approved),
        evidenceItem: evidenceItem,
      }
    })
    .sort(
      (firstItem, secondItem) =>
        (firstItem.evidenceItem.timeline_seconds ?? Number.POSITIVE_INFINITY) -
        (secondItem.evidenceItem.timeline_seconds ?? Number.POSITIVE_INFINITY),
    )
}

export function sourceMomentRailItems(
  items: EvidenceRailItem[],
): EvidenceRailItem[] {
  return items.filter(
    (item) => item.evidenceItem.evidence_type === 'transcription_segment',
  )
}

export function evidenceTimeLabel(evidenceRailItem: EvidenceRailItem): string {
  const timelineSeconds = evidenceRailItem.evidenceItem.timeline_seconds

  if (timelineSeconds === null) {
    return ''
  }

  return formatDuration(timelineSeconds)
}

export function truncateSummary(
  contentSummary: string,
  maxLength = 40,
): string {
  if (contentSummary.length <= maxLength) {
    return contentSummary
  }

  return `${contentSummary.slice(0, maxLength)}...`
}

export function transcriptSegments(
  evidenceItems: ReportEvidenceItem[],
): ReportEvidenceItem[] {
  return evidenceItems
    .filter(
      (evidenceItem) => evidenceItem.evidence_type === 'transcription_segment',
    )
    .sort(
      (firstItem, secondItem) =>
        (firstItem.timeline_seconds ?? 0) - (secondItem.timeline_seconds ?? 0),
    )
}

export function averageConfidenceLabel(sections: ReportSectionModel[]): string {
  const average = averageConfidenceScore(sections)

  if (average === null) {
    return '–'
  }

  return `${Math.round(average * 100)}%`
}

export function averageConfidenceProgress(
  sections: ReportSectionModel[],
): number | null {
  const average = averageConfidenceScore(sections)

  if (average === null) {
    return null
  }

  return average * 100
}

export function saveStatusLabel(
  saveStatus: SaveAllStatus,
  dirtyCount: number,
): string {
  if (saveStatus === 'saving') {
    return translations.report_detail.action_bar.saving
  }

  if (saveStatus === 'error') {
    return translations.report_detail.action_bar.save_failed
  }

  if (dirtyCount === 0) {
    return translations.report_detail.action_bar.saved
  }

  if (dirtyCount === 1) {
    return translations.report_detail.action_bar.one_unsaved_change
  }

  return `${dirtyCount} ${translations.report_detail.action_bar.many_unsaved_changes_suffix}`
}

export function mergeUpdatedSection(
  section: ReportSectionModel,
  updatedSection: ReportSectionUpdateResponse | ReportSectionModel,
): ReportSectionModel {
  const updatedEvidenceItemIds =
    'evidence_item_ids' in updatedSection
      ? updatedSection.evidence_item_ids
      : undefined

  return {
    ...section,
    ...updatedSection,
    evidence_item_ids: updatedEvidenceItemIds ?? section.evidence_item_ids,
  }
}

export function sectionEvidenceChipLabels(
  section: ReportSectionModel,
  evidenceItemsById: Record<string, ReportEvidenceItem>,
): string[] {
  let imageCount = 0

  return section.evidence_item_ids.flatMap((evidenceItemId) => {
    const evidenceItem = evidenceItemsById[evidenceItemId]

    if (!evidenceItem) {
      return []
    }

    if (evidenceItem.evidence_type === 'transcription_segment') {
      const startSeconds =
        evidenceItem.start_seconds ?? evidenceItem.timeline_seconds

      if (startSeconds === null) {
        return []
      }

      return `[${formatDuration(startSeconds)}]`
    }

    imageCount += 1
    return `${translations.report_detail.section.image_label} ${imageCount}`
  })
}

export function evidenceTypeLabel(
  evidenceType: ReportEvidenceItem['evidence_type'],
): string {
  return evidenceType === 'transcription_segment'
    ? translations.report_detail.section.audio_label
    : translations.report_detail.section.image_label
}

export function evidenceTypeIconType(
  evidenceType: ReportEvidenceItem['evidence_type'],
): 'audio' | 'image' {
  return evidenceType === 'transcription_segment' ? 'audio' : 'image'
}

function averageConfidenceScore(sections: ReportSectionModel[]): number | null {
  if (sections.length === 0) {
    return null
  }

  return (
    sections.reduce(
      (totalConfidence, section) => totalConfidence + section.confidence_score,
      0,
    ) / sections.length
  )
}

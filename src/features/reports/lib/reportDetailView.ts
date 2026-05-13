import type {
  ReportSectionBase,
  ReportSection as ReportSectionModel,
  ReportTimelineItem,
  UpdateReportSectionResponse,
} from '@/types/report'
import type { SaveAllStatus, SourceRailItem } from '../types/reportDetailView'
import { formatSeconds } from './formatSeconds'

export function sectionContent(
  section: Pick<ReportSectionBase, 'field_expert_content' | 'ai_draft'>,
): string {
  return section.field_expert_content ?? section.ai_draft
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

export function buildSourceRailItems(
  sections: ReportSectionModel[],
  timelineItems: ReportTimelineItem[],
): SourceRailItem[] {
  const sectionsByTimelineItemId = new Map<string, ReportSectionModel[]>()

  sections.forEach((section) => {
    section.source_item_ids.forEach((sourceItemId) => {
      const linkedSections = sectionsByTimelineItemId.get(sourceItemId) ?? []

      linkedSections.push(section)
      sectionsByTimelineItemId.set(sourceItemId, linkedSections)
    })
  })

  return timelineItems
    .filter((timelineItem) => sectionsByTimelineItemId.has(timelineItem.id))
    .map((timelineItem) => {
      const linkedSections = sectionsByTimelineItemId.get(timelineItem.id)!

      return {
        id: timelineItem.id,
        primarySectionId: linkedSections[0]!.id,
        sectionIds: linkedSections.map((section) => section.id),
        sectionLabels: linkedSections.map((section) => section.label),
        allSectionsApproved: linkedSections.every(
          (section) => section.is_approved,
        ),
        hasOpenSections: linkedSections.some((section) => !section.is_approved),
        timelineItem,
      }
    })
    .sort(
      (firstItem, secondItem) =>
        firstItem.timelineItem.timeline_offset_seconds -
        secondItem.timelineItem.timeline_offset_seconds,
    )
}

export function sourceTimeLabel(sourceRailItem: SourceRailItem): string {
  return formatSeconds(sourceRailItem.timelineItem.timeline_offset_seconds)
}

export function truncateSummary(contentSummary: string): string {
  if (contentSummary.length <= 40) {
    return contentSummary
  }

  return `${contentSummary.slice(0, 40)}...`
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
    return 'Opslaan...'
  }

  if (saveStatus === 'error') {
    return 'Opslaan is mislukt'
  }

  if (dirtyCount === 0) {
    return 'Opgeslagen'
  }

  if (dirtyCount === 1) {
    return '1 wijziging niet opgeslagen'
  }

  return `${dirtyCount} wijzigingen niet opgeslagen`
}

export function mergeUpdatedSection(
  section: ReportSectionModel,
  updatedSection: UpdateReportSectionResponse | ReportSectionModel,
): ReportSectionModel {
  const updatedSourceItemIds =
    'source_item_ids' in updatedSection
      ? updatedSection.source_item_ids
      : undefined

  return {
    ...section,
    ...updatedSection,
    source_item_ids: updatedSourceItemIds ?? section.source_item_ids,
  }
}

export function sectionSourceChipLabels(
  section: ReportSectionModel,
  timelineItemsById: Record<string, ReportTimelineItem>,
): string[] {
  let imageCount = 0

  return section.source_item_ids.flatMap((sourceItemId) => {
    const timelineItem = timelineItemsById[sourceItemId]

    if (!timelineItem) {
      return []
    }

    if (timelineItem.source_type === 'transcription_segment') {
      return `[${formatSeconds(
        timelineItem.start_seconds ?? timelineItem.timeline_offset_seconds,
      )}]`
    }

    imageCount += 1
    return `Foto ${imageCount}`
  })
}

export function sourceTypeLabel(
  sourceType: ReportTimelineItem['source_type'],
): string {
  return sourceType === 'transcription_segment' ? 'Audio' : 'Foto'
}

export function sourceTypeIconType(
  sourceType: ReportTimelineItem['source_type'],
): 'audio' | 'image' {
  return sourceType === 'transcription_segment' ? 'audio' : 'image'
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

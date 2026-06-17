import type { RefObject } from 'react'
import type {
  ReportDetail,
  ReportSection as ReportSectionModel,
  ReportEvidenceItem,
  ReportSectionUpdateResponse,
} from '@/typing/report'

export type ReportDetailTab = 'report' | 'transcript' | 'evidence'
export type EvidenceRailFilter = 'all' | 'open' | 'approved'
export type EvidenceActivationOrigin = 'timeline' | 'evidence-rail'
export type SaveAllStatus = 'idle' | 'saving' | 'saved' | 'error'

export type EvidenceRailItem = {
  id: string
  primarySectionId: string
  sectionIds: string[]
  sectionLabels: string[]
  allSectionsApproved: boolean
  hasOpenSections: boolean
  evidenceItem: ReportEvidenceItem
}

export type ReportDetailWorkspaceProps = {
  report: ReportDetail
}

export type UseReportDraftAutosaveParameters = {
  reportId: string
  initialSections: ReportSectionModel[]
  onSaveSuccess?: () => void
}

export type UseReportDraftAutosaveResult = {
  dirtyCount: number
  draftContent: Record<string, string>
  saveStatus: SaveAllStatus
  sections: ReportSectionModel[]
  handleContentChange: (sectionId: string, content: string) => void
  handleSectionUpdated: (updatedSection: ReportSectionUpdateResponse) => void
}

export type ReportDetailHeaderBlockProps = {
  report: ReportDetail
  reportStatus: ReportDetail['status']
}

export type ReportDetailTabsProps = {
  activeTab: ReportDetailTab
  reportCount: number
  transcriptCount: number
  evidenceCount: number
  onActiveTabChange: (tab: ReportDetailTab) => void
}

export type ReportDetailTabButtonProps = {
  active: boolean
  count: string
  label: string
  tab: ReportDetailTab
  onClick: () => void
}

export type ReportEvidenceRailProps = {
  activeEvidenceItemId: string | null
  filter: EvidenceRailFilter
  items: EvidenceRailItem[]
  onActiveEvidenceItemChange: (evidenceItemId: string) => void
  onFilterChange: (filter: EvidenceRailFilter) => void
}

export type EvidenceFilterChipProps = {
  active: boolean
  label: string
  onClick: () => void
}

export type ReportDocumentProps = {
  activeSectionId: string | null
  draftContent: Record<string, string>
  reportId: string
  reportUpdatedAt: string | null
  sections: ReportSectionModel[]
  evidenceItems: ReportEvidenceItem[]
  onActiveSectionChange: (sectionId: string) => void
  onContentChange: (sectionId: string, content: string) => void
  onSectionUpdated: (updatedSection: ReportSectionUpdateResponse) => void
}

export type DocumentStatusCellProps = {
  label: string
  value: string
  progress: number | null
}

export type ReportActionBarProps = {
  dirtyCount: number
  saveStatus: SaveAllStatus
}

export type ReportStubViewProps = {
  activeTab: ReportDetailTab
  children: string
  tab: ReportDetailTab
}

export type ReportDetailMainViewProps = {
  activeSectionId: string | null
  activeEvidenceItemId: string | null
  activeTab: ReportDetailTab
  draftContent: Record<string, string>
  filter: EvidenceRailFilter
  report: ReportDetail
  reportUpdatedAt: string | null
  sections: ReportSectionModel[]
  evidenceRailItems: EvidenceRailItem[]
  sourceMomentRailItems: EvidenceRailItem[]
  onActiveSectionChange: (sectionId: string) => void
  onContentChange: (sectionId: string, content: string) => void
  onFilterChange: (filter: EvidenceRailFilter) => void
  onSectionUpdated: (updatedSection: ReportSectionUpdateResponse) => void
  onEvidenceRailActivation: (evidenceItemId: string) => void
}

export type UseReportDetailScrollingParameters = {
  activeSectionId: string | null
  activeEvidenceItemId: string | null
  evidenceActivationOriginRef: RefObject<EvidenceActivationOrigin | null>
}

export type ReportSectionProps = {
  section: ReportSectionModel
  reportId: string
  index: number
  content: string
  active: boolean
  evidenceItemsById: Record<string, ReportEvidenceItem>
  onSectionUpdated: (updated: ReportSectionUpdateResponse) => void
  onContentChange: (sectionId: string, content: string) => void
  onActivate: (sectionId: string) => void
}

export type TimelineStripProps = {
  sections: ReportSectionModel[]
  items: EvidenceRailItem[]
  activeEvidenceItemId: string | null
  onActiveEvidenceItemChange: (evidenceItemId: string) => void
}

export type TimelineStripEvent = {
  id: string
  primarySectionId: string
  sectionIds: string[]
  sectionLabels: string[]
  allSectionsApproved: boolean
  timelineSeconds: number
  evidenceType: ReportEvidenceItem['evidence_type']
}

export type TimelineTick = {
  id: string
  label: string
  position: number
  major: boolean
}

export type TimelineStripMetaProps = {
  range: string
  summary: string
}

export type TimelineStripStatsProps = {
  approvedCount: number
  openCount: number
  sectionCount: number
}

export type TimelineStripTrackProps = {
  activeEvidenceItemId: string | null
  durationMs: number
  events: TimelineStripEvent[]
  startTimestampMs: number
  ticks: TimelineTick[]
  trackRef: RefObject<HTMLDivElement | null>
  onActiveEvidenceItemChange: (evidenceItemId: string) => void
}

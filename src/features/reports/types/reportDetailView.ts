import type { CurrentUser } from '@/types/auth'
import type {
  ReportDetail,
  ReportSection as ReportSectionModel,
  ReportTimelineItem,
  UpdateReportSectionResponse,
} from '@/types/report'

export type ReportDetailTab = 'report' | 'transcript' | 'evidence'
export type SourceRailFilter = 'all' | 'open' | 'approved'
export type SaveAllStatus = 'idle' | 'saving' | 'saved' | 'error'

export type SourceRailItem = {
  id: string
  primarySectionId: string
  sectionIds: string[]
  sectionLabels: string[]
  allSectionsApproved: boolean
  hasOpenSections: boolean
  timelineItem: ReportTimelineItem
}

export type ReportDetailWorkspaceProps = {
  report: ReportDetail
  currentUser: CurrentUser
  reportsToValidateCount: number
  totalReportsCount: number
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
  handleSectionUpdated: (updatedSection: UpdateReportSectionResponse) => void
}

export type ReportDetailHeaderBlockProps = {
  report: ReportDetail
}

export type ReportDetailTabsProps = {
  activeTab: ReportDetailTab
  reportCount: number
  evidenceCount: number
  onActiveTabChange: (tab: ReportDetailTab) => void
}

export type ReportDetailTabButtonProps = {
  active: boolean
  count: string
  label: string
  onClick: () => void
}

export type ReportSourceRailProps = {
  activeSourceItemId: string | null
  filter: SourceRailFilter
  items: SourceRailItem[]
  onActiveSourceItemChange: (sourceItemId: string) => void
  onFilterChange: (filter: SourceRailFilter) => void
}

export type SourceFilterChipProps = {
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
  timelineItems: ReportTimelineItem[]
  onActiveSectionChange: (sectionId: string) => void
  onContentChange: (sectionId: string, content: string) => void
  onSectionUpdated: (updatedSection: UpdateReportSectionResponse) => void
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

export type ReportSectionProps = {
  section: ReportSectionModel
  reportId: string
  index: number
  content: string
  active: boolean
  timelineItemsById: Record<string, ReportTimelineItem>
  onSectionUpdated: (updated: UpdateReportSectionResponse) => void
  onContentChange: (sectionId: string, content: string) => void
  onActivate: (sectionId: string) => void
}

export type TimelineStripProps = {
  sections: ReportSectionModel[]
  items: SourceRailItem[]
  activeSourceItemId: string | null
  onActiveSourceItemChange: (sourceItemId: string) => void
}

export type TimelineStripEvent = {
  id: string
  primarySectionId: string
  sectionIds: string[]
  sectionLabels: string[]
  allSectionsApproved: boolean
  timelineOffsetSeconds: number
  sourceType: ReportTimelineItem['source_type']
}

export type TimelineTick = {
  id: string
  label: string
  position: number
  major: boolean
}

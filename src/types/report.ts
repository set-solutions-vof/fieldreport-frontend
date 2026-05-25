import type { TemplateSectionGroup, TemplateSectionType } from './template'

export type ReportStatus = 'generating' | 'draft' | 'approved' | 'failed'
export type TimelineItemSourceType = 'transcription_segment' | 'image_analysis'
export type ReportConfidenceLevel = 'high' | 'medium' | 'low'

export type ReportSummary = {
  id: string
  company_id: string
  status: ReportStatus
  client_name: string
  address: string
  inspection_date: string
  inspector_name: string
}

export type ReportTimelineItem = {
  id: string
  source_type: TimelineItemSourceType
  timeline_offset_seconds: number
  start_seconds: number | null
  end_seconds: number | null
  captured_at: string | null
  content_summary: string
  image_url?: string | null
  thumbnail_url?: string | null
}

export type ReportSectionSource = {
  type: 'audio' | 'image'
  timestamp_start: number | null
  timestamp_end: number | null
  capture_time: string | null
  content_summary: string
}

export type ReportSectionBase = {
  id: string
  section_id: string
  label: string
  ai_draft: string
  field_expert_content: string | null
  confidence_level: ReportConfidenceLevel
  confidence_score: number
  is_approved: boolean
  render_type?: TemplateSectionType
  fields?: string[] | null
  groups?: TemplateSectionGroup[] | null
}

export type ReportSection = ReportSectionBase & {
  source_item_ids: string[]
}

export type UpdateReportSectionResponse = ReportSectionBase & {
  sources: ReportSectionSource[]
}

export type ReportDetail = {
  id: string
  status: ReportStatus
  client_name: string
  address: string
  inspection_date: string
  inspector_name: string
  updated_at: string | null
  sections: ReportSection[]
  timeline_items: ReportTimelineItem[]
}

export type UpdateReportSectionPayload = {
  field_expert_content?: string
  is_approved?: boolean
}

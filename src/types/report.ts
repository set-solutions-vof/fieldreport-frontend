import type { TemplateSectionGroup, TemplateSectionType } from './template'

export type ReportStatus = 'generating' | 'draft' | 'approved' | 'failed'
export type EvidenceItemType = 'transcription_segment' | 'image_analysis'
export type ReportConfidenceLevel = 'high' | 'medium' | 'low'

export type ReportSummary = {
  id: string
  company_id: string
  status: ReportStatus
  metadata: { client_name: string | null; address: string | null }
  inspection_date: string
  inspector_name: string
}

export type ReportEvidenceItem = {
  id: string
  evidence_type: EvidenceItemType
  timeline_seconds: number
  start_seconds: number | null
  end_seconds: number | null
  captured_at: string | null
  content_summary: string
  storage_key: string | null
}

export type ReportEvidenceSource = {
  type: 'audio' | 'image'
  start_seconds: number | null
  end_seconds: number | null
  captured_at: string | null
  content_summary: string
}

export type ReportSectionContent = {
  id: string
  section_id: string
  label: string
  generated_content: string
  reviewed_content: string | null
  confidence_level: ReportConfidenceLevel
  confidence_score: number
  approved: boolean
  render_type?: TemplateSectionType
  fields?: string[] | null
  groups?: TemplateSectionGroup[] | null
}

export type ReportSection = ReportSectionContent & {
  evidence_item_ids: string[]
}

export type ReportSectionUpdateResponse = ReportSectionContent & {
  evidence_sources: ReportEvidenceSource[]
}

export type ReportDetail = {
  id: string
  status: ReportStatus
  metadata: { client_name: string | null; address: string | null }
  inspection_date: string
  inspector_name: string
  updated_at: string | null
  sections: ReportSection[]
  evidence_items: ReportEvidenceItem[]
}

export type ReportSectionUpdatePayload = {
  reviewed_content?: string
  approved?: boolean
}

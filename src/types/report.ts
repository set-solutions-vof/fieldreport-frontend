export type ReportStatus = 'generating' | 'draft' | 'approved' | 'failed'

export type ReportSummary = {
  id: string
  company_id: string
  status: ReportStatus
  client_name: string
  address: string
  inspection_date: string
  inspector_name: string
}

export type SectionSource = {
  type: 'audio' | 'image'
  timestamp_start: number | null
  timestamp_end: number | null
  capture_time: string | null
  content_summary: string
}

export type ReportSection = {
  id: string
  section_key: string
  label: string
  ai_draft: string
  field_expert_content: string | null
  confidence_level: 'high' | 'medium' | 'low'
  confidence_score: number
  is_approved: boolean
  sources: SectionSource[]
}

export type ReportDetail = {
  id: string
  status: ReportStatus
  client_name: string
  address: string
  inspection_date: string
  inspector_name: string
  sections: ReportSection[]
}

export type UpdateReportSectionPayload = {
  field_expert_content?: string
  is_approved?: boolean
}

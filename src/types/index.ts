export type ReportStatus = 'generating' | 'draft' | 'approved' | 'failed'

export type SectionSource = {
  type: 'audio' | 'image'
  timestamp_start?: number
  timestamp_end?: number
  capture_time?: string
  content_summary: string
}

export type ReportSection = {
  id: string
  section_key: string
  label: string
  ai_draft: string
  field_expert_content: string
  is_approved: boolean
  sources: SectionSource[]
}

export type Report = {
  id: string
  status: ReportStatus
  client_name: string | null
  address: string | null
  inspection_date: string
  inspector_name: string
  sections: ReportSection[]
}

export type User = {
  id: string
  role: 'admin' | 'inspector'
  company_id: string
}

export type LoginResponse = {
  access_token: string
  refresh_token: string
  token_type: string
}

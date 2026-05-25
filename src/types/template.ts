export type TemplateSectionType =
  | 'text_block'
  | 'key_value_table'
  | 'measurement_table'
  | 'photo_grid'

export type TemplateSectionGroup = {
  id: string
  label: string
  fields: string[]
}

export type TemplateSection = {
  id: string
  label: string
  order: number
  render_type: TemplateSectionType
  fields: string[] | null
  found_in?: number
  groups?: TemplateSectionGroup[] | null
}

export type TemplateStatusResponse =
  | {
      status: 'not_configured'
    }
  | {
      status: 'extracting'
      jobId: string
      reports_count: number
    }
  | {
      status: 'pending_review'
      job_id: string
      sections: TemplateSection[]
      reports_count: number
    }
  | {
      status: 'active'
      sections: TemplateSection[]
      reports_count: number
    }
  | {
      status: 'failed'
      reports_count: number
      error_message: string
    }

export type ConfirmTemplatePayload = {
  sections: TemplateSection[]
}

export type TemplateSectionWire = {
  id: string
  label: string
  order?: number
  render_type?: TemplateSectionType
  type?: TemplateSectionType
  fields?: string[] | null
  found_in?: number
  groups?: TemplateSectionGroup[] | null
}

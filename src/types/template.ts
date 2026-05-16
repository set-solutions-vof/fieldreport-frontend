export type TemplateSectionType =
  | 'text_block'
  | 'key_value_table'
  | 'measurement_table'
  | 'photo_grid'

export type TemplateSection = {
  id: string
  key: string
  label: string
  order: number
  render_type: TemplateSectionType
  fields: string[] | null
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

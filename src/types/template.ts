export type TemplateSectionType =
  | 'text_block'
  | 'key_value_table'
  | 'measurement_table'
  | 'photo_grid'

export type TemplateSection = {
  id: string
  label: string
  type: TemplateSectionType
  fields?: string[]
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
      sections: TemplateSection[]
      reports_count: number
    }
  | {
      status: 'active'
      sections: TemplateSection[]
      reports_count: number
    }

export type ConfirmTemplatePayload = {
  sections: TemplateSection[]
}

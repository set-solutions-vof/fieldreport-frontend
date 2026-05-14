export type TemplateSectionType = 'text' | 'kv' | 'measure' | 'photo'

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

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
      status: 'processing'
      job_id: string
      source_reports_count: number
    }
  | {
      status: 'pending_review'
      job_id: string
      metadata_fields: MetadataField[]
      sections: TemplateSection[]
      source_reports_count: number
    }
  | {
      status: 'active'
      metadata_fields: MetadataField[]
      sections: TemplateSection[]
      source_reports_count: number
    }
  | {
      status: 'failed'
      source_reports_count: number
      failure_message: string
    }

export type ConfirmTemplatePayload = {
  metadata_fields: MetadataField[]
  sections: TemplateSection[]
}

export type TemplateSectionWire = {
  id: string
  label: string
  order?: number
  render_type?: TemplateSectionType
  fields?: string[] | null
  found_in?: number
  groups?: TemplateSectionGroup[] | null
}

export type MetadataField = {
  key: string
  label: string
  type: 'text' | 'select' | 'date' | 'phone' | 'email' | 'boolean'
  options?: string[]
  required: boolean
}

export type ActiveTemplate = Extract<
  TemplateStatusResponse,
  { status: 'active' }
>

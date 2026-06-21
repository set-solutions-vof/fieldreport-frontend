import type { TemplateStatusResponse } from '@/typing/template'
import type { TemplatePageState } from '@/typing/templateConfiguration'

export function pageStateFromTemplateStatus(
  templateStatus: TemplateStatusResponse,
  files: File[] = [],
): TemplatePageState {
  if (templateStatus.status === 'not_configured') {
    return { kind: 'empty' }
  }

  if (templateStatus.status === 'processing') {
    return {
      kind: 'processing',
      files,
      job_id: templateStatus.job_id,
      reportsCount: templateStatus.source_reports_count,
    }
  }

  if (templateStatus.status === 'pending_review') {
    return {
      kind: 'preview',
      job_id: templateStatus.job_id,
      metadataFields: templateStatus.metadata_fields,
      sections: templateStatus.sections,
      reportsCount: templateStatus.source_reports_count,
    }
  }

  if (templateStatus.status === 'failed') {
    return {
      kind: 'failed',
      errorMessage: templateStatus.failure_message,
      reportsCount: templateStatus.source_reports_count,
    }
  }

  return {
    kind: 'approved',
    metadataFields: templateStatus.metadata_fields,
    sections: templateStatus.sections,
    reportsCount: templateStatus.source_reports_count,
    version: templateStatus.version,
    updatedAt: templateStatus.updated_at,
  }
}

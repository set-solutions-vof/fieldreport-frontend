import type { TemplateStatusResponse } from '@/types/template'
import type { TemplatePageState } from '@/types/templateConfiguration'

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
      jobId: templateStatus.jobId,
      reportsCount: templateStatus.reports_count,
    }
  }

  if (templateStatus.status === 'pending_review') {
    return {
      kind: 'preview',
      jobId: templateStatus.job_id,
      sections: templateStatus.sections,
      reportsCount: templateStatus.reports_count,
    }
  }

  if (templateStatus.status === 'failed') {
    return {
      kind: 'failed',
      errorMessage: templateStatus.error_message,
      reportsCount: templateStatus.reports_count,
    }
  }

  return {
    kind: 'approved',
    sections: templateStatus.sections,
    reportsCount: templateStatus.reports_count,
  }
}

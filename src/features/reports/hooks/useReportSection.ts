import { useCallback, useState } from 'react'
import { updateSection } from '@/lib/api/reports'
import { translations } from '@/lib/translations'
import type {
  UseReportSectionParameters,
  UseReportSectionResult,
} from '@/typing/reportDetail'

export function useReportSection({
  reportId,
  sectionId,
  onSuccess,
}: UseReportSectionParameters): UseReportSectionResult {
  const [approveError, setApproveError] = useState<string | null>(null)

  const approve = useCallback(async (): Promise<void> => {
    setApproveError(null)

    try {
      const updatedSection = await updateSection(reportId, sectionId, {
        approved: true,
      })
      onSuccess(updatedSection)
    } catch {
      setApproveError(translations.report_detail.section.approve_failed)
    }
  }, [onSuccess, reportId, sectionId])

  return {
    approve,
    approveError,
  }
}

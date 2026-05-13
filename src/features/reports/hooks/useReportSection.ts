import { useCallback } from 'react'
import { updateSection } from '@/lib/api/reports'
import type {
  UseReportSectionParameters,
  UseReportSectionResult,
} from '@/types/reportDetail'

export function useReportSection({
  reportId,
  sectionId,
  onSuccess,
}: UseReportSectionParameters): UseReportSectionResult {
  const approve = useCallback(async (): Promise<void> => {
    try {
      const updatedSection = await updateSection(reportId, sectionId, {
        is_approved: true,
      })
      onSuccess(updatedSection)
    } catch {
      return
    }
  }, [onSuccess, reportId, sectionId])

  return {
    approve,
  }
}

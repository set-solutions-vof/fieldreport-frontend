import { useCallback, useEffect, useRef, useState } from 'react'
import { updateSection } from '@/lib/api/reports'
import type {
  SaveStatus,
  UseReportSectionParameters,
  UseReportSectionResult,
} from '@/types/reportDetail'

export function useReportSection({
  reportId,
  sectionId,
  onSuccess,
}: UseReportSectionParameters): UseReportSectionResult {
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle')
  const debounceTimeout = useRef<number | null>(null)

  const clearDebounce = useCallback((): void => {
    if (debounceTimeout.current === null) {
      return
    }

    window.clearTimeout(debounceTimeout.current)
    debounceTimeout.current = null
  }, [])

  const approve = useCallback(async (): Promise<void> => {
    setSaveStatus('saving')

    try {
      const updatedSection = await updateSection(reportId, sectionId, {
        is_approved: true,
      })
      setSaveStatus('saved')
      onSuccess(updatedSection)
    } catch {
      setSaveStatus('error')
    }
  }, [onSuccess, reportId, sectionId])

  const saveContent = useCallback(
    (content: string): void => {
      clearDebounce()
      setSaveStatus('idle')

      debounceTimeout.current = window.setTimeout(() => {
        setSaveStatus('saving')
        void updateSection(reportId, sectionId, {
          field_expert_content: content,
        })
          .then((updatedSection) => {
            setSaveStatus('saved')
            onSuccess(updatedSection)
          })
          .catch(() => setSaveStatus('error'))
      }, 800)
    },
    [clearDebounce, onSuccess, reportId, sectionId],
  )

  useEffect(() => {
    return () => clearDebounce()
  }, [clearDebounce])

  return {
    saveStatus,
    approve,
    saveContent,
  }
}

import { useEffect, useRef, useState } from 'react'
import { saveTemplateStructure } from '@/lib/api/templates'
import type {
  TemplatePageState,
  TemplateSaveStatus,
} from '@/types/templateConfiguration'

export function useTemplateAutoSave(
  pageState: TemplatePageState,
): TemplateSaveStatus {
  const [saveStatus, setSaveStatus] = useState<TemplateSaveStatus>('idle')
  const autoSaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const savedStatusTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (pageState.kind !== 'preview') {
      return
    }

    if (autoSaveTimerRef.current !== null) {
      clearTimeout(autoSaveTimerRef.current)
    }

    autoSaveTimerRef.current = setTimeout(() => {
      void saveTemplateStructure(pageState.jobId, pageState.sections)
        .then(() => {
          setSaveStatus('saved')

          if (savedStatusTimerRef.current !== null) {
            clearTimeout(savedStatusTimerRef.current)
          }

          savedStatusTimerRef.current = setTimeout(() => {
            setSaveStatus('idle')
          }, 2000)
        })
        .catch(() => undefined)
    }, 500)

    return () => {
      if (autoSaveTimerRef.current !== null) {
        clearTimeout(autoSaveTimerRef.current)
      }
    }
  }, [pageState])

  useEffect(() => {
    return () => {
      if (savedStatusTimerRef.current !== null) {
        clearTimeout(savedStatusTimerRef.current)
      }
    }
  }, [])

  return saveStatus
}

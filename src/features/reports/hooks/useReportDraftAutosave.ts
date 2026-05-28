import { useCallback, useEffect, useRef, useState } from 'react'
import { updateSection } from '@/lib/api/reports'
import type {
  ReportSection as ReportSectionModel,
  ReportSectionUpdateResponse,
} from '@/types/report'
import {
  initialDraftContent,
  mergeUpdatedSection,
  sectionContent,
} from '../lib/reportDetailView'
import type {
  SaveAllStatus,
  UseReportDraftAutosaveParameters,
  UseReportDraftAutosaveResult,
} from '@/types/reportDetailView'

export function useReportDraftAutosave({
  reportId,
  initialSections,
  onSaveSuccess,
}: UseReportDraftAutosaveParameters): UseReportDraftAutosaveResult {
  const [sections, setSections] =
    useState<ReportSectionModel[]>(initialSections)
  const [draftContent, setDraftContent] = useState<Record<string, string>>(() =>
    initialDraftContent(initialSections),
  )
  const [dirtySectionIds, setDirtySectionIds] = useState<Set<string>>(
    () => new Set(),
  )
  const [saveStatus, setSaveStatus] = useState<SaveAllStatus>('saved')
  const latestDraftContent = useRef(draftContent)
  const latestDirtySectionIds = useRef(dirtySectionIds)
  const dirtyCount = dirtySectionIds.size

  useEffect(() => {
    latestDraftContent.current = draftContent
  }, [draftContent])

  useEffect(() => {
    latestDirtySectionIds.current = dirtySectionIds
  }, [dirtySectionIds])

  const handleSectionUpdated = useCallback(
    (updatedSection: ReportSectionUpdateResponse): void => {
      setSections((currentSections) =>
        currentSections.map((section) =>
          section.id === updatedSection.id
            ? mergeUpdatedSection(section, updatedSection)
            : section,
        ),
      )
      setDraftContent((currentDraftContent) => {
        if (dirtySectionIds.has(updatedSection.id)) {
          return currentDraftContent
        }

        return {
          ...currentDraftContent,
          [updatedSection.id]: sectionContent(updatedSection),
        }
      })
    },
    [dirtySectionIds],
  )

  function handleContentChange(sectionId: string, content: string): void {
    const section = sections.find(
      (reportSection) => reportSection.id === sectionId,
    )!
    const savedContent = sectionContent(section)

    setDraftContent((currentDraftContent) => ({
      ...currentDraftContent,
      [sectionId]: content,
    }))
    setDirtySectionIds((currentDirtySectionIds) => {
      const nextDirtySectionIds = new Set(currentDirtySectionIds)

      if (content === savedContent) {
        nextDirtySectionIds.delete(sectionId)
      } else {
        nextDirtySectionIds.add(sectionId)
      }

      return nextDirtySectionIds
    })
    setSaveStatus('idle')
  }

  useEffect(() => {
    if (dirtySectionIds.size === 0 || saveStatus === 'saving') {
      return
    }

    const sectionIds = [...dirtySectionIds]
    const contentBySectionId = Object.fromEntries(
      sectionIds.map((sectionId) => [sectionId, draftContent[sectionId]]),
    )

    const timeoutId = window.setTimeout(() => {
      setSaveStatus('saving')

      void Promise.all(
        sectionIds.map((sectionId) =>
          updateSection(reportId, sectionId, {
            reviewed_content: contentBySectionId[sectionId],
          }),
        ),
      )
        .then((updatedSections) => {
          const nextDirtySectionIds = new Set(latestDirtySectionIds.current)

          setSections((currentSections) =>
            currentSections.map((section) =>
              mergeUpdatedSection(
                section,
                updatedSections.find(
                  (updatedSection) => updatedSection.id === section.id,
                ) ?? section,
              ),
            ),
          )

          sectionIds.forEach((sectionId) => {
            if (
              latestDraftContent.current[sectionId] ===
              contentBySectionId[sectionId]
            ) {
              nextDirtySectionIds.delete(sectionId)
            }
          })

          setDirtySectionIds(nextDirtySectionIds)
          setSaveStatus(nextDirtySectionIds.size > 0 ? 'idle' : 'saved')
          onSaveSuccess?.()
        })
        .catch(() => setSaveStatus('error'))
    }, 800)

    return () => window.clearTimeout(timeoutId)
  }, [dirtySectionIds, draftContent, onSaveSuccess, reportId, saveStatus])

  return {
    dirtyCount,
    draftContent,
    saveStatus,
    sections,
    handleContentChange,
    handleSectionUpdated,
  }
}

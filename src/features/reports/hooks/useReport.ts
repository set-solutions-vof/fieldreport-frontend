import { useState, useEffect, useCallback } from 'react'
import { getReport, patchSection } from '@/lib/api/reports'
import type { Report } from '@/types'

type State =
  | { status: 'loading' }
  | { status: 'success'; report: Report }
  | { status: 'error'; message: string }

export function useReport(id: string) {
  const [state, setState] = useState<State>({ status: 'loading' })
  const [loadId, setLoadId] = useState(0)

  // Increment loadId to trigger a refetch
  const reload = useCallback(() => setLoadId((n) => n + 1), [])

  useEffect(() => {
    let cancelled = false
    getReport(id)
      .then((report) => {
        if (!cancelled) setState({ status: 'success', report })
      })
      .catch((err: unknown) => {
        if (!cancelled)
          setState({
            status: 'error',
            message: err instanceof Error ? err.message : 'Laden mislukt',
          })
      })
    return () => {
      cancelled = true
    }
  }, [id, loadId])

  const updateSectionContent = useCallback(
    async (sectionId: string, content: string) => {
      await patchSection(id, sectionId, { field_expert_content: content })
      setState((prev) => {
        if (prev.status !== 'success') return prev
        return {
          ...prev,
          report: {
            ...prev.report,
            sections: prev.report.sections.map((s) =>
              s.id === sectionId ? { ...s, field_expert_content: content } : s,
            ),
          },
        }
      })
    },
    [id],
  )

  const approveSection = useCallback(
    async (sectionId: string) => {
      await patchSection(id, sectionId, { is_approved: true })
      setState((prev) => {
        if (prev.status !== 'success') return prev
        const updatedSections = prev.report.sections.map((s) =>
          s.id === sectionId ? { ...s, is_approved: true } : s,
        )
        const allApproved =
          updatedSections.length > 0 &&
          updatedSections.every((s) => s.is_approved)
        return {
          ...prev,
          report: {
            ...prev.report,
            status: allApproved ? 'approved' : prev.report.status,
            sections: updatedSections,
          },
        }
      })
    },
    [id],
  )

  return { state, updateSectionContent, approveSection, reload }
}

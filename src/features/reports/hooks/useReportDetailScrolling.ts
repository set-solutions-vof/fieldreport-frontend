import { useEffect } from 'react'
import type { UseReportDetailScrollingParameters } from '@/typing/reportDetailView'

export function useReportDetailScrolling({
  activeSectionId,
  activeEvidenceItemId,
  evidenceActivationOriginRef,
}: UseReportDetailScrollingParameters): void {
  useEffect(() => {
    if (activeSectionId === null) {
      return
    }

    document.getElementById(`sec-${activeSectionId}`)?.scrollIntoView({
      block: 'center',
      behavior: 'smooth',
    })
  }, [activeSectionId])

  useEffect(() => {
    if (
      activeEvidenceItemId === null ||
      evidenceActivationOriginRef.current === null
    ) {
      return
    }

    if (evidenceActivationOriginRef.current === 'timeline') {
      document
        .getElementById(`evidence-item-${activeEvidenceItemId}`)
        ?.scrollIntoView({
          block: 'center',
          behavior: 'smooth',
        })
    }

    if (evidenceActivationOriginRef.current === 'evidence-rail') {
      document.getElementById('report-timeline-strip')?.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      })
    }

    evidenceActivationOriginRef.current = null
  }, [activeEvidenceItemId, evidenceActivationOriginRef])
}

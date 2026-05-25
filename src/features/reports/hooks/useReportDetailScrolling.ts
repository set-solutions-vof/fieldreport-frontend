import { useEffect } from 'react'
import type { UseReportDetailScrollingParameters } from '@/types/reportDetailView'

export function useReportDetailScrolling({
  activeSectionId,
  activeSourceItemId,
  sourceActivationOriginRef,
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
      activeSourceItemId === null ||
      sourceActivationOriginRef.current === null
    ) {
      return
    }

    if (sourceActivationOriginRef.current === 'timeline') {
      document
        .getElementById(`source-item-${activeSourceItemId}`)
        ?.scrollIntoView({
          block: 'center',
          behavior: 'smooth',
        })
    }

    if (sourceActivationOriginRef.current === 'source-rail') {
      document.getElementById('report-timeline-strip')?.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      })
    }

    sourceActivationOriginRef.current = null
  }, [activeSourceItemId, sourceActivationOriginRef])
}

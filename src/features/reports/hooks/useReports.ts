import { useCallback, useEffect, useState } from 'react'
import { getReports } from '@/lib/api/reports'
import type { Report } from '@/types/report'
import type { ReportsStatus, UseReportsResult } from '@/types/reportList'

export function useReports(): UseReportsResult {
  const [reports, setReports] = useState<Report[]>([])
  const [status, setStatus] = useState<ReportsStatus>('loading')

  const showReports = useCallback((fetchedReports: Report[]): void => {
    setReports(fetchedReports)
    setStatus('success')
  }, [])

  useEffect(() => {
    void getReports().then(showReports)
  }, [showReports])

  return {
    reports,
    isLoading: status === 'loading',
  }
}

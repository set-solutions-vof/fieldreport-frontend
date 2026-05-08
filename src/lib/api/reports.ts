import { authenticatedFetch } from '@/lib/api/authenticatedFetch'
import { apiBaseUrl } from '@/lib/config'
import type { ReportDetail, ReportSummary } from '@/types/report'

export async function getReports(): Promise<ReportSummary[]> {
  const response = await authenticatedFetch(`${apiBaseUrl}/api/v1/reports`)

  if (!response.ok) {
    throw new Error('Reports request failed')
  }

  return (await response.json()) as ReportSummary[]
}

export async function getReport(reportId: string): Promise<ReportDetail> {
  const response = await authenticatedFetch(`${apiBaseUrl}/api/v1/reports/${reportId}`)

  if (!response.ok) {
    throw new Error('Report request failed')
  }

  return (await response.json()) as ReportDetail
}

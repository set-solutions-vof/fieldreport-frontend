import { authenticatedFetch } from '@/lib/api/authenticatedFetch'
import { apiBaseUrl } from '@/lib/config'
import type {
  ReportDetail,
  ReportSummary,
  ReportSectionUpdateResponse,
  ReportSectionUpdatePayload,
} from '@/typing/report'

export async function getReports(): Promise<ReportSummary[]> {
  const response = await authenticatedFetch(`${apiBaseUrl}/api/v1/reports`)
  return (await response.json()) as ReportSummary[]
}

export async function getReport(reportId: string): Promise<ReportDetail> {
  const response = await authenticatedFetch(
    `${apiBaseUrl}/api/v1/reports/${reportId}`,
  )
  return (await response.json()) as ReportDetail
}

export async function updateSection(
  reportId: string,
  sectionId: string,
  payload: ReportSectionUpdatePayload,
): Promise<ReportSectionUpdateResponse> {
  const response = await authenticatedFetch(
    `${apiBaseUrl}/api/v1/reports/${reportId}/sections/${sectionId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    },
  )
  return (await response.json()) as ReportSectionUpdateResponse
}

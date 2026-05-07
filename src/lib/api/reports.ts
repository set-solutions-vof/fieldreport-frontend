import { useStubs, apiBaseUrl } from '@/lib/config'
import { apiFetch } from '@/lib/api/client'
import { getAccessToken } from '@/features/auth/tokenStore'
import {
  stubGetReports,
  stubGetReport,
  stubPatchSection,
  stubDownloadPdf,
} from '@/lib/api/stubs'
import type { Report } from '@/types'

export async function getReports(): Promise<Report[]> {
  if (useStubs) return stubGetReports()
  return apiFetch<Report[]>('/api/v1/reports')
}

export async function getReport(id: string): Promise<Report> {
  if (useStubs) return stubGetReport(id)
  return apiFetch<Report>(`/api/v1/reports/${id}`)
}

export async function patchSection(
  reportId: string,
  sectionId: string,
  payload: { field_expert_content?: string; is_approved?: boolean },
): Promise<void> {
  if (useStubs) return stubPatchSection(reportId, sectionId, payload)
  await apiFetch<void>(`/api/v1/reports/${reportId}/sections/${sectionId}`, {
    method: 'PATCH',
    body: payload,
  })
}

export async function downloadPdf(reportId: string): Promise<Blob> {
  if (useStubs) return stubDownloadPdf(reportId)
  const res = await fetch(`${apiBaseUrl}/api/v1/reports/${reportId}/pdf`, {
    headers: { Authorization: `Bearer ${getAccessToken() ?? ''}` },
  })
  if (!res.ok) throw new Error('PDF generatie mislukt')
  return res.blob()
}

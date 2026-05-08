import { getAuthTokens } from '@/features/auth/tokenStore'
import { apiBaseUrl } from '@/lib/config'
import type { Report } from '@/types/report'

export async function getReports(): Promise<Report[]> {
  const authTokens = getAuthTokens()
  const response = await fetch(`${apiBaseUrl}/api/v1/reports`, {
    headers: {
      Authorization: `Bearer ${authTokens.access_token}`,
    },
  })

  if (!response.ok) {
    throw new Error('Reports request failed')
  }

  return (await response.json()) as Report[]
}

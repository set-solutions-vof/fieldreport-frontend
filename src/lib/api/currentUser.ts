import { authenticatedFetch } from '@/lib/api/authenticatedFetch'
import { apiBaseUrl } from '@/lib/config'
import type { CurrentUser } from '@/types/auth'

export async function getCurrentUser(): Promise<CurrentUser> {
  const response = await authenticatedFetch(`${apiBaseUrl}/api/v1/auth/me`)

  if (!response.ok) {
    throw new Error('Current user request failed')
  }

  return (await response.json()) as CurrentUser
}

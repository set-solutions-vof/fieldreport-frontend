import { authenticatedFetch } from '@/lib/api/authenticatedFetch'
import { apiBaseUrl } from '@/lib/config'
import type { CurrentUser } from '@/types/auth'

export async function getCurrentUser(): Promise<CurrentUser> {
  const response = await authenticatedFetch(`${apiBaseUrl}/api/v1/auth/me`)
  return (await response.json()) as CurrentUser
}

import { authenticatedFetch } from '@/lib/api/authenticatedFetch'
import { apiBaseUrl } from '@/lib/config'
import type { CurrentUser } from '@/types/auth'
import type { ChangePasswordRequest, UpdateProfileRequest } from '@/types/user'

const userEndpoint = `${apiBaseUrl}/api/v1/users/me`

export async function updateProfile(
  request: UpdateProfileRequest,
): Promise<CurrentUser> {
  const response = await authenticatedFetch(userEndpoint, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  })
  return (await response.json()) as CurrentUser
}

export async function changePassword(
  request: ChangePasswordRequest,
): Promise<void> {
  await authenticatedFetch(`${userEndpoint}/password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  })
}

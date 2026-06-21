import { authenticatedFetch } from '@/lib/api/authenticatedFetch'
import { apiBaseUrl } from '@/lib/config'
import type {
  CreateTeamUserPayload,
  TeamUser,
  UpdateTeamUserPayload,
} from '@/typing/team'

const teamEndpoint = `${apiBaseUrl}/api/v1/team`

export async function listTeamUsers(): Promise<TeamUser[]> {
  const response = await authenticatedFetch(`${teamEndpoint}/users`)
  return (await response.json()) as TeamUser[]
}

export async function createTeamUser(
  payload: CreateTeamUserPayload,
): Promise<TeamUser> {
  const response = await authenticatedFetch(`${teamEndpoint}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  return (await response.json()) as TeamUser
}

export async function getTeamUser(userId: string): Promise<TeamUser> {
  const response = await authenticatedFetch(`${teamEndpoint}/users/${userId}`)
  return (await response.json()) as TeamUser
}

export async function updateTeamUser(
  userId: string,
  payload: UpdateTeamUserPayload,
): Promise<TeamUser> {
  const response = await authenticatedFetch(`${teamEndpoint}/users/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  return (await response.json()) as TeamUser
}

export async function deleteTeamUser(userId: string): Promise<void> {
  await authenticatedFetch(`${teamEndpoint}/users/${userId}`, {
    method: 'DELETE',
  })
}

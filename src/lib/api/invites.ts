import { apiBaseUrl } from '@/lib/config'
import type {
  AcceptInviteRequest,
  InvitePreview,
  LoginResponse,
} from '@/types/auth'

export async function getInvitePreview(token: string): Promise<InvitePreview> {
  const response = await fetch(`${apiBaseUrl}/api/v1/invites/${token}`)

  if (!response.ok) {
    throw new Error('Invite preview failed')
  }

  return (await response.json()) as InvitePreview
}

export async function acceptInvite(
  token: string,
  payload: AcceptInviteRequest,
): Promise<LoginResponse> {
  const response = await fetch(`${apiBaseUrl}/api/v1/invites/${token}/accept`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error('Invite acceptance failed')
  }

  return (await response.json()) as LoginResponse
}

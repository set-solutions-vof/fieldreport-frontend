import { authenticatedFetch } from '@/lib/api/authenticatedFetch'
import { apiBaseUrl } from '@/lib/config'
import type {
  CreateInvitePayload,
  CreateInviteResponse,
  InviteResponse,
  OnboardingCompany,
  UpdateOnboardingCompanyPayload,
} from '@/types/onboarding'

const onboardingEndpoint = `${apiBaseUrl}/api/v1/onboarding`

export async function getOnboardingCompany(): Promise<OnboardingCompany> {
  const response = await authenticatedFetch(`${onboardingEndpoint}/company`)
  return (await response.json()) as OnboardingCompany
}

export async function updateOnboardingCompany(
  payload: Partial<UpdateOnboardingCompanyPayload>,
): Promise<OnboardingCompany> {
  const response = await authenticatedFetch(`${onboardingEndpoint}/company`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  return (await response.json()) as OnboardingCompany
}

export async function uploadOnboardingCompanyLogo(
  file: File,
): Promise<OnboardingCompany> {
  const formData = new FormData()
  formData.append('file', file)

  const response = await authenticatedFetch(`${apiBaseUrl}/api/v1/uploads/logo`, {
    method: 'POST',
    body: formData,
  })
  const { url } = (await response.json()) as { url: string }
  return updateOnboardingCompany({ logo_url: url })
}

export async function createInvite(
  payload: CreateInvitePayload,
): Promise<CreateInviteResponse> {
  const response = await authenticatedFetch(`${onboardingEndpoint}/invites`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  return (await response.json()) as CreateInviteResponse
}

export async function listInvites(): Promise<InviteResponse[]> {
  const response = await authenticatedFetch(`${onboardingEndpoint}/invites`)
  return (await response.json()) as InviteResponse[]
}

export async function deleteInvite(inviteId: string): Promise<void> {
  await authenticatedFetch(
    `${onboardingEndpoint}/invites/${inviteId}`,
    {
      method: 'DELETE',
    },
  )
}

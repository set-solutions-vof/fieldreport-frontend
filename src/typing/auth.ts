export type LoginRequest = {
  email: string
  password: string
}

export type LoginResponse = {
  access_token: string
  refresh_token: string
  token_type: string
}

export type RefreshTokenRequest = {
  refresh_token: string
}

export type RefreshTokenResponse = {
  access_token: string
  token_type: string
}

export type CurrentUser = {
  id: string
  name: string
  first_name: string
  last_name: string
  email: string
  role: 'admin' | 'inspector'
  company_id: string
  company_name: string
}

export function currentUserDisplayName(
  user: Pick<CurrentUser, 'first_name' | 'last_name' | 'name'>,
): string {
  const displayName = `${user.first_name} ${user.last_name}`.trim()
  return displayName || user.name
}

export type InvitePreview = {
  email: string
  first_name: string
  last_name: string
  role: 'admin' | 'inspector'
  company_name: string
}

export type AcceptInviteRequest = {
  name: string
  password: string
}

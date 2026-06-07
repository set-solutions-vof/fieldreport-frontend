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
  email: string
  role: 'admin' | 'inspector'
  company_id: string
  company_name: string
}

export type InvitePreview = {
  email: string
  role: 'admin' | 'inspector'
  company_name: string
}

export type AcceptInviteRequest = {
  name: string
  password: string
}

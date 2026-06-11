import type { LoginResponse } from '@/types/auth'

const refreshTokenStorageKey = 'fieldreport_refresh_token'

let authTokens: LoginResponse | null = null

export function storeAuthTokens(tokens: LoginResponse): void {
  authTokens = tokens
  localStorage.setItem(refreshTokenStorageKey, tokens.refresh_token)
}

export function storeAccessToken(accessToken: string, tokenType: string): void {
  const refreshToken = getStoredRefreshToken()
  authTokens = {
    access_token: accessToken,
    refresh_token: refreshToken,
    token_type: tokenType,
  }
}

export function getAuthTokens(): LoginResponse {
  if (authTokens === null) {
    throw new Error('Auth tokens missing')
  }

  return authTokens
}

export function clearAuthTokens(): void {
  authTokens = null
  localStorage.removeItem(refreshTokenStorageKey)
}

export function getStoredRefreshToken(): string {
  return localStorage.getItem(refreshTokenStorageKey) ?? ''
}

export function hasStoredRefreshToken(): boolean {
  return getStoredRefreshToken() !== ''
}

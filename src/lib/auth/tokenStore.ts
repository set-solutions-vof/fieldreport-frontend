import type { LoginResponse } from '@/types/auth'

let authTokens: LoginResponse | null = null

export function storeAuthTokens(tokens: LoginResponse): void {
  authTokens = tokens
}

export function storeAccessToken(accessToken: string): void {
  const currentAuthTokens = getAuthTokens()
  authTokens = {
    ...currentAuthTokens,
    access_token: accessToken,
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
}

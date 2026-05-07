import type { LoginResponse } from '@/types/auth'

let authTokens: LoginResponse | null = null

export function storeAuthTokens(tokens: LoginResponse): void {
  authTokens = tokens
}

export function getAuthTokens(): LoginResponse | null {
  return authTokens
}

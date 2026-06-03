import { apiBaseUrl } from '@/lib/config'
import type {
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from '@/types/auth'

export class TokenRefreshError extends Error {
  constructor() {
    super('Token refresh failed')
    this.name = 'TokenRefreshError'
  }
}

export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  const response = await fetch(`${apiBaseUrl}/api/v1/auth/login/json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })

  if (!response.ok) {
    throw new Error('Login failed')
  }

  return (await response.json()) as LoginResponse
}

export async function refreshAccessToken(
  refreshTokenRequest: RefreshTokenRequest,
): Promise<RefreshTokenResponse> {
  const response = await fetch(`${apiBaseUrl}/api/v1/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(refreshTokenRequest),
  })

  if (!response.ok) {
    throw new TokenRefreshError()
  }

  return (await response.json()) as RefreshTokenResponse
}

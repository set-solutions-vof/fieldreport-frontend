import {
  clearAuthTokens,
  getAuthTokens,
  storeAccessToken,
} from '@/features/auth/tokenStore'
import { refreshAccessToken } from './auth'

export class AuthenticationExpiredError extends Error {
  constructor() {
    super('Authentication expired')
    this.name = 'AuthenticationExpiredError'
  }
}

export function isAuthenticationExpiredError(
  error: unknown,
): error is AuthenticationExpiredError {
  return error instanceof AuthenticationExpiredError
}

export async function authenticatedFetch(
  url: string,
  init: RequestInit = {},
): Promise<Response> {
  const response = await fetchWithAccessToken(url, init)

  if (response.status !== 401) {
    return response
  }

  try {
    const authTokens = getAuthTokens()
    const refreshedToken = await refreshAccessToken({
      refresh_token: authTokens.refresh_token,
    })
    storeAccessToken(refreshedToken.access_token)
  } catch {
    clearAuthTokens()
    throw new AuthenticationExpiredError()
  }

  const retryResponse = await fetchWithAccessToken(url, init)

  if (retryResponse.status === 401) {
    clearAuthTokens()
    throw new AuthenticationExpiredError()
  }

  return retryResponse
}

async function fetchWithAccessToken(
  url: string,
  init: RequestInit,
): Promise<Response> {
  const authTokens = getAuthTokens()
  const headers = new Headers(init.headers)
  headers.set('Authorization', `Bearer ${authTokens.access_token}`)

  return fetch(url, {
    ...init,
    headers,
  })
}

import {
  clearAuthTokens,
  getAuthTokens,
  storeAccessToken,
} from '@/lib/auth/tokenStore'
import { TokenRefreshError, refreshAccessToken } from './auth'

export async function authenticatedFetch(
  url: string,
  init: RequestInit = {},
): Promise<Response> {
  const response = await fetchWithAccessToken(url, init)

  if (response.status !== 401) {
    if (!response.ok) {
      throw await buildApiError(response)
    }
    return response
  }

  try {
    const authTokens = getAuthTokens()
    const refreshedToken = await refreshAccessToken({
      refresh_token: authTokens.refresh_token,
    })
    storeAccessToken(refreshedToken.access_token, refreshedToken.token_type)
  } catch (error) {
    if (error instanceof TokenRefreshError) {
      clearAuthTokens()
      throw new AuthenticationExpiredError()
    }
    throw error
  }

  const retryResponse = await fetchWithAccessToken(url, init)

  if (retryResponse.status === 401) {
    clearAuthTokens()
    throw new AuthenticationExpiredError()
  }

  if (!retryResponse.ok) {
    throw await buildApiError(retryResponse)
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

async function buildApiError(response: Response): Promise<Error> {
  let body: unknown

  try {
    body = await response.json()
  } catch {
    return new ApiError(
      response.status,
      `Request failed with status ${response.status}`,
    )
  }

  if (
    typeof body === 'object' &&
    body !== null &&
    'detail' in body &&
    body.detail !== undefined
  ) {
    const detail =
      typeof body.detail === 'string'
        ? body.detail
        : JSON.stringify(body.detail)
    return new ApiError(response.status, detail)
  }

  return new ApiError(
    response.status,
    `Request failed with status ${response.status}`,
  )
}

export class AuthenticationExpiredError extends Error {
  constructor() {
    super('Authentication expired')
    this.name = 'AuthenticationExpiredError'
  }
}

export class ApiError extends Error {
  public readonly status: number

  constructor(status: number, message: string) {
    super(message)
    this.status = status
    this.name = 'ApiError'
  }
}

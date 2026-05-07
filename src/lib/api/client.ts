import { apiBaseUrl } from '@/lib/config'
import {
  getAccessToken,
  getRefreshToken,
  setTokens,
  clearTokens,
} from '@/features/auth/tokenStore'

export class ApiError extends Error {
  readonly status: number

  constructor(status: number, message: string) {
    super(message)
    this.status = status
    this.name = 'ApiError'
  }
}

type RequestOptions = {
  method?: string
  body?: unknown
  signal?: AbortSignal
}

async function tryRefresh(): Promise<boolean> {
  const refresh = getRefreshToken()
  if (!refresh) return false
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refresh }),
    })
    if (!res.ok) return false
    const data = (await res.json()) as {
      access_token: string
      refresh_token?: string
    }
    setTokens(data.access_token, data.refresh_token ?? refresh)
    return true
  } catch {
    return false
  }
}

async function doFetch(
  path: string,
  options: RequestOptions,
  isRetry: boolean,
): Promise<Response> {
  const token = getAccessToken()
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(`${apiBaseUrl}${path}`, {
    method: options.method ?? 'GET',
    headers,
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
    signal: options.signal,
  })

  if (res.status === 401 && !isRetry) {
    const refreshed = await tryRefresh()
    if (refreshed) return doFetch(path, options, true)
    clearTokens()
    window.location.href = '/login'
    throw new ApiError(401, 'Session expired')
  }

  return res
}

export async function apiFetch<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const res = await doFetch(path, options, false)
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText)
    throw new ApiError(res.status, text)
  }
  return res.json() as Promise<T>
}

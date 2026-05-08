import { apiBaseUrl } from '@/lib/config'
import type { LoginRequest, LoginResponse } from '@/types/auth'

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

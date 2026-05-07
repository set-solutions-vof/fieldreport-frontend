import { useStubs } from '@/lib/config'
import { apiFetch } from '@/lib/api/client'
import { stubLogin, stubGetMe } from '@/lib/api/stubs'
import type { LoginResponse, User } from '@/types'

export async function login(
  email: string,
  password: string,
): Promise<LoginResponse> {
  if (useStubs) return stubLogin(email, password)
  return apiFetch<LoginResponse>('/api/v1/auth/login/json', {
    method: 'POST',
    body: { email, password },
  })
}

export async function getMe(): Promise<User> {
  if (useStubs) return stubGetMe()
  return apiFetch<User>('/api/v1/auth/me')
}

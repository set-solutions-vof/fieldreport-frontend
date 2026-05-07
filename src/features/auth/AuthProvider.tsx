import { useState, useCallback, type ReactNode } from 'react'
import { setTokens, clearTokens } from '@/features/auth/tokenStore'
import { login as apiLogin, getMe } from '@/lib/api/auth'
import { AuthContext } from '@/features/auth/authContext'
import type { AuthState } from '@/features/auth/authContext'
import type { LoginResponse } from '@/types'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({ status: 'unauthenticated' })

  const login = useCallback(async (email: string, password: string) => {
    const tokens: LoginResponse = await apiLogin(email, password)
    setTokens(tokens.access_token, tokens.refresh_token)
    const user = await getMe()
    setState({ status: 'authenticated', user })
  }, [])

  const logout = useCallback(() => {
    clearTokens()
    setState({ status: 'unauthenticated' })
  }, [])

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

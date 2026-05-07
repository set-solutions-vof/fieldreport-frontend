import { createContext } from 'react'
import type { User } from '@/types'

export type AuthState =
  | { status: 'unauthenticated' }
  | { status: 'authenticated'; user: User }

export type AuthContextValue = {
  state: AuthState
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)

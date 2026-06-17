import type { CurrentUser } from './auth'

export type AuthView = 'login' | 'forgot-password' | 'reset-password'

export type LoginPageProps = {
  onLoginSuccess: (user: CurrentUser) => void
  onForgotPassword: () => void
}

export type AcceptInvitePageProps = {
  token: string
  onLoginSuccess: (user: CurrentUser) => void
}

export type ForgotPasswordPageProps = {
  onBack: () => void
}

export type ResetPasswordPageProps = {
  onSuccess: () => void
}

export type UseLoginFormParameters = {
  onLoginSuccess: (user: CurrentUser) => void
}

export type UseAcceptInviteFormParameters = {
  token: string
  onLoginSuccess: (user: CurrentUser) => void
}

export type CurrentUserStatus = 'loading' | 'success' | 'error'

export type UseCurrentUserParameters = {
  onAuthenticationExpired: () => void
}

export type UseCurrentUserResult = {
  currentUser: CurrentUser | null
  isLoading: boolean
  isError: boolean
  errorMessage: string | null
  retry: () => void
}

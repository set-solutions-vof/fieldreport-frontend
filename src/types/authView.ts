import type { CurrentUser } from './auth'

export type LoginPageProps = {
  onLoginSuccess: (user: CurrentUser) => void
}

export type UseLoginFormParameters = {
  onLoginSuccess: (user: CurrentUser) => void
}

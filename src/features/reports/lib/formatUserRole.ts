import type { CurrentUser } from '@/typing/auth'

export function formatUserRole(role: CurrentUser['role']): string {
  return role.charAt(0).toUpperCase() + role.slice(1)
}

import type { CurrentUser } from '@/types/auth'

export function formatUserRole(role: CurrentUser['role']): string {
  return role.charAt(0).toUpperCase() + role.slice(1)
}

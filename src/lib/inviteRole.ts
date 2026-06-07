import { translations } from '@/lib/translations'
import type { InviteRole } from '@/types/onboarding'

export function inviteRoleLabel(role: InviteRole): string {
  return translations.onboarding.invites.roles[role]
}

import type { InviteRole } from '@/types/onboarding'

export type TeamMember = {
  id: string
  name: string
  email: string
  role: InviteRole
  created_at: string
}

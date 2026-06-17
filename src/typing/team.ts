import type { InviteRole } from '@/typing/onboarding'

export type TeamMember = {
  id: string
  name: string
  email: string
  role: InviteRole
  created_at: string
}

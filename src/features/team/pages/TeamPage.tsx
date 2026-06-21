import { useMemo, useState } from 'react'
import { Button, Spinner } from '@set-solutions-vof/design-system'
import { pageTitleClassName } from '@/components/pageTitleClassName'
import { translations } from '@/lib/translations'
import { teamUserDisplayName, type TeamUser } from '@/typing/team'
import type { TeamPageProps } from '@/typing/teamView'
import { TeamToolbar } from '../components/TeamToolbar'
import { TeamUsersTable } from '../components/TeamUsersTable'
import { useTeamUsers } from '../hooks/useTeamUsers'

function matchesSearch(query: string, user: TeamUser): boolean {
  const normalizedQuery = query.trim().toLowerCase()

  if (normalizedQuery === '') {
    return true
  }

  const values = [
    user.first_name,
    user.last_name,
    teamUserDisplayName(user),
    user.email,
  ]

  return values.some((value) => value.toLowerCase().includes(normalizedQuery))
}

export function TeamPage({
  onAuthenticationExpired,
  onOpenTeamInvite,
  onOpenTeamUser,
}: TeamPageProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const { users, isLoading, errorMessage, retry } = useTeamUsers({
    onAuthenticationExpired,
  })

  const filteredUsers = useMemo(
    () => users.filter((user) => matchesSearch(searchQuery, user)),
    [users, searchQuery],
  )

  return (
    <main className="flex [min-height:calc(100dvh_-_var(--fr-space-10))] flex-1 flex-col [background:var(--fr-background)]">
      <div className="flex [width:100%] shrink-0 [padding:var(--fr-space-5)_var(--fr-space-5)_var(--fr-space-0)]">
        <div className="flex [width:100%] items-center justify-between [gap:var(--fr-space-4)]">
          <h1 className={pageTitleClassName}>{translations.team.title}</h1>
          <Button type="button" variant="primary" onClick={onOpenTeamInvite}>
            {translations.team.invite_button}
          </Button>
        </div>
      </div>

      <div className="mx-[var(--fr-space-5)] mb-[var(--fr-space-5)] mt-[var(--fr-space-4)] flex [min-height:var(--fr-space-0)] flex-1 flex-col overflow-hidden [border:var(--fr-border-width-sm)_solid_var(--fr-border)] [border-radius:var(--fr-radius-lg)] [background:var(--fr-surface)] [box-shadow:var(--fr-shadow-md)]">
        <TeamToolbar
          resultCount={filteredUsers.length}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
        />

        {isLoading ? (
          <div className="flex flex-1 flex-col items-center justify-center [gap:var(--fr-space-4)] [padding:var(--fr-space-8)] [color:var(--fr-text-secondary)]">
            <Spinner size="md" />
          </div>
        ) : errorMessage !== null ? (
          <div className="flex items-center [gap:var(--fr-space-3)] [padding:var(--fr-space-5)] [color:var(--fr-destructive)] [&_p]:[margin:var(--fr-space-0)]">
            <p>{errorMessage}</p>
            <Button type="button" variant="ghost" onClick={retry}>
              {translations.onboarding.states.retry}
            </Button>
          </div>
        ) : (
          <TeamUsersTable users={filteredUsers} onOpenUser={onOpenTeamUser} />
        )}
      </div>
    </main>
  )
}

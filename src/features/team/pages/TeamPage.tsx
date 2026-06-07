import { Button, Spinner } from '@/design-system'
import { AppShell } from '@/app/AppShell'
import { useCurrentUser } from '@/features/auth/useCurrentUser'
import { InviteRow } from '@/features/onboarding/components/InviteRow'
import { useInvites } from '@/features/onboarding/hooks/useInvites'
import { translations } from '@/lib/translations'
import type { TeamPageProps } from '@/types/teamView'
import { TeamMemberRow } from '../components/TeamMemberRow'
import { useTeamMembers } from '../hooks/useTeamMembers'
import './TeamPage.css'

export function TeamPage({
  onOpenTemplate,
  onOpenTeam,
  onAuthenticationExpired,
}: TeamPageProps) {
  const {
    currentUser,
    isLoading: isCurrentUserLoading,
    isError: isCurrentUserError,
    errorMessage: currentUserErrorMessage,
    retry: retryCurrentUser,
  } = useCurrentUser({ onAuthenticationExpired })
  const {
    members,
    isLoading: isMembersLoading,
    errorMessage: membersErrorMessage,
    retry: retryMembers,
  } = useTeamMembers({ onAuthenticationExpired })
  const {
    invites,
    isLoading: isInvitesLoading,
    isSending,
    errorMessage: invitesErrorMessage,
    retry: retryInvites,
    sendInvite,
    removeInvite,
  } = useInvites({ onAuthenticationExpired })

  const pendingInvites = invites.filter((invite) => !invite.is_accepted)

  if (isCurrentUserLoading || currentUser === null) {
    return (
      <main className="fr-dashboard-loading-page">
        <div className="fr-dashboard-state">
          <Spinner size="lg" />
        </div>
      </main>
    )
  }

  if (isCurrentUserError) {
    return (
      <main className="fr-dashboard-loading-page">
        <div className="fr-dashboard-state">
          <h1>{translations.team.errors.load_failed_title}</h1>
          <p>{currentUserErrorMessage}</p>
          <Button type="button" variant="primary" onClick={retryCurrentUser}>
            {translations.dashboard.states.retry_button}
          </Button>
        </div>
      </main>
    )
  }

  return (
    <AppShell
      currentUser={currentUser}
      activeNavigationItem="team"
      breadcrumbItems={[{ label: translations.team.navigation_label }]}
      onOpenTemplate={onOpenTemplate}
      onOpenTeam={onOpenTeam}
    >
      <main className="fr-team-page">
        <header className="fr-team-page__header">
          <h1>{translations.team.title}</h1>
          <p>{translations.team.description}</p>
        </header>

        <section className="fr-team-page__section">
          <div className="fr-team-page__section-header">
            <h2>{translations.team.members_title}</h2>
          </div>
          {isMembersLoading ? (
            <div className="fr-onboarding-state">
              <Spinner size="md" />
            </div>
          ) : membersErrorMessage !== null ? (
            <div className="fr-onboarding-inline-error">
              <p>{membersErrorMessage}</p>
              <Button type="button" variant="ghost" onClick={retryMembers}>
                {translations.onboarding.states.retry}
              </Button>
            </div>
          ) : members.length === 0 ? (
            <p className="fr-team-page__empty">
              {translations.team.members_empty}
            </p>
          ) : (
            <div className="fr-team-page__list">
              {members.map((member) => (
                <TeamMemberRow key={member.id} member={member} />
              ))}
            </div>
          )}
        </section>

        <section className="fr-team-page__section">
          <div className="fr-team-page__section-header">
            <h2>{translations.team.pending_title}</h2>
          </div>
          <div className="fr-onboarding-invite-list">
            {isInvitesLoading ? (
              <div className="fr-onboarding-state">
                <Spinner size="md" />
              </div>
            ) : (
              <>
                {pendingInvites.length === 0 && (
                  <p className="fr-team-page__empty">
                    {translations.team.empty}
                  </p>
                )}
                {pendingInvites.map((invite) => (
                  <InviteRow
                    key={invite.id}
                    mode="confirmed"
                    invite={invite}
                    onDelete={(inviteId) => void removeInvite(inviteId)}
                  />
                ))}
                <InviteRow
                  mode="active"
                  isSending={isSending}
                  onSend={(email, role) => sendInvite({ email, role })}
                />
              </>
            )}
          </div>
          {invitesErrorMessage !== null && (
            <div className="fr-onboarding-inline-error">
              <p>{invitesErrorMessage}</p>
              <Button type="button" variant="ghost" onClick={retryInvites}>
                {translations.onboarding.states.retry}
              </Button>
            </div>
          )}
          <p className="fr-onboarding-invite-counter">
            {translations.onboarding.invites.counter.replace(
              '{{count}}',
              String(pendingInvites.length),
            )}
          </p>
        </section>
      </main>
    </AppShell>
  )
}

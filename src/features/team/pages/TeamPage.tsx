import { Button, Spinner } from '@set-solutions-vof/design-system'
import { AppShell } from '@/app/AppShell'
import { PageHeader } from '@/components/PageHeader'
import { useCurrentUser } from '@/features/auth/useCurrentUser'
import { InviteRow } from '@/features/onboarding/components/InviteRow'
import { useInvites } from '@/features/onboarding/hooks/useInvites'
import { translations } from '@/lib/translations'
import type { TeamPageProps } from '@/types/teamView'
import { TeamMemberRow } from '../components/TeamMemberRow'
import { useTeamMembers } from '../hooks/useTeamMembers'

export function TeamPage({
  onOpenTemplate,
  onOpenTeam,
  onOpenProfile,
  onAuthenticationExpired,
  onLogout,
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
      <main className="flex min-h-[100dvh] box-border [padding:var(--fr-space-7)] [background:var(--fr-background)]">
        <div className="flex [max-width:calc(var(--fr-space-16)_+_var(--fr-space-15))] flex-col items-start">
          <Spinner size="lg" />
        </div>
      </main>
    )
  }

  if (isCurrentUserError) {
    return (
      <main className="flex min-h-[100dvh] box-border [padding:var(--fr-space-7)] [background:var(--fr-background)]">
        <div className="flex [max-width:calc(var(--fr-space-16)_+_var(--fr-space-15))] flex-col items-start">
          <PageHeader
            title={translations.team.errors.load_failed_title}
            metadata={currentUserErrorMessage}
          />
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
      onOpenProfile={onOpenProfile}
      onLogout={onLogout}
    >
      <main className="flex flex-1 flex-col [padding:var(--fr-space-8)]">
        <PageHeader
          title={translations.team.title}
          metadata={translations.team.description}
        />

        <div className="grid [grid-template-columns:280px_1fr] [gap:var(--fr-space-7)]">
          <aside className="[padding-right:var(--fr-space-5)] [border-right:1px_solid_var(--fr-border)]">
            <div className="flex flex-col [gap:var(--fr-space-4)] [&_h2]:[margin:var(--fr-space-0)] [&_h2]:[font-size:var(--fr-text-lg)] [&_h2]:[font-weight:var(--fr-weight-bold)] [&_h2]:[letter-spacing:var(--fr-tracking-section)] [&_h2]:[color:var(--fr-text-primary)] [&_p]:[margin:var(--fr-space-0)] [&_p]:[font-size:var(--fr-text-sm)] [&_p]:[line-height:var(--fr-leading-snug)] [&_p]:[color:var(--fr-text-secondary)]">
              <h2>{translations.team.navigation_label}</h2>
              <p>{translations.team.description}</p>
              <nav
                className="flex flex-col [gap:var(--fr-space-2)]"
                aria-label={translations.team.navigation_label}
              >
                <a
                  className="[font-size:var(--fr-text-sm)] [font-weight:var(--fr-weight-medium)] [color:var(--fr-accent)] [text-decoration:none]"
                  href="#team-members"
                >
                  {translations.team.members_title}
                </a>
                <a
                  className="[font-size:var(--fr-text-sm)] [font-weight:var(--fr-weight-medium)] [color:var(--fr-accent)] [text-decoration:none]"
                  href="#team-invites"
                >
                  {translations.team.pending_title}
                </a>
              </nav>
            </div>
          </aside>

          <div className="flex flex-col [gap:var(--fr-space-8)]">
            <section
              className="flex flex-col [gap:var(--fr-space-4)]"
              id="team-members"
            >
              <div className="[&_h2]:[margin:var(--fr-space-0)] [&_h2]:[font-size:var(--fr-text-lg)] [&_h2]:[font-weight:var(--fr-weight-bold)] [&_h2]:[letter-spacing:var(--fr-tracking-section)] [&_h2]:[color:var(--fr-text-primary)]">
                <h2>{translations.team.members_title}</h2>
              </div>
              {isMembersLoading ? (
                <div className="flex items-center justify-center flex-col [gap:var(--fr-space-4)] [color:var(--fr-text-secondary)]">
                  <Spinner size="md" />
                </div>
              ) : membersErrorMessage !== null ? (
                <div className="flex items-center [gap:var(--fr-space-3)] [color:var(--fr-destructive)] [&_p]:[margin:var(--fr-space-0)]">
                  <p>{membersErrorMessage}</p>
                  <Button type="button" variant="ghost" onClick={retryMembers}>
                    {translations.onboarding.states.retry}
                  </Button>
                </div>
              ) : members.length === 0 ? (
                <p className="[margin:var(--fr-space-0)] [font-size:var(--fr-text-sm)] [color:var(--fr-text-secondary)]">
                  {translations.team.members_empty}
                </p>
              ) : (
                <div className="flex [width:min(100%,_calc(var(--fr-space-16)_*_3))] flex-col [gap:var(--fr-space-2)]">
                  {members.map((member) => (
                    <TeamMemberRow key={member.id} member={member} />
                  ))}
                </div>
              )}
            </section>

            <section
              className="flex flex-col [gap:var(--fr-space-4)]"
              id="team-invites"
            >
              <div className="[&_h2]:[margin:var(--fr-space-0)] [&_h2]:[font-size:var(--fr-text-lg)] [&_h2]:[font-weight:var(--fr-weight-bold)] [&_h2]:[letter-spacing:var(--fr-tracking-section)] [&_h2]:[color:var(--fr-text-primary)]">
                <h2>{translations.team.pending_title}</h2>
              </div>
              <div className="flex [width:min(100%,_calc(var(--fr-space-16)_*_3))] flex-col [gap:var(--fr-space-2)]">
                {isInvitesLoading ? (
                  <div className="flex items-center justify-center flex-col [gap:var(--fr-space-4)] [color:var(--fr-text-secondary)]">
                    <Spinner size="md" />
                  </div>
                ) : (
                  <>
                    {pendingInvites.length === 0 && (
                      <p className="[margin:var(--fr-space-0)] [font-size:var(--fr-text-sm)] [color:var(--fr-text-secondary)]">
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
                <div className="flex items-center [gap:var(--fr-space-3)] [color:var(--fr-destructive)] [&_p]:[margin:var(--fr-space-0)]">
                  <p>{invitesErrorMessage}</p>
                  <Button type="button" variant="ghost" onClick={retryInvites}>
                    {translations.onboarding.states.retry}
                  </Button>
                </div>
              )}
              <p className="[margin:var(--fr-space-0)] [color:var(--fr-text-secondary)]">
                {translations.onboarding.invites.counter.replace(
                  '{{count}}',
                  String(pendingInvites.length),
                )}
              </p>
            </section>
          </div>
        </div>
      </main>
    </AppShell>
  )
}

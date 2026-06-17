import { Button, Spinner } from '@set-solutions-vof/design-system'
import { translations } from '@/lib/translations'
import type { Step4InviteTeamProps } from '@/types/onboardingView'
import { InviteRow } from '../components/InviteRow'
import { OnboardingIcon } from '../components/icons/OnboardingIcon'
import { useInvites } from '../hooks/useInvites'

export function Step4InviteTeam({
  onAuthenticationExpired,
}: Step4InviteTeamProps) {
  const {
    invites,
    isLoading,
    isSending,
    errorMessage,
    retry,
    sendInvite,
    removeInvite,
  } = useInvites({ onAuthenticationExpired })

  return (
    <section className="flex [min-height:100%] [width:min(100%,_calc(var(--fr-space-16)_*_5))] box-border flex-col [gap:var(--fr-space-6)] [padding:var(--fr-space-8)_var(--fr-space-7)] items-center">
      <div className="[color:var(--fr-status-approved-fg)] [background:var(--fr-status-approved-bg)] [border:var(--fr-border-width-sm)_solid_var(--fr-status-approved-border)] inline-flex items-center justify-center [width:var(--fr-space-9)] [height:var(--fr-space-9)] [border-radius:var(--fr-radius-lg)]" aria-hidden="true">
        <OnboardingIcon
          name="check"
          className="[width:var(--fr-space-5)] [height:var(--fr-space-5)] [stroke-width:2.25] block [width:var(--fr-space-4)] [height:var(--fr-space-4)] shrink-0 [width:var(--fr-space-5)] [height:var(--fr-space-5)]"
        />
      </div>
      <div className="[padding:var(--fr-space-7)_var(--fr-space-7)_var(--fr-space-0)] flex flex-col [gap:var(--fr-space-3)] [max-width:calc(var(--fr-space-16)_*_2_+_var(--fr-space-8))] [&_h1]:[margin:var(--fr-space-0)] [&_p]:[margin:var(--fr-space-0)] [&_span]:[margin:var(--fr-space-0)] [&_h1]:[font-size:var(--fr-text-xl)] [&_h1]:[font-weight:var(--fr-weight-semibold)] [&_h1]:[line-height:var(--fr-leading-snug)] [&_h1]:[color:var(--fr-text-primary)] [&_p]:[font-size:var(--fr-text-xs)] [&_p]:[font-weight:var(--fr-weight-medium)] [&_p]:[line-height:var(--fr-leading-snug)] [&_p]:[color:var(--fr-text-tertiary)] [&_p]:uppercase [&_span]:[font-size:var(--fr-text-base)] [&_span]:[line-height:var(--fr-leading-relaxed)] [&_span]:[color:var(--fr-text-secondary)] items-center text-center">
        <p>{translations.onboarding.invites.step_label}</p>
        <h1>{translations.onboarding.invites.title}</h1>
        <span>{translations.onboarding.invites.description}</span>
      </div>
      <div className="flex [width:min(100%,_calc(var(--fr-space-16)_*_3))] flex-col [gap:var(--fr-space-2)]">
        {isLoading ? (
          <div className="flex items-center justify-center flex-col [gap:var(--fr-space-4)] [color:var(--fr-text-secondary)] [&_h1]:[margin:var(--fr-space-0)] [&_p]:[margin:var(--fr-space-0)] [&_h1]:[font-size:var(--fr-text-xl)] [&_h1]:[line-height:var(--fr-leading-snug)] [&_h1]:[color:var(--fr-text-primary)]">
            <Spinner size="md" />
          </div>
        ) : (
          <>
            {invites.map((invite) => (
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
      {errorMessage !== null && (
        <div className="flex items-center [gap:var(--fr-space-3)] [color:var(--fr-destructive)] [&_p]:[margin:var(--fr-space-0)]">
          <p>{errorMessage}</p>
          <Button type="button" variant="ghost" onClick={retry}>
            {translations.onboarding.states.retry}
          </Button>
        </div>
      )}
      <p className="[margin:var(--fr-space-0)] [color:var(--fr-text-secondary)]">
        {translations.onboarding.invites.counter.replace(
          '{{count}}',
          String(invites.length),
        )}
      </p>
    </section>
  )
}

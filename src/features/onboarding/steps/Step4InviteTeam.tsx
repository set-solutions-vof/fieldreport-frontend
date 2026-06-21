import { Button, Spinner } from '@set-solutions-vof/design-system'
import { pageTitleClassName } from '@/components/pageTitleClassName'
import { translations } from '@/lib/translations'
import type { Step4InviteTeamProps } from '@/typing/onboardingView'
import { InviteRow } from '../components/InviteRow'
import { OnboardingIcon } from '../components/icons/OnboardingIcon'
import { useInvites } from '../hooks/useInvites'

const stepContentWidthClass = '[width:min(100%,calc(var(--fr-space-16)_*_3))]'

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
    <section
      className={`box-border flex flex-col items-center [gap:var(--fr-space-6)] [padding:var(--fr-space-7)] ${stepContentWidthClass}`}
    >
      <span
        className="[color:var(--fr-status-approved-fg)] [background:var(--fr-status-approved-bg)] [border:var(--fr-border-width-sm)_solid_var(--fr-status-approved-border)] inline-flex items-center justify-center [width:var(--fr-space-9)] [height:var(--fr-space-9)] [border-radius:var(--fr-radius-lg)]"
        aria-hidden="true"
      >
        <OnboardingIcon
          name="check"
          className="block [width:var(--fr-space-5)] [height:var(--fr-space-5)] [stroke-width:2.25]"
        />
      </span>
      <div
        className={`flex flex-col items-center text-center [gap:var(--fr-space-3)] ${stepContentWidthClass}`}
      >
        <span className="[font-size:var(--fr-text-xs)] [font-weight:var(--fr-weight-semibold)] [letter-spacing:var(--fr-tracking-label)] [color:var(--fr-text-tertiary)] uppercase">
          {translations.onboarding.invites.step_label}
        </span>
        <h1 className={pageTitleClassName}>
          {translations.onboarding.invites.title}
        </h1>
        <p className="[margin:var(--fr-space-0)] [max-width:calc(var(--fr-space-16)_+_var(--fr-space-12))] [font-size:var(--fr-text-sm)] [line-height:var(--fr-leading-snug)] [color:var(--fr-text-secondary)]">
          {translations.onboarding.invites.description}
        </p>
      </div>
      <div
        className={`flex flex-col [gap:var(--fr-space-2)] ${stepContentWidthClass}`}
      >
        {isLoading ? (
          <div className="flex flex-col items-center justify-center [gap:var(--fr-space-4)] [padding:var(--fr-space-6)_var(--fr-space-0)] [color:var(--fr-text-secondary)]">
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
              onSend={async (email, role) => {
                await sendInvite({ email, role })
              }}
            />
          </>
        )}
      </div>
      {errorMessage !== null && (
        <div className="flex items-center justify-center [gap:var(--fr-space-3)] [color:var(--fr-destructive)] [&_p]:[margin:var(--fr-space-0)]">
          <p>{errorMessage}</p>
          <Button type="button" variant="ghost" onClick={retry}>
            {translations.onboarding.states.retry}
          </Button>
        </div>
      )}
      <p className="[margin:var(--fr-space-0)] text-center [font-size:var(--fr-text-sm)] [line-height:var(--fr-leading-snug)] [color:var(--fr-text-secondary)]">
        {translations.onboarding.invites.counter.replace(
          '{{count}}',
          String(invites.length),
        )}
      </p>
    </section>
  )
}

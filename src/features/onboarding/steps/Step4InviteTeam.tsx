import { Button, Spinner } from '@/design-system'
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
    <section className="fr-onboarding-step fr-onboarding-step--invites">
      <div className="fr-onboarding-complete-mark" aria-hidden="true">
        <OnboardingIcon
          name="check"
          className="fr-onboarding-complete-mark__icon fr-onboarding-icon"
        />
      </div>
      <div className="fr-onboarding-step__header fr-onboarding-step__header--center">
        <p>{translations.onboarding.invites.step_label}</p>
        <h1>{translations.onboarding.invites.title}</h1>
        <span>{translations.onboarding.invites.description}</span>
      </div>
      <div className="fr-onboarding-invite-list">
        {isLoading ? (
          <div className="fr-onboarding-state">
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
        <div className="fr-onboarding-inline-error">
          <p>{errorMessage}</p>
          <Button type="button" variant="ghost" onClick={retry}>
            {translations.onboarding.states.retry}
          </Button>
        </div>
      )}
      <p className="fr-onboarding-invite-counter">
        {translations.onboarding.invites.counter.replace(
          '{{count}}',
          String(invites.length),
        )}
      </p>
    </section>
  )
}

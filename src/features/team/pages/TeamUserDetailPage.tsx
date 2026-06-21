import {
  Button,
  Card,
  Input,
  Spinner,
  Badge,
} from '@set-solutions-vof/design-system'
import { pageTitleClassName } from '@/components/pageTitleClassName'
import { translations } from '@/lib/translations'
import { teamUserDisplayName } from '@/typing/team'
import type { TeamUserDetailPageProps } from '@/typing/teamView'
import { TeamRoleField } from '../components/TeamRoleField'
import { useTeamUserDetail } from '../hooks/useTeamUserDetail'

export function TeamUserDetailPage({
  userId,
  onAuthenticationExpired,
  onCancel,
  onDeleted,
}: TeamUserDetailPageProps) {
  const {
    firstName,
    lastName,
    email,
    role,
    status,
    isLoading,
    isSaving,
    isDeleting,
    errorMessage,
    showSuccessToast,
    setFirstName,
    setLastName,
    setRole,
    handleSubmit,
    handleDelete,
  } = useTeamUserDetail({
    userId,
    onAuthenticationExpired,
    onDeleted,
  })

  if (isLoading) {
    return (
      <main className="flex [min-height:calc(100dvh_-_var(--fr-space-10))] flex-1 items-center justify-center [background:var(--fr-background)]">
        <Spinner size="md" />
      </main>
    )
  }

  const displayName = teamUserDisplayName({
    first_name: firstName,
    last_name: lastName,
  })

  return (
    <main className="grid [min-height:calc(100dvh_-_var(--fr-space-10))] [grid-template-rows:minmax(var(--fr-space-0),_1fr)_auto] [background:var(--fr-background)]">
      {showSuccessToast && (
        <div
          className="fixed [top:var(--fr-space-5)] [right:var(--fr-space-5)] [z-index:2] [padding:var(--fr-space-3)_var(--fr-space-4)] [color:var(--fr-status-approved-fg)] [background:var(--fr-status-approved-bg)] [border:var(--fr-border-width-sm)_solid_var(--fr-status-approved-border)] [border-radius:var(--fr-radius-lg)] [font-size:var(--fr-text-sm)] [font-weight:var(--fr-weight-medium)]"
          role="status"
        >
          {translations.team.user_detail.success_toast}
        </div>
      )}

      <div className="overflow-y-auto [padding:var(--fr-space-5)]">
        <div className="flex items-center [gap:var(--fr-space-3)] [margin-bottom:var(--fr-space-6)]">
          <h1 className={pageTitleClassName}>
            {displayName || translations.team.user_detail.title}
          </h1>
          <Badge variant={status === 'active' ? 'approved' : 'draft'}>
            {status === 'active'
              ? translations.team.status.active
              : translations.team.status.invited}
          </Badge>
        </div>

        <form
          id="team-user-detail-form"
          className="flex [width:min(100%,calc(var(--fr-space-16)_*_3))] flex-col [gap:var(--fr-space-5)]"
          noValidate
          onSubmit={(event) => void handleSubmit(event)}
        >
          <Card padding="lg">
            <h2 className="[margin:var(--fr-space-0)_var(--fr-space-0)_var(--fr-space-4)] [font-size:var(--fr-text-base)] [font-weight:var(--fr-weight-semibold)] [color:var(--fr-text-primary)]">
              {translations.team.invite_page.details_title}
            </h2>
            <div className="grid [grid-template-columns:repeat(2,_minmax(var(--fr-space-0),_1fr))] [gap:var(--fr-space-4)]">
              <Input
                label={translations.team.user_detail.first_name_label}
                value={firstName}
                onChange={(event) => setFirstName(event.currentTarget.value)}
                disabled={isSaving || isDeleting}
              />
              <Input
                label={translations.team.user_detail.last_name_label}
                value={lastName}
                onChange={(event) => setLastName(event.currentTarget.value)}
                disabled={isSaving || isDeleting}
              />
              <Input
                type="email"
                fieldClassName="[grid-column:1_/_-1]"
                label={translations.onboarding.invites.email_label}
                value={email}
                readOnly
                disabled
                className="[color:var(--fr-text-disabled)] cursor-not-allowed [background:var(--fr-surface-sunken)]"
              />
            </div>
          </Card>

          <Card padding="lg">
            <h2 className="[margin:var(--fr-space-0)_var(--fr-space-0)_var(--fr-space-2)] [font-size:var(--fr-text-base)] [font-weight:var(--fr-weight-semibold)] [color:var(--fr-text-primary)]">
              {translations.team.invite_page.role_title}
            </h2>
            <p className="[margin:var(--fr-space-0)_var(--fr-space-0)_var(--fr-space-4)] [font-size:var(--fr-text-sm)] [line-height:var(--fr-leading-snug)] [color:var(--fr-text-secondary)]">
              {translations.team.invite_page.role_description}
            </p>
            <TeamRoleField value={role} onChange={setRole} />
          </Card>

          {errorMessage !== null && (
            <p
              className="[margin:var(--fr-space-0)] [font-size:var(--fr-text-sm)] [color:var(--fr-destructive)]"
              role="alert"
            >
              {errorMessage}
            </p>
          )}
        </form>
      </div>

      <footer className="sticky [bottom:var(--fr-space-0)] flex shrink-0 items-center justify-between [gap:var(--fr-space-3)] [padding:var(--fr-space-4)_var(--fr-space-5)] [background:var(--fr-surface)] [border-top:var(--fr-border-width-sm)_solid_var(--fr-border)]">
        <Button
          type="button"
          variant="destructive"
          loading={isDeleting}
          disabled={isSaving}
          onClick={() => void handleDelete()}
        >
          {translations.team.user_detail.delete_button}
        </Button>
        <div className="flex [gap:var(--fr-space-3)]">
          <Button
            type="button"
            variant="ghost"
            disabled={isSaving || isDeleting}
            onClick={onCancel}
          >
            {translations.team.invite_page.cancel_button}
          </Button>
          <Button
            type="submit"
            form="team-user-detail-form"
            variant="primary"
            loading={isSaving}
            disabled={isDeleting}
          >
            {translations.team.user_detail.save_button}
          </Button>
        </div>
      </footer>
    </main>
  )
}

import { Logo } from '@set-solutions-vof/design-system'
import { translations } from '@/lib/translations'
import type { AppShellNavigationItem, AppShellProps } from '@/types/appShell'
import { UserProfileDropdown } from './UserProfileDropdown'

export type { AppShellProps } from '@/types/appShell'

export function AppShell({
  children,
  currentUser,
  activeNavigationItem = 'dashboard',
  breadcrumbItems = [{ label: translations.dashboard.navigation.dashboard }],
  contentClassName,
  totalReportsCount = 0,
  onOpenDashboard,
  onOpenReports,
  onOpenTemplate,
  onOpenTeam,
  onOpenProfile,
  onLogout,
}: AppShellProps) {
  return (
    <div className="grid [grid-template-columns:var(--fr-space-15)_minmax(var(--fr-space-0),_1fr)] min-h-[100dvh] [background:var(--fr-background)]">
      <aside className="sticky [top:var(--fr-space-0)] flex flex-col h-[100dvh] min-h-[100dvh] overflow-hidden [border-right:1px_solid_var(--fr-border)] [background:var(--fr-surface)]">
        <div className="flex items-center [height:var(--fr-space-10)] box-border [padding:var(--fr-space-0)_var(--fr-space-5)]">
          <Logo variant="accent" />
        </div>
        <nav
          className="flex flex-1 flex-col [gap:var(--fr-space-2)] [min-height:var(--fr-space-0)] overflow-y-auto [padding:var(--fr-space-4)_var(--fr-space-3)]"
          aria-label={translations.dashboard.navigation.workspace_label}
        >
          {onOpenDashboard !== undefined && (
            <>
              <span className="[margin-top:var(--fr-space-6)] [padding:var(--fr-space-0)_var(--fr-space-2)] [font-size:var(--fr-text-xs)] [font-weight:var(--fr-weight-semibold)] [line-height:var(--fr-leading-snug)] [color:var(--fr-text-tertiary)] uppercase first-child:[margin-top:var(--fr-space-0)]">
                {translations.dashboard.navigation.workspace_label}
              </span>
              <button
                className={navigationItemClassName(
                  activeNavigationItem,
                  'dashboard',
                )}
                type="button"
                onClick={onOpenDashboard}
                aria-current={
                  activeNavigationItem === 'dashboard' ? 'page' : undefined
                }
              >
                {translations.dashboard.navigation.dashboard}
              </button>
              <button
                className={navigationItemClassName(
                  activeNavigationItem,
                  'reports',
                )}
                type="button"
                onClick={onOpenReports}
                aria-current={
                  activeNavigationItem === 'reports' ? 'page' : undefined
                }
              >
                <span>{translations.dashboard.navigation.all_reports}</span>
                {totalReportsCount > 0 && (
                  <span className="inline-flex items-center justify-center [min-width:var(--fr-space-4)] [height:var(--fr-space-4)] [border-radius:var(--fr-radius-full)] [font-size:var(--fr-text-xs)] [font-weight:var(--fr-weight-semibold)] [color:var(--fr-text-secondary)] [background:var(--fr-surface-sunken)]">
                    {totalReportsCount}
                  </span>
                )}
              </button>
              <span className="[margin-top:var(--fr-space-6)] [padding:var(--fr-space-0)_var(--fr-space-2)] [font-size:var(--fr-text-xs)] [font-weight:var(--fr-weight-semibold)] [line-height:var(--fr-leading-snug)] [color:var(--fr-text-tertiary)] uppercase first-child:[margin-top:var(--fr-space-0)]">
                {translations.dashboard.navigation.settings_label}
              </span>
            </>
          )}
          {onOpenTemplate !== undefined && (
            <button
              className={navigationItemClassName(
                activeNavigationItem,
                'template',
              )}
              type="button"
              onClick={onOpenTemplate}
              aria-current={
                activeNavigationItem === 'template' ? 'page' : undefined
              }
            >
              {translations.dashboard.navigation.template}
            </button>
          )}
          {onOpenTeam !== undefined && (
            <button
              className={navigationItemClassName(activeNavigationItem, 'team')}
              type="button"
              onClick={onOpenTeam}
              aria-current={
                activeNavigationItem === 'team' ? 'page' : undefined
              }
            >
              {translations.dashboard.navigation.team}
            </button>
          )}
          {onOpenDashboard !== undefined && (
            <button
              className={navigationItemClassName(
                activeNavigationItem,
                'profile',
              )}
              type="button"
              onClick={onOpenProfile}
              aria-current={
                activeNavigationItem === 'profile' ? 'page' : undefined
              }
            >
              {translations.dashboard.navigation.profile}
            </button>
          )}
          {onOpenDashboard === undefined && (
            <button
              className={navigationItemClassName(
                activeNavigationItem,
                'profile',
              )}
              type="button"
              onClick={onOpenProfile}
              aria-current={
                activeNavigationItem === 'profile' ? 'page' : undefined
              }
            >
              {translations.dashboard.navigation.profile}
            </button>
          )}
        </nav>
        <UserProfileDropdown
          currentUser={currentUser}
          onOpenProfile={onOpenProfile}
          onLogout={onLogout}
        />
      </aside>
      <main className="flex [min-width:var(--fr-space-0)] flex-col [background:var(--fr-background)]">
        <header className="flex items-center [height:var(--fr-space-10)] box-border [padding:var(--fr-space-0)_var(--fr-space-7)] [border-bottom:1px_solid_var(--fr-border)] [background:var(--fr-surface)]">
          <p className="flex items-center [gap:var(--fr-space-2)] [margin:var(--fr-space-0)] [font-size:var(--fr-text-base)] [font-weight:var(--fr-weight-medium)] [line-height:var(--fr-leading-snug)] [color:var(--fr-text-tertiary)] [&_strong]:[color:var(--fr-text-primary)]">
            <span>{currentUser.company_name}</span>
            {breadcrumbItems.map((breadcrumbItem, breadcrumbItemIndex) => (
              <span
                className="inline-flex items-center [gap:var(--fr-space-2)]"
                key={`${breadcrumbItem.label}-${breadcrumbItemIndex}`}
              >
                <span>/</span>
                {breadcrumbItemIndex === breadcrumbItems.length - 1 ? (
                  <strong>{breadcrumbItem.label}</strong>
                ) : breadcrumbItem.onClick !== undefined ? (
                  <button
                    className="[padding:var(--fr-space-0)] [font:inherit] [color:inherit] cursor-pointer bg-transparent border-0 hover:[color:var(--fr-text-primary)]"
                    type="button"
                    onClick={breadcrumbItem.onClick}
                  >
                    {breadcrumbItem.label}
                  </button>
                ) : (
                  <span>{breadcrumbItem.label}</span>
                )}
              </span>
            ))}
          </p>
        </header>
        <div
          className={['flex flex-col [gap:var(--fr-space-7)] [padding:var(--fr-space-7)]', contentClassName]
            .filter(Boolean)
            .join(' ')}
        >
          {children}
        </div>
      </main>
    </div>
  )
}

function navigationItemClassName(
  activeNavigationItem: AppShellNavigationItem,
  navigationItem: AppShellNavigationItem,
): string {
  return [
    'flex items-center justify-between [min-height:var(--fr-control-height-lg)] [padding:var(--fr-space-0)_var(--fr-space-2)] [font:inherit] [font-weight:var(--fr-weight-medium)] [color:var(--fr-text-secondary)] cursor-pointer bg-transparent border-0 [border-radius:var(--fr-radius-lg)] hover:[color:var(--fr-text-primary)] hover:[background:var(--fr-surface-hover)]',
    activeNavigationItem === navigationItem && '[color:var(--fr-text-primary)] [background:var(--fr-surface-hover)]',
  ]
    .filter(Boolean)
    .join(' ')
}

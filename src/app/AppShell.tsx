import { Logo } from '@/design-system'
import { translations } from '@/lib/translations'
import type { AppShellNavigationItem, AppShellProps } from '@/types/appShell'
import { UserProfileDropdown } from './UserProfileDropdown'
import './AppShell.css'

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
    <div className="fr-dashboard-shell">
      <aside className="fr-dashboard-sidebar">
        <div className="fr-dashboard-brand">
          <Logo variant="accent" />
        </div>
        <nav
          className="fr-dashboard-nav"
          aria-label={translations.dashboard.navigation.workspace_label}
        >
          {onOpenDashboard !== undefined && (
            <>
              <span className="fr-dashboard-nav-label">
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
                  <span className="fr-dashboard-nav-count">
                    {totalReportsCount}
                  </span>
                )}
              </button>
              <span className="fr-dashboard-nav-label">
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
      <main className="fr-dashboard-page">
        <header className="fr-dashboard-topbar">
          <p className="fr-dashboard-breadcrumb">
            <span>{currentUser.company_name}</span>
            {breadcrumbItems.map((breadcrumbItem, breadcrumbItemIndex) => (
              <span
                className="fr-dashboard-breadcrumb-item"
                key={`${breadcrumbItem.label}-${breadcrumbItemIndex}`}
              >
                <span>/</span>
                {breadcrumbItemIndex === breadcrumbItems.length - 1 ? (
                  <strong>{breadcrumbItem.label}</strong>
                ) : breadcrumbItem.onClick !== undefined ? (
                  <button
                    className="fr-dashboard-breadcrumb-button"
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
          className={['fr-dashboard-content', contentClassName]
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
    'fr-dashboard-nav-item',
    activeNavigationItem === navigationItem && 'fr-dashboard-nav-item--active',
  ]
    .filter(Boolean)
    .join(' ')
}

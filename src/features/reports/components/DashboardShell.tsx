import { Logo } from '@/design-system'
import { translations } from '@/lib/translations'
import type {
  DashboardNavigationItem,
  DashboardShellProps,
} from '../types/reportView'
import { formatUserRole } from '../lib/formatUserRole'
import { getUserInitials } from '../lib/getUserInitials'
import './DashboardShell.css'

export function DashboardShell({
  children,
  currentUser,
  activeNavigationItem = 'dashboard',
  breadcrumbItems = ['Dashboard'],
  reportsToValidateCount = 0,
  totalReportsCount = 0,
}: DashboardShellProps) {
  const userInitials = getUserInitials(currentUser.name)
  const userRoleLabel = formatUserRole(currentUser.role)

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
          <span className="fr-dashboard-nav-label">
            {translations.dashboard.navigation.workspace_label}
          </span>
          <button
            className={navigationItemClassName(
              activeNavigationItem,
              'dashboard',
            )}
            type="button"
            aria-current={
              activeNavigationItem === 'dashboard' ? 'page' : undefined
            }
          >
            {translations.dashboard.navigation.dashboard}
          </button>
          <button
            className={navigationItemClassName(
              activeNavigationItem,
              'validation',
            )}
            type="button"
            aria-current={
              activeNavigationItem === 'validation' ? 'page' : undefined
            }
          >
            <span>{translations.dashboard.navigation.validation}</span>
            {reportsToValidateCount > 0 && (
              <span className="fr-dashboard-nav-count">
                {reportsToValidateCount}
              </span>
            )}
          </button>
          <button
            className={navigationItemClassName(activeNavigationItem, 'reports')}
            type="button"
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
          <button
            className={navigationItemClassName(
              activeNavigationItem,
              'locations',
            )}
            type="button"
            aria-current={
              activeNavigationItem === 'locations' ? 'page' : undefined
            }
          >
            {translations.dashboard.navigation.locations}
          </button>
          <span className="fr-dashboard-nav-label">
            {translations.dashboard.navigation.settings_label}
          </span>
          <button
            className={navigationItemClassName(activeNavigationItem, 'profile')}
            type="button"
            aria-current={
              activeNavigationItem === 'profile' ? 'page' : undefined
            }
          >
            {translations.dashboard.navigation.profile}
          </button>
        </nav>
        <div className="fr-dashboard-user">
          <span className="fr-dashboard-avatar">{userInitials}</span>
          <div>
            <strong>{currentUser.name}</strong>
            <span>
              {userRoleLabel} — {currentUser.company_name}
            </span>
          </div>
        </div>
      </aside>
      <main className="fr-dashboard-page">
        <header className="fr-dashboard-topbar">
          <p className="fr-dashboard-breadcrumb">
            <span>{currentUser.company_name}</span>
            {breadcrumbItems.map((breadcrumbItem, breadcrumbItemIndex) => (
              <span
                className="fr-dashboard-breadcrumb-item"
                key={`${breadcrumbItem}-${breadcrumbItemIndex}`}
              >
                <span>/</span>
                {breadcrumbItemIndex === breadcrumbItems.length - 1 ? (
                  <strong>{breadcrumbItem}</strong>
                ) : (
                  <span>{breadcrumbItem}</span>
                )}
              </span>
            ))}
          </p>
        </header>
        <div className="fr-dashboard-content">{children}</div>
      </main>
    </div>
  )
}

function navigationItemClassName(
  activeNavigationItem: DashboardNavigationItem,
  navigationItem: DashboardNavigationItem,
): string {
  return [
    'fr-dashboard-nav-item',
    activeNavigationItem === navigationItem && 'fr-dashboard-nav-item--active',
  ]
    .filter(Boolean)
    .join(' ')
}

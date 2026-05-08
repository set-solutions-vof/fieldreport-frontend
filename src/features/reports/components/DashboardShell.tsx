import { Logo } from '@/design-system'
import type { DashboardShellProps } from '@/types/reportView'
import './DashboardShell.css'

export function DashboardShell({
  children,
  reportsToValidateCount = 0,
  totalReportsCount = 0,
}: DashboardShellProps) {
  return (
    <div className="fr-dashboard-shell">
      <aside className="fr-dashboard-sidebar">
        <div className="fr-dashboard-brand">
          <Logo variant="accent" />
        </div>
        <nav className="fr-dashboard-nav" aria-label="Werkruimte">
          <span className="fr-dashboard-nav-label">Werkruimte</span>
          <button className="fr-dashboard-nav-item fr-dashboard-nav-item--active" type="button">
            Dashboard
          </button>
          <button className="fr-dashboard-nav-item" type="button">
            <span>Te valideren</span>
            {reportsToValidateCount > 0 && (
              <span className="fr-dashboard-nav-count">{reportsToValidateCount}</span>
            )}
          </button>
          <button className="fr-dashboard-nav-item" type="button">
            <span>Alle rapporten</span>
            {totalReportsCount > 0 && <span className="fr-dashboard-nav-count">{totalReportsCount}</span>}
          </button>
          <button className="fr-dashboard-nav-item" type="button">
            Locaties
          </button>
          <span className="fr-dashboard-nav-label">Instellingen</span>
          <button className="fr-dashboard-nav-item" type="button">
            Profiel
          </button>
        </nav>
        <div className="fr-dashboard-user">
          <span className="fr-dashboard-avatar">SD</span>
          <div>
            <strong>Sander D.</strong>
            <span>Inspector — LEKK BV</span>
          </div>
        </div>
      </aside>
      <main className="fr-dashboard-page">
        <header className="fr-dashboard-topbar">
          <p className="fr-dashboard-breadcrumb">
            <span>LEKK BV</span>
            <span>/</span>
            <strong>Dashboard</strong>
          </p>
        </header>
        <div className="fr-dashboard-content">{children}</div>
      </main>
    </div>
  )
}

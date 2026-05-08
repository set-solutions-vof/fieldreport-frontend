import { Spinner } from '@/design-system'
import { DashboardShell } from '../components/DashboardShell'
import { DashboardStats } from '../components/DashboardStats'
import { RecentReportsTable } from '../components/RecentReportsTable'
import { ValidationReportsSection } from '../components/ValidationReportsSection'
import { useReports } from '../hooks/useReports'
import type { DashboardPageProps } from '@/types/reportView'
import './DashboardPage.css'

export function DashboardPage({ onOpenReport }: DashboardPageProps) {
  const { reports, isLoading } = useReports()
  const reportsToValidate = reports.filter((report) => report.status === 'draft')
  const recentReports = reports.slice(0, 5)

  if (isLoading) {
    return (
      <DashboardShell>
        <div className="fr-dashboard-state">
          <Spinner size="lg" />
        </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell reportsToValidateCount={reportsToValidate.length} totalReportsCount={reports.length}>
      <section className="fr-dashboard-intro">
        <h1>Te valideren</h1>
        <p>
          {reportsToValidate.length} concepten wachten op je controle. Gemiddelde nog niet beschikbaar.
        </p>
      </section>
      <ValidationReportsSection reports={reportsToValidate} onOpenReport={onOpenReport} />
      <DashboardStats reports={reports} />
      <RecentReportsTable reports={recentReports} />
    </DashboardShell>
  )
}

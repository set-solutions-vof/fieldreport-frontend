import { useMemo } from 'react'
import { Button, Spinner } from '@set-solutions-vof/design-system'
import { pageTitleClassName } from '@/components/pageTitleClassName'
import { translations } from '@/lib/translations'
import { currentUserDisplayName } from '@/typing/auth'
import type { AdminHomePageProps } from '@/typing/adminHome'
import { AdminPerformanceChart } from '../components/AdminPerformanceChart'
import { AdminPerformanceOverview } from '../components/AdminPerformanceOverview'
import { useAdminHomeStats } from '../hooks/useAdminHomeStats'

export function AdminHomePage({
  currentUser,
  onAuthenticationExpired,
}: AdminHomePageProps) {
  const greetingName = useMemo(
    () => currentUserDisplayName(currentUser),
    [currentUser],
  )
  const {
    isLoading,
    errorMessage,
    dateRange,
    dateRangePreset,
    chartMetric,
    userFilterId,
    userFilterOptions,
    summaryStats,
    metrics,
    chartPoints,
    setDateRange,
    setChartMetric,
    setUserFilterId,
    retry,
  } = useAdminHomeStats({ onAuthenticationExpired })

  return (
    <main className="flex [min-height:calc(100dvh_-_var(--fr-space-10))] flex-1 flex-col [background:var(--fr-background)]">
      <div className="flex [width:100%] shrink-0 [padding:var(--fr-space-5)_var(--fr-space-5)_var(--fr-space-0)]">
        <h1 className={pageTitleClassName}>
          {translations.admin_home.greeting.replace('{{name}}', greetingName)}
        </h1>
      </div>

      <div className="mx-[var(--fr-space-5)] mb-[var(--fr-space-5)] mt-[var(--fr-space-4)] flex [min-height:var(--fr-space-0)] flex-1 flex-col [gap:var(--fr-space-5)] [padding:var(--fr-space-5)] [border:var(--fr-border-width-sm)_solid_var(--fr-border)] [border-radius:var(--fr-radius-lg)] [background:var(--fr-surface)] [box-shadow:var(--fr-shadow-md)]">
        {isLoading ? (
          <div className="flex flex-1 flex-col items-center justify-center [gap:var(--fr-space-4)] [padding:var(--fr-space-8)] [color:var(--fr-text-secondary)]">
            <Spinner size="md" />
          </div>
        ) : errorMessage !== null ? (
          <div className="flex items-center [gap:var(--fr-space-3)] [color:var(--fr-destructive)] [&_p]:[margin:var(--fr-space-0)]">
            <p>{errorMessage}</p>
            <Button type="button" variant="ghost" onClick={retry}>
              {translations.onboarding.states.retry}
            </Button>
          </div>
        ) : (
          <>
            <AdminPerformanceOverview
              summaryStats={summaryStats}
              metrics={metrics}
              dateRange={dateRange}
              dateRangePreset={dateRangePreset}
              userFilterId={userFilterId}
              userFilterOptions={userFilterOptions}
              onDateRangeChange={setDateRange}
              onUserFilterChange={setUserFilterId}
            />
            <AdminPerformanceChart
              points={chartPoints}
              metric={chartMetric}
              onMetricChange={setChartMetric}
            />
          </>
        )}
      </div>
    </main>
  )
}

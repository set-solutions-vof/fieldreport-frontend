import { useCallback, useEffect, useMemo, useState } from 'react'
import { getReports } from '@/lib/api/reports'
import { listTeamUsers } from '@/lib/api/team'
import { AuthenticationExpiredError } from '@/lib/api/authenticatedFetch'
import { translations } from '@/lib/translations'
import type { ReportSummary } from '@/typing/report'
import type { TeamUser } from '@/typing/team'
import type {
  AdminHomeChartMetric,
  AdminHomeDateRange,
  AdminHomeDateRangePreset,
  AdminHomeUserFilterId,
  UseAdminHomeStatsParameters,
} from '@/typing/adminHome'
import { buildAdminHomeDailySeries } from '../lib/adminHomeSeries'
import {
  buildAdminHomeMetrics,
  buildAdminHomeSummaryStats,
} from '../lib/adminHomeMetrics'
import { buildAdminHomeDateRangePreset } from '../lib/adminHomeDateRange'
import {
  buildTeamUserFilterOptions,
  filterReportsForUser,
} from '../lib/adminHomeUserFilter'

export function useAdminHomeStats({
  onAuthenticationExpired,
}: UseAdminHomeStatsParameters) {
  const [reports, setReports] = useState<ReportSummary[]>([])
  const [teamUsers, setTeamUsers] = useState<TeamUser[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [dateRange, setDateRange] = useState<AdminHomeDateRange>(() =>
    buildAdminHomeDateRangePreset('last_30_days'),
  )
  const [dateRangePreset, setDateRangePreset] =
    useState<AdminHomeDateRangePreset>('last_30_days')
  const [chartMetric, setChartMetric] =
    useState<AdminHomeChartMetric>('reports')
  const [userFilterId, setUserFilterId] = useState<AdminHomeUserFilterId>('all')

  const fetchStats = useCallback((): void => {
    void Promise.all([getReports(), listTeamUsers()])
      .then(([loadedReports, loadedTeamUsers]) => {
        setReports(loadedReports)
        setTeamUsers(loadedTeamUsers)
        setIsLoading(false)
      })
      .catch((error: unknown) => {
        if (error instanceof AuthenticationExpiredError) {
          onAuthenticationExpired()
          return
        }

        setErrorMessage(translations.admin_home.errors.load_failed)
        setIsLoading(false)
      })
  }, [onAuthenticationExpired])

  const loadStats = useCallback((): void => {
    setIsLoading(true)
    setErrorMessage(null)
    fetchStats()
  }, [fetchStats])

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  const userFilterOptions = useMemo(
    () => buildTeamUserFilterOptions(teamUsers),
    [teamUsers],
  )

  const filteredReports = useMemo(
    () => filterReportsForUser(reports, teamUsers, userFilterId),
    [reports, teamUsers, userFilterId],
  )

  const statsInput = useMemo(
    () =>
      isLoading
        ? null
        : {
            reports: filteredReports,
            teamUsers,
            dateRange,
          },
    [dateRange, filteredReports, isLoading, teamUsers],
  )

  const summaryStats = useMemo(
    () => (statsInput === null ? [] : buildAdminHomeSummaryStats(statsInput)),
    [statsInput],
  )
  const metrics = useMemo(
    () => (statsInput === null ? [] : buildAdminHomeMetrics(statsInput)),
    [statsInput],
  )
  const chartPoints = useMemo(
    () =>
      statsInput === null
        ? []
        : buildAdminHomeDailySeries(
            statsInput.reports,
            statsInput.dateRange,
            chartMetric,
          ),
    [chartMetric, statsInput],
  )

  function handleDateRangeChange(
    nextRange: AdminHomeDateRange,
    nextPreset: AdminHomeDateRangePreset,
  ): void {
    setDateRange(nextRange)
    setDateRangePreset(nextPreset)
  }

  return {
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
    setDateRange: handleDateRangeChange,
    setChartMetric,
    setUserFilterId,
    retry: loadStats,
  }
}

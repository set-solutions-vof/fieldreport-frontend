import type {
  AdminHomeMetric,
  AdminHomeStatsInput,
  AdminHomeSummaryStat,
} from '@/typing/adminHome'
import { translations } from '@/lib/translations'
import {
  buildAdminHomeDailySeries,
  formatApprovalRate,
  reportsThisMonth,
  reportsWithinRange,
} from './adminHomeSeries'

function formatContextDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function onContextLabel(date: Date): string {
  return translations.admin_home.metrics.on_context.replace(
    '{{date}}',
    formatContextDate(date),
  )
}

export function buildAdminHomeSummaryStats(
  input: AdminHomeStatsInput,
): AdminHomeSummaryStat[] {
  return [
    {
      id: 'team-members',
      label: translations.admin_home.summary.team_members,
      value: String(input.teamUsers.length),
      hint: translations.admin_home.summary.team_members_hint,
    },
    {
      id: 'total-reports',
      label: translations.admin_home.summary.total_reports,
      value: String(input.reports.length),
      hint: translations.admin_home.summary.total_reports_hint,
    },
  ]
}

export function buildAdminHomeMetrics(
  input: AdminHomeStatsInput,
): AdminHomeMetric[] {
  const reportSeries = buildAdminHomeDailySeries(
    input.reports,
    input.dateRange,
    'reports',
  )
  const approvedSeries = buildAdminHomeDailySeries(
    input.reports,
    input.dateRange,
    'approved',
  )
  const draftSeries = buildAdminHomeDailySeries(
    input.reports,
    input.dateRange,
    'draft',
  )

  const reportsInRange = reportsWithinRange(input.reports, input.dateRange)
  const approvedInRange = reportsInRange.filter(
    (report) => report.status === 'approved',
  )
  const draftInRange = reportsInRange.filter(
    (report) => report.status === 'draft',
  )
  const averageContext = translations.admin_home.metrics.average_context

  return [
    {
      id: 'reports-this-month',
      label: translations.admin_home.metrics.reports_this_month,
      contextLabel: onContextLabel(new Date()),
      value: String(reportsThisMonth(input.reports).length),
      series: reportSeries,
    },
    {
      id: 'awaiting-validation',
      label: translations.admin_home.metrics.awaiting_validation,
      contextLabel: averageContext,
      value: String(draftInRange.length),
      series: draftSeries,
    },
    {
      id: 'approved',
      label: translations.admin_home.metrics.approved,
      contextLabel: averageContext,
      value: String(approvedInRange.length),
      series: approvedSeries,
    },
    {
      id: 'approval-rate',
      label: translations.admin_home.metrics.approval_rate,
      contextLabel: averageContext,
      value: formatApprovalRate(approvedInRange.length, reportsInRange.length),
      series: approvedSeries,
    },
  ]
}

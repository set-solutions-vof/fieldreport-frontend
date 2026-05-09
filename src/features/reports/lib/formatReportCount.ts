export function formatReportCount(reportCount: number): string {
  if (reportCount === 0) {
    return 'Geen rapporten'
  }

  if (reportCount === 1) {
    return '1 rapport'
  }

  return `${reportCount} rapporten`
}

import type { ReportSummary } from '@/typing/report'
import type {
  AdminHomeUserFilterId,
  AdminHomeUserFilterOption,
} from '@/typing/adminHome'
import { teamUserDisplayName, type TeamUser } from '@/typing/team'

export function filterReportsForUser(
  reports: ReportSummary[],
  teamUsers: TeamUser[],
  userFilterId: AdminHomeUserFilterId,
): ReportSummary[] {
  if (userFilterId === 'all') {
    return reports
  }

  const user = teamUsers.find((teamUser) => teamUser.id === userFilterId)
  if (user === undefined) {
    return reports
  }

  const userName = teamUserDisplayName(user)
  return reports.filter((report) => report.inspector_name === userName)
}

export function buildTeamUserFilterOptions(
  teamUsers: TeamUser[],
): AdminHomeUserFilterOption[] {
  return teamUsers
    .filter((user) => user.status === 'active')
    .sort((leftUser, rightUser) =>
      teamUserDisplayName(leftUser).localeCompare(
        teamUserDisplayName(rightUser),
      ),
    )
    .map((user) => ({
      id: user.id,
      label: teamUserDisplayName(user),
    }))
}

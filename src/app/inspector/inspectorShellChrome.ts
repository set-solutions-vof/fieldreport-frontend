import { translations } from '@/lib/translations'
import type { AppChromeDefaults } from '@/typing/appChrome'
import type { ReportRouteMatch } from '@/typing/routes'
import {
  allReportsRoute,
  dashboardRoute,
  newReportRoute,
  profileRoute,
} from '../routes'

type InspectorShellNavigation = {
  onOpenDashboard: () => void
  onOpenReports: () => void
}

export function inspectorShellChrome(
  currentPath: string,
  reportRoute: ReportRouteMatch | null,
  navigation: InspectorShellNavigation,
): AppChromeDefaults {
  if (currentPath === dashboardRoute) {
    return {
      activeNavigationItem: 'dashboard',
      breadcrumbItems: [{ label: translations.dashboard.navigation.dashboard }],
    }
  }

  if (currentPath === allReportsRoute) {
    return {
      activeNavigationItem: 'reports',
      breadcrumbItems: [
        { label: translations.dashboard.navigation.all_reports },
      ],
    }
  }

  if (currentPath === newReportRoute) {
    return {
      activeNavigationItem: 'dashboard',
      breadcrumbItems: [
        {
          label: translations.dashboard.navigation.dashboard,
          onClick: navigation.onOpenDashboard,
        },
        { label: translations.new_report.page_title },
      ],
      contentClassName: '[gap:var(--fr-space-0)]',
    }
  }

  if (currentPath === profileRoute) {
    return {
      activeNavigationItem: 'profile',
      breadcrumbItems: [{ label: translations.dashboard.navigation.profile }],
    }
  }

  if (reportRoute !== null) {
    return {
      activeNavigationItem:
        reportRoute.source === 'dashboard' ? 'dashboard' : 'reports',
      breadcrumbItems: [
        {
          label:
            reportRoute.source === 'dashboard'
              ? translations.dashboard.navigation.dashboard
              : translations.dashboard.navigation.all_reports,
          onClick:
            reportRoute.source === 'dashboard'
              ? navigation.onOpenDashboard
              : navigation.onOpenReports,
        },
        { label: translations.report_detail.tabs.report },
      ],
    }
  }

  return {
    activeNavigationItem: 'dashboard',
    breadcrumbItems: [{ label: translations.dashboard.navigation.dashboard }],
  }
}

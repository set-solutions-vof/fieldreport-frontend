import { translations } from '@/lib/translations'
import type { AppChromeDefaults } from '@/typing/appChrome'
import {
  adminTeamInviteRoute,
  adminTeamRoute,
  adminTeamUserIdFromPath,
  profileRoute,
  templateRoute,
} from '../routes'

const adminContentClassName =
  '[gap:var(--fr-space-0)] [padding:var(--fr-space-0)]'

type AdminShellNavigation = {
  onOpenHome: () => void
  onOpenTeam: () => void
}

export function adminShellChrome(
  currentPath: string,
  navigation: AdminShellNavigation,
): AppChromeDefaults {
  const teamUserId = adminTeamUserIdFromPath(currentPath)

  if (teamUserId !== null) {
    return {
      activeNavigationItem: 'team',
      breadcrumbItems: [
        {
          label: translations.team.navigation_label,
          onClick: navigation.onOpenTeam,
        },
        { label: translations.team.user_detail.title },
      ],
      contentClassName: adminContentClassName,
    }
  }

  if (currentPath === adminTeamInviteRoute) {
    return {
      activeNavigationItem: 'team',
      breadcrumbItems: [
        {
          label: translations.team.navigation_label,
          onClick: navigation.onOpenTeam,
        },
        { label: translations.team.invite_page.title },
      ],
      contentClassName: adminContentClassName,
    }
  }

  if (currentPath === adminTeamRoute) {
    return {
      activeNavigationItem: 'team',
      breadcrumbItems: [{ label: translations.team.navigation_label }],
      contentClassName: adminContentClassName,
    }
  }

  if (currentPath === profileRoute) {
    return {
      activeNavigationItem: 'profile',
      breadcrumbItems: [{ label: translations.dashboard.navigation.profile }],
      contentClassName: adminContentClassName,
    }
  }

  if (currentPath === templateRoute) {
    return {
      activeNavigationItem: 'template',
      breadcrumbItems: [{ label: translations.template.navigation_label }],
      contentClassName: adminContentClassName,
    }
  }

  return {
    activeNavigationItem: 'dashboard',
    breadcrumbItems: [{ label: translations.admin_home.navigation_label }],
  }
}

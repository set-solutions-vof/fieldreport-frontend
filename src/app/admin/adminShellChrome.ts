import { translations } from '@/lib/translations'
import type { AppChromeDefaults } from '@/typing/appChrome'
import { adminTeamRoute, profileRoute } from '../routes'

export function adminShellChrome(currentPath: string): AppChromeDefaults {
  if (currentPath === adminTeamRoute) {
    return {
      activeNavigationItem: 'team',
      breadcrumbItems: [{ label: translations.team.navigation_label }],
    }
  }

  if (currentPath === profileRoute) {
    return {
      activeNavigationItem: 'profile',
      breadcrumbItems: [{ label: translations.dashboard.navigation.profile }],
    }
  }

  return {
    activeNavigationItem: 'template',
    breadcrumbItems: [{ label: translations.template.navigation_label }],
    contentClassName: '[gap:var(--fr-space-0)] [padding:var(--fr-space-0)]',
  }
}

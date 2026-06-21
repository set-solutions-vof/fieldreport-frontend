import { useCallback, useEffect, useState } from 'react'
import { AppChromeProvider } from '@/app/AppChromeProvider'
import { AdminHomePage } from '@/features/admin/pages/AdminHomePage'
import { AccountProfilePage } from '@/features/profile/AccountProfilePage'
import { TeamInvitePage } from '@/features/team/pages/TeamInvitePage'
import { TeamPage } from '@/features/team/pages/TeamPage'
import { TeamUserDetailPage } from '@/features/team/pages/TeamUserDetailPage'
import { TemplateConfigurationPage } from '@/features/templates/pages/TemplateConfigurationPage'
import type { AdminRouterProps } from '@/typing/routes'
import { adminShellChrome } from './adminShellChrome'
import {
  adminHomeRoute,
  adminTeamInviteRoute,
  adminTeamRoute,
  adminTeamUserIdFromPath,
  adminTeamUserRoute,
  profileRoute,
  templateRoute,
} from '../routes'

export function AdminRouter({
  currentUser,
  onAuthenticationExpired,
  onLogout,
}: AdminRouterProps) {
  const [currentPath, setCurrentPath] = useState(() => {
    const path = window.location.pathname
    const resolvedPath = resolveAdminPath(path)
    if (resolvedPath !== path) {
      window.history.replaceState(null, '', resolvedPath)
    }
    return resolvedPath
  })

  const navigate = useCallback((path: string): void => {
    const resolvedPath = resolveAdminPath(path)
    window.history.pushState(null, '', resolvedPath)
    setCurrentPath(resolvedPath)
  }, [])

  useEffect(() => {
    function handlePopState(): void {
      const resolvedPath = resolveAdminPath(window.location.pathname)
      if (resolvedPath !== window.location.pathname) {
        window.history.replaceState(null, '', resolvedPath)
      }
      setCurrentPath(resolvedPath)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const onOpenHome = useCallback((): void => {
    navigate(adminHomeRoute)
  }, [navigate])

  const onOpenTemplate = useCallback((): void => {
    navigate(templateRoute)
  }, [navigate])

  const onOpenTeam = useCallback((): void => {
    navigate(adminTeamRoute)
  }, [navigate])

  const onOpenProfile = useCallback((): void => {
    navigate(profileRoute)
  }, [navigate])

  const sharedPageProps = {
    currentUser,
    onOpenHome,
    onOpenTemplate,
    onOpenTeam,
    onOpenProfile,
    onAuthenticationExpired,
    onLogout,
  }

  let content

  const teamUserId = adminTeamUserIdFromPath(currentPath)

  if (teamUserId !== null) {
    content = (
      <TeamUserDetailPage
        {...sharedPageProps}
        userId={teamUserId}
        onCancel={onOpenTeam}
        onDeleted={onOpenTeam}
      />
    )
  } else if (currentPath === adminTeamRoute) {
    content = (
      <TeamPage
        {...sharedPageProps}
        onOpenTeamInvite={() => navigate(adminTeamInviteRoute)}
        onOpenTeamUser={(userId) => navigate(adminTeamUserRoute(userId))}
      />
    )
  } else if (currentPath === adminTeamInviteRoute) {
    content = <TeamInvitePage {...sharedPageProps} onCancel={onOpenTeam} />
  } else if (currentPath === profileRoute) {
    content = <AccountProfilePage {...sharedPageProps} onCancel={onOpenHome} />
  } else if (currentPath === templateRoute) {
    content = <TemplateConfigurationPage {...sharedPageProps} />
  } else {
    content = <AdminHomePage {...sharedPageProps} />
  }

  return (
    <AppChromeProvider
      key={currentPath}
      currentUser={currentUser}
      defaultChrome={adminShellChrome(currentPath, {
        onOpenHome,
        onOpenTeam,
      })}
      navigation={{
        onOpenHome,
        onOpenTemplate,
        onOpenTeam,
        onOpenProfile,
        onLogout,
      }}
    >
      {content}
    </AppChromeProvider>
  )
}

function resolveAdminPath(path: string): string {
  const teamUserId = adminTeamUserIdFromPath(path)

  if (teamUserId !== null) {
    return adminTeamUserRoute(teamUserId)
  }

  if (path === adminTeamInviteRoute) {
    return adminTeamInviteRoute
  }

  if (path === adminTeamRoute) {
    return adminTeamRoute
  }

  if (path === profileRoute) {
    return profileRoute
  }

  if (path === templateRoute) {
    return templateRoute
  }

  return adminHomeRoute
}

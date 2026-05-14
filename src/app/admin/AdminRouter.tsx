import { useCallback, useEffect } from 'react'
import { TemplateConfigurationPage } from '@/features/templates/pages/TemplateConfigurationPage'
import { templateRoute } from '../routes'

type AdminRouterProps = {
  onAuthenticationExpired: () => void
}

export function AdminRouter({ onAuthenticationExpired }: AdminRouterProps) {
  const openTemplate = useCallback((): void => {
    if (window.location.pathname !== templateRoute) {
      window.history.pushState(null, '', templateRoute)
    }
  }, [])

  useEffect(() => {
    function normalizePath(): void {
      if (window.location.pathname !== templateRoute) {
        window.history.replaceState(null, '', templateRoute)
      }
    }

    normalizePath()
    window.addEventListener('popstate', normalizePath)
    return () => window.removeEventListener('popstate', normalizePath)
  }, [])

  return (
    <TemplateConfigurationPage
      onOpenTemplate={openTemplate}
      onAuthenticationExpired={onAuthenticationExpired}
    />
  )
}

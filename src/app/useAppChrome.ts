import { useContext, useEffect } from 'react'
import { AppChromeContext } from '@/app/appChromeContext'
import type { AppChromeOverrides } from '@/typing/appChrome'

export function useAppChrome(overrides: AppChromeOverrides): void {
  const context = useContext(AppChromeContext)
  const breadcrumbKey = overrides.breadcrumbItems
    ?.map((item) => item.label)
    .join('|')

  useEffect(() => {
    if (context === null) {
      return
    }

    context.setOverrides({
      activeNavigationItem: overrides.activeNavigationItem,
      breadcrumbItems: overrides.breadcrumbItems,
      contentClassName: overrides.contentClassName,
      currentUser: overrides.currentUser,
    })

    return () => {
      context.setOverrides({})
    }
  }, [
    context,
    overrides.activeNavigationItem,
    overrides.breadcrumbItems,
    overrides.contentClassName,
    overrides.currentUser,
    breadcrumbKey,
  ])
}

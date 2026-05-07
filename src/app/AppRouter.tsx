import { useEffect, useState } from 'react'
import { Logo } from '@/design-system'
import { LoginPage } from '@/features/auth/LoginPage'
import './AppRouter.css'

function getCurrentPath(): string {
  return window.location.pathname
}

export function AppRouter() {
  const [currentPath, setCurrentPath] = useState(getCurrentPath)

  useEffect(() => {
    function handlePopState(): void {
      setCurrentPath(getCurrentPath())
    }

    window.addEventListener('popstate', handlePopState)

    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  function navigate(path: string): void {
    window.history.pushState(null, '', path)
    setCurrentPath(path)
  }

  if (currentPath === '/dashboard') {
    return (
      <main className="fr-dashboard-placeholder">
        <Logo variant="accent" />
        <h1>Dashboard</h1>
      </main>
    )
  }

  return <LoginPage onLoginSuccess={() => navigate('/dashboard')} />
}

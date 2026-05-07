import { useState, useEffect } from 'react'
import { getReports } from '@/lib/api/reports'
import type { Report } from '@/types'

type State =
  | { status: 'loading' }
  | { status: 'success'; reports: Report[] }
  | { status: 'error'; message: string }

export function useReports() {
  const [state, setState] = useState<State>({ status: 'loading' })

  useEffect(() => {
    let cancelled = false
    getReports()
      .then((reports) => {
        if (!cancelled) setState({ status: 'success', reports })
      })
      .catch((err: unknown) => {
        if (!cancelled)
          setState({
            status: 'error',
            message: err instanceof Error ? err.message : 'Laden mislukt',
          })
      })
    return () => {
      cancelled = true
    }
  }, [])

  return state
}

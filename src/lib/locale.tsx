import { useCallback, useState, type ReactNode } from 'react'
import { LocaleContext } from '@/lib/localeContext'
import { getLocale, setLocale as applyLocale, type Locale } from '@/lib/translations'

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => getLocale())

  const setLocale = useCallback((next: Locale) => {
    applyLocale(next)
    setLocaleState(next)
  }, [])

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  )
}

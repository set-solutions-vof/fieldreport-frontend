import { useContext } from 'react'
import { LocaleContext } from '@/lib/localeContext'

export function useLocale() {
  const context = useContext(LocaleContext)
  if (context === null) {
    throw new Error('useLocale must be used within LocaleProvider')
  }
  return context
}

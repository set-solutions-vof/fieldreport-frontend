import nlTranslations from '@/translations/nl'
import enTranslations from '@/translations/en'

export type Locale = 'nl' | 'en'

const catalogs = {
  nl: nlTranslations,
  en: enTranslations,
} as const

const STORAGE_KEY = 'fieldreport.locale'

function readStoredLocale(): Locale {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored === 'en' ? 'en' : 'nl'
}

let activeLocale: Locale = readStoredLocale()

export let translations = catalogs[activeLocale]

export function getLocale(): Locale {
  return activeLocale
}

export function setLocale(locale: Locale): void {
  activeLocale = locale
  translations = catalogs[locale]
  localStorage.setItem(STORAGE_KEY, locale)
  document.documentElement.lang = locale === 'nl' ? 'nl' : 'en'
}

setLocale(activeLocale)

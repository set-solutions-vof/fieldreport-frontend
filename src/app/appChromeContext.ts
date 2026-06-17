import { createContext } from 'react'
import type { AppChromeContextValue } from '@/typing/appChrome'

export const AppChromeContext = createContext<AppChromeContextValue | null>(
  null,
)

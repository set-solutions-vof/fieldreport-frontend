import { AppRouter } from '@/app/AppRouter'
import { LocaleProvider } from '@/lib/locale'

export default function App() {
  return (
    <LocaleProvider>
      <div className="fr-app">
        <AppRouter />
      </div>
    </LocaleProvider>
  )
}

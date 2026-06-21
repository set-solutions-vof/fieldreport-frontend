import { Input } from '@set-solutions-vof/design-system'
import type { ChangeEvent } from 'react'
import { translations } from '@/lib/translations'

type TeamToolbarProps = {
  resultCount: number
  searchQuery: string
  onSearchQueryChange: (query: string) => void
}

export function TeamToolbar({
  resultCount,
  searchQuery,
  onSearchQueryChange,
}: TeamToolbarProps) {
  function handleSearchChange(event: ChangeEvent<HTMLInputElement>): void {
    onSearchQueryChange(event.currentTarget.value)
  }

  return (
    <div className="flex items-center justify-between [gap:var(--fr-space-4)] [padding:var(--fr-space-4)_var(--fr-space-5)] [border-bottom:var(--fr-border-width-sm)_solid_var(--fr-border)]">
      <p className="[margin:var(--fr-space-0)] [font-size:var(--fr-text-sm)] [font-weight:var(--fr-weight-medium)] [color:var(--fr-text-secondary)]">
        {translations.team.results_count.replace(
          '{{count}}',
          String(resultCount),
        )}
      </p>
      <Input
        type="search"
        placeholder={translations.team.search_placeholder}
        value={searchQuery}
        onChange={handleSearchChange}
        fieldClassName="[width:min(100%,calc(var(--fr-space-16)_+_var(--fr-space-12)))]"
      />
    </div>
  )
}

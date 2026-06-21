import { translations } from '@/lib/translations'
import type { AdminTeamUserFilterProps } from '@/typing/adminHomeView'

export function AdminTeamUserFilter({
  value,
  options,
  onChange,
}: AdminTeamUserFilterProps) {
  return (
    <select
      className="[min-height:var(--fr-control-height-md)] [padding:var(--fr-space-1)_var(--fr-space-3)] [font:inherit] [font-size:var(--fr-text-sm)] [color:var(--fr-text-primary)] [background:var(--fr-surface)] [border:var(--fr-border-width-sm)_solid_var(--fr-border)] [border-radius:var(--fr-radius-md)] [transition:var(--fr-transition-base)] hover:[border-color:color-mix(in_oklch,var(--fr-accent)_35%,var(--fr-border))]"
      aria-label={translations.admin_home.user_filter.aria_label}
      value={value}
      onChange={(event) => onChange(event.currentTarget.value)}
    >
      <option value="all">
        {translations.admin_home.user_filter.all_option}
      </option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

import { getLocale, translations } from '@/lib/translations'
import type { AdminHomeDateRangePreset } from '@/typing/adminHome'
import type { AdminDateRangePresetListProps } from '@/typing/adminHomeView'
import {
  buildAdminHomeDateRangePreset,
  parseIsoDate,
} from '../lib/adminHomeDateRange'

const presetOrder: AdminHomeDateRangePreset[] = [
  'custom',
  'today',
  'yesterday',
  'last_7_days',
  'last_30_days',
  'month_to_date',
]

const presetLabels: Record<AdminHomeDateRangePreset, string> = {
  custom: translations.admin_home.date_range.custom_range,
  today: translations.admin_home.date_range.today,
  yesterday: translations.admin_home.date_range.yesterday,
  last_7_days: translations.admin_home.date_range.last_7_days,
  last_30_days: translations.admin_home.date_range.last_30_days,
  month_to_date: translations.admin_home.date_range.month_to_date,
}

function formatPresetDateLabel(isoDate: string): string {
  return new Intl.DateTimeFormat(getLocale() === 'nl' ? 'nl-NL' : 'en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(parseIsoDate(isoDate))
}

function formatPresetSubtitle(preset: AdminHomeDateRangePreset): string | null {
  if (preset === 'custom') {
    return null
  }

  const range = buildAdminHomeDateRangePreset(preset)
  return `${formatPresetDateLabel(range.startDate)} - ${formatPresetDateLabel(range.endDate)}`
}

export function AdminDateRangePresetList({
  draftPreset,
  onPresetSelect,
}: AdminDateRangePresetListProps) {
  return (
    <div className="flex w-[calc(var(--fr-space-16)_+_var(--fr-space-8))] shrink-0 flex-col [padding:var(--fr-space-3)_var(--fr-space-0)] [border-right:var(--fr-border-width-sm)_solid_var(--fr-border)] [background:var(--fr-surface-sunken)]">
      {presetOrder.map((presetOption) => {
        const isActive = draftPreset === presetOption
        const subtitle = formatPresetSubtitle(presetOption)

        return (
          <button
            key={presetOption}
            type="button"
            className={[
              'flex items-start [gap:var(--fr-space-2)] [width:100%] [padding:var(--fr-space-3)_var(--fr-space-4)] text-left [font:inherit] [transition:var(--fr-transition-base)]',
              isActive
                ? '[background:var(--fr-surface)]'
                : 'hover:[background:color-mix(in_oklch,var(--fr-accent)_6%,var(--fr-surface-sunken))]',
            ].join(' ')}
            onClick={() => onPresetSelect(presetOption)}
          >
            <span
              className={[
                'inline-flex [width:var(--fr-space-4)] [height:var(--fr-space-4)] shrink-0 items-center justify-center [margin-top:var(--fr-space-1)] [font-size:var(--fr-text-xs)] [color:var(--fr-accent)]',
                isActive ? 'opacity-100' : 'opacity-0',
              ].join(' ')}
              aria-hidden="true"
            >
              ✓
            </span>
            <span className="flex min-w-[var(--fr-space-0)] flex-1 flex-col [gap:var(--fr-space-1)]">
              <span className="[font-size:var(--fr-text-sm)] [font-weight:var(--fr-weight-semibold)] [color:var(--fr-text-primary)]">
                {presetLabels[presetOption]}
              </span>
              {subtitle !== null && (
                <span className="[font-size:var(--fr-text-xs)] [line-height:var(--fr-leading-snug)] [color:var(--fr-text-secondary)]">
                  {subtitle}
                </span>
              )}
            </span>
          </button>
        )
      })}
    </div>
  )
}

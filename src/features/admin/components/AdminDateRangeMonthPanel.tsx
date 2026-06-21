import { translations } from '@/lib/translations'
import type { AdminDateRangeMonthPanelProps } from '@/typing/adminHomeView'
import {
  buildMonthGrid,
  formatIsoDate,
  isDateWithinRange,
  isSameIsoDate,
} from '../lib/adminHomeDateRange'

export function AdminDateRangeMonthPanel({
  month,
  monthLabel,
  draftRange,
  pendingStartDate,
  onDaySelect,
}: AdminDateRangeMonthPanelProps) {
  const weekdayLabels = translations.admin_home.date_range.weekdays
  const days = buildMonthGrid(month.getFullYear(), month.getMonth())

  return (
    <div className="flex [width:100%] flex-col [gap:var(--fr-space-2)]">
      <p className="[margin:var(--fr-space-0)] text-center [font-size:var(--fr-text-sm)] [font-weight:var(--fr-weight-semibold)] [color:var(--fr-text-primary)]">
        {monthLabel}
      </p>
      <div className="grid [width:100%] [grid-template-columns:repeat(7,_minmax(var(--fr-space-0),_1fr))] [gap:var(--fr-space-1)]">
        {weekdayLabels.map((weekdayLabel, weekdayIndex) => (
          <span
            key={`${weekdayIndex}-${weekdayLabel}`}
            className="flex [height:var(--fr-space-6)] items-center justify-center [font-size:var(--fr-text-xs)] [font-weight:var(--fr-weight-semibold)] [color:var(--fr-text-tertiary)]"
          >
            {weekdayLabel}
          </span>
        ))}
        {days.map((day) => {
          const isoDate = formatIsoDate(day)
          const isCurrentMonth = day.getMonth() === month.getMonth()
          const isSelectedStart =
            isSameIsoDate(isoDate, draftRange.startDate) ||
            pendingStartDate === isoDate
          const isSelectedEnd = isSameIsoDate(isoDate, draftRange.endDate)
          const isInRange = isDateWithinRange(isoDate, draftRange)
          const isEndpoint = isSelectedStart || isSelectedEnd

          return (
            <button
              key={`${monthLabel}-${isoDate}`}
              type="button"
              className={[
                'flex [width:100%] [aspect-ratio:1/1] items-center justify-center [font-size:var(--fr-text-sm)] [border-radius:var(--fr-radius-full)] [transition:var(--fr-transition-base)]',
                !isCurrentMonth
                  ? '[color:var(--fr-text-disabled)]'
                  : '[color:var(--fr-text-primary)]',
                isInRange && !isEndpoint
                  ? '[background:color-mix(in_oklch,var(--fr-accent)_12%,var(--fr-surface))]'
                  : '',
                isEndpoint
                  ? '[color:var(--fr-text-on-accent)] [background:var(--fr-accent)]'
                  : 'hover:[background:var(--fr-surface-sunken)]',
              ].join(' ')}
              onClick={() => onDaySelect(isoDate)}
            >
              {day.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}

import { translations } from '@/lib/translations'
import type { AdminDateRangePickerProps } from '@/typing/adminHomeView'
import { formatAdminHomeDateRangeInput } from '../lib/adminHomeDateRange'
import { useAdminDateRangePicker } from '../hooks/useAdminDateRangePicker'
import { AdminCalendarIcon } from './icons/AdminCalendarIcon'
import { AdminDateRangeMonthPanel } from './AdminDateRangeMonthPanel'
import { AdminDateRangePresetList } from './AdminDateRangePresetList'

export function AdminDateRangePicker({
  value,
  preset,
  onChange,
}: AdminDateRangePickerProps) {
  const {
    rootRef,
    isOpen,
    draftRange,
    draftPreset,
    pendingStartDate,
    leftMonth,
    rightMonth,
    monthFormatter,
    openPicker,
    closePicker,
    handlePresetSelect,
    handleDaySelect,
    setVisibleMonth,
  } = useAdminDateRangePicker({ value, preset, onChange })

  return (
    <div ref={rootRef} className="relative">
      <label className="flex flex-col [gap:var(--fr-space-2)]">
        <span className="[font-size:var(--fr-text-sm)] [font-weight:var(--fr-weight-medium)] [color:var(--fr-text-primary)]">
          {translations.admin_home.date_range.label}
        </span>
        <button
          type="button"
          className={[
            'flex items-center justify-between [gap:var(--fr-space-3)] [width:min(100%,calc(var(--fr-space-16)_+_var(--fr-space-12)))] [min-height:var(--fr-control-height-md)] [padding:var(--fr-space-0)_var(--fr-space-3)] [font:inherit] [font-size:var(--fr-text-sm)] [color:var(--fr-text-primary)] [background:var(--fr-surface)] [border:var(--fr-border-width-sm)_solid_var(--fr-border)] [border-radius:var(--fr-radius-md)] [transition:var(--fr-transition-base)]',
            isOpen
              ? '[border-color:var(--fr-border-focus)] [box-shadow:var(--fr-shadow-focus)]'
              : 'hover:[border-color:color-mix(in_oklch,var(--fr-accent)_35%,var(--fr-border))]',
          ].join(' ')}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          onClick={() => (isOpen ? closePicker() : openPicker())}
        >
          <span className="truncate">
            {formatAdminHomeDateRangeInput(value)}
          </span>
          <AdminCalendarIcon />
        </button>
      </label>

      {isOpen && (
        <div
          className="absolute [top:calc(100%_+_var(--fr-space-2))] [left:var(--fr-space-0)] [z-index:3] flex shrink-0 overflow-hidden [border:var(--fr-border-width-sm)_solid_var(--fr-border)] [border-radius:var(--fr-radius-lg)] [background:var(--fr-surface)] [box-shadow:var(--fr-shadow-lg)]"
          role="dialog"
          aria-label={translations.admin_home.date_range.label}
        >
          <AdminDateRangePresetList
            draftPreset={draftPreset}
            onPresetSelect={handlePresetSelect}
          />

          <div className="flex shrink-0 flex-col [padding:var(--fr-space-4)]">
            <div className="flex items-start [gap:var(--fr-space-3)]">
              <button
                type="button"
                className="inline-flex shrink-0 [width:var(--fr-space-8)] [height:var(--fr-space-8)] items-center justify-center [font-size:var(--fr-text-lg)] [color:var(--fr-text-secondary)] [border:var(--fr-border-width-sm)_solid_var(--fr-border)] [border-radius:var(--fr-radius-md)] [background:var(--fr-surface)] hover:[color:var(--fr-text-primary)]"
                aria-label={translations.admin_home.date_range.previous_month}
                onClick={() =>
                  setVisibleMonth(
                    (month) =>
                      new Date(month.getFullYear(), month.getMonth() - 1, 1),
                  )
                }
              >
                ‹
              </button>
              <div className="grid shrink-0 [grid-template-columns:repeat(2,_calc(var(--fr-space-16)_+_var(--fr-space-6)))] [gap:var(--fr-space-5)]">
                <AdminDateRangeMonthPanel
                  month={leftMonth}
                  monthLabel={monthFormatter.format(leftMonth)}
                  draftRange={draftRange}
                  pendingStartDate={pendingStartDate}
                  onDaySelect={handleDaySelect}
                />
                <AdminDateRangeMonthPanel
                  month={rightMonth}
                  monthLabel={monthFormatter.format(rightMonth)}
                  draftRange={draftRange}
                  pendingStartDate={pendingStartDate}
                  onDaySelect={handleDaySelect}
                />
              </div>
              <button
                type="button"
                className="inline-flex shrink-0 [width:var(--fr-space-8)] [height:var(--fr-space-8)] items-center justify-center [font-size:var(--fr-text-lg)] [color:var(--fr-text-secondary)] [border:var(--fr-border-width-sm)_solid_var(--fr-border)] [border-radius:var(--fr-radius-md)] [background:var(--fr-surface)] hover:[color:var(--fr-text-primary)]"
                aria-label={translations.admin_home.date_range.next_month}
                onClick={() =>
                  setVisibleMonth(
                    (month) =>
                      new Date(month.getFullYear(), month.getMonth() + 1, 1),
                  )
                }
              >
                ›
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

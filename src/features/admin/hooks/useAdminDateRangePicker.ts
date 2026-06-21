import { useEffect, useMemo, useRef, useState } from 'react'
import { getLocale } from '@/lib/translations'
import type {
  AdminHomeDateRange,
  AdminHomeDateRangePreset,
} from '@/typing/adminHome'
import type { AdminDateRangePickerProps } from '@/typing/adminHomeView'
import {
  buildAdminHomeDateRangePreset,
  normalizeAdminHomeDateRange,
  parseIsoDate,
} from '../lib/adminHomeDateRange'

export function useAdminDateRangePicker({
  value,
  preset,
  onChange,
}: AdminDateRangePickerProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [draftRange, setDraftRange] = useState(value)
  const [draftPreset, setDraftPreset] = useState(preset)
  const [pendingStartDate, setPendingStartDate] = useState<string | null>(null)
  const [visibleMonth, setVisibleMonth] = useState(() =>
    parseIsoDate(value.endDate),
  )

  function openPicker(): void {
    setDraftRange(value)
    setDraftPreset(preset)
    setPendingStartDate(null)
    setVisibleMonth(parseIsoDate(value.endDate))
    setIsOpen(true)
  }

  function closePicker(): void {
    setIsOpen(false)
  }

  useEffect(() => {
    if (!isOpen) {
      return
    }

    function handlePointerDown(event: MouseEvent): void {
      if (
        rootRef.current !== null &&
        !rootRef.current.contains(event.target as Node)
      ) {
        closePicker()
      }
    }

    function handleKeyDown(event: KeyboardEvent): void {
      if (event.key === 'Escape') {
        closePicker()
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const monthFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(getLocale() === 'nl' ? 'nl-NL' : 'en-US', {
        month: 'long',
        year: 'numeric',
      }),
    [],
  )

  const leftMonth = visibleMonth
  const rightMonth = useMemo(
    () => new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 1),
    [visibleMonth],
  )

  function applyRange(
    nextRange: AdminHomeDateRange,
    nextPreset: AdminHomeDateRangePreset,
  ): void {
    onChange(nextRange, nextPreset)
    closePicker()
  }

  function handlePresetSelect(nextPreset: AdminHomeDateRangePreset): void {
    if (nextPreset === 'custom') {
      setDraftPreset('custom')
      setPendingStartDate(null)
      return
    }

    const nextRange = buildAdminHomeDateRangePreset(nextPreset)
    setDraftRange(nextRange)
    setDraftPreset(nextPreset)
    setPendingStartDate(null)
    applyRange(nextRange, nextPreset)
  }

  function handleDaySelect(isoDate: string): void {
    if (pendingStartDate === null) {
      setPendingStartDate(isoDate)
      setDraftRange({ startDate: isoDate, endDate: isoDate })
      setDraftPreset('custom')
      return
    }

    const nextRange = normalizeAdminHomeDateRange(pendingStartDate, isoDate)
    setDraftRange(nextRange)
    setDraftPreset('custom')
    setPendingStartDate(null)
    applyRange(nextRange, 'custom')
  }

  return {
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
  }
}

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import { getTemplateTypeMeta, templateTypeOptions } from '../lib/templateMeta'
import type {
  TemplateTypeSelectorMenuPosition,
  TemplateTypeSelectorProps,
} from '@/typing/templateView'
import { TemplateIcon } from './icons/TemplateIcon'
import { TemplateTypePill } from './TemplateTypePill'

export function TemplateTypeSelector({
  type,
  readonly = false,
  ariaLabel,
  onChange,
}: TemplateTypeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [menuPosition, setMenuPosition] =
    useState<TemplateTypeSelectorMenuPosition | null>(null)
  const selectorRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const updateMenuPosition = useCallback((): void => {
    const trigger = triggerRef.current

    if (!trigger) {
      return
    }

    const rect = trigger.getBoundingClientRect()

    setMenuPosition({
      top: rect.bottom,
      left: rect.left,
    })
  }, [])

  function toggleMenu(): void {
    if (isOpen) {
      setIsOpen(false)
      return
    }

    updateMenuPosition()
    setIsOpen(true)
  }

  useLayoutEffect(() => {
    if (!isOpen) {
      return
    }

    updateMenuPosition()
  }, [isOpen, updateMenuPosition])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    function handlePointerDown(event: PointerEvent): void {
      const target = event.target as Node

      if (
        selectorRef.current?.contains(target) ||
        (event.target instanceof Element &&
          event.target.closest('.fixed [z-index:100] flex [width:calc(var(--fr-space-15)_*_2)] flex-col [gap:var(--fr-space-1)] [padding:var(--fr-space-2)] [background:var(--fr-surface)] [border:var(--fr-border-width-sm)_solid_var(--fr-border)] [border-radius:var(--fr-radius-lg)] [box-shadow:var(--fr-shadow-lg)] [transform:translateY(var(--fr-space-2))]') !== null)
      ) {
        return
      }

      setIsOpen(false)
    }

    function handleKeyDown(event: KeyboardEvent): void {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('resize', updateMenuPosition)
    window.addEventListener('scroll', updateMenuPosition, true)
    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('resize', updateMenuPosition)
      window.removeEventListener('scroll', updateMenuPosition, true)
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, updateMenuPosition])

  if (readonly) {
    return <TemplateTypePill type={type} />
  }

  const menu =
    isOpen && menuPosition !== null
      ? createPortal(
          <div
            className="fixed [z-index:100] flex [width:calc(var(--fr-space-15)_*_2)] flex-col [gap:var(--fr-space-1)] [padding:var(--fr-space-2)] [background:var(--fr-surface)] [border:var(--fr-border-width-sm)_solid_var(--fr-border)] [border-radius:var(--fr-radius-lg)] [box-shadow:var(--fr-shadow-lg)] [transform:translateY(var(--fr-space-2))]"
            role="listbox"
            style={{
              top: menuPosition.top,
              left: menuPosition.left,
            }}
          >
            {templateTypeOptions.map((optionType) => {
              const meta = getTemplateTypeMeta(optionType)
              const isSelected = optionType === type

              return (
                <button
                  key={optionType}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  className={[
                    'flex items-start [gap:var(--fr-space-3)] [padding:var(--fr-space-3)] [color:var(--fr-text-secondary)] text-left cursor-pointer bg-transparent border-0 [border-radius:var(--fr-radius-md)] hover:[color:var(--fr-text-primary)] hover:[background:var(--fr-surface-hover)] hover:outline-none focus-visible:[color:var(--fr-text-primary)] focus-visible:[background:var(--fr-surface-hover)] focus-visible:outline-none',
                    isSelected && '[color:var(--fr-text-primary)] [background:var(--fr-surface-hover)] outline-none [box-shadow:inset_0_0_0_var(--fr-border-width-sm)_var(--fr-border-strong)]',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => {
                    onChange(optionType)
                    setIsOpen(false)
                  }}
                >
                  <TemplateIcon
                    name={meta.icon}
                    className="block [width:var(--fr-space-4)] [height:var(--fr-space-4)] [stroke-width:1.6] shrink-0 [margin-top:calc(var(--fr-space-1)_/_2)] [color:var(--fr-text-tertiary)]"
                  />
                  <span className="flex [min-width:var(--fr-space-0)] flex-col [gap:var(--fr-space-1)] [&_strong]:[font-size:var(--fr-text-sm)] [&_strong]:[font-weight:var(--fr-weight-semibold)] [&_strong]:[line-height:var(--fr-leading-snug)] [&_strong]:[color:var(--fr-text-primary)] [&_span]:[font-size:var(--fr-text-xs)] [&_span]:[line-height:var(--fr-leading-snug)] [&_span]:[color:var(--fr-text-tertiary)]">
                    <strong>{meta.label}</strong>
                    <span>{meta.description}</span>
                  </span>
                </button>
              )
            })}
          </div>,
          document.body,
        )
      : null

  return (
    <div className="relative [width:fit-content]" ref={selectorRef}>
      <button
        ref={triggerRef}
        type="button"
        className="inline-flex items-center [gap:var(--fr-space-1)] [padding:var(--fr-space-0)] cursor-pointer bg-transparent border-0 [border-radius:var(--fr-radius-full)] hover:[&_*]:[color:var(--fr-text-primary)] hover:[&_*]:[background:var(--fr-surface-hover)] focus-visible:[&_*]:[color:var(--fr-text-primary)] focus-visible:[&_*]:[background:var(--fr-surface-hover)] focus-visible:outline-none focus-visible:[box-shadow:var(--fr-shadow-focus)]"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={toggleMenu}
      >
        <TemplateTypePill type={type} />
        <TemplateIcon
          name="chevronDown"
          className="block [width:var(--fr-space-4)] [height:var(--fr-space-4)] [stroke-width:1.6] [width:var(--fr-space-3)] [height:var(--fr-space-3)] [color:var(--fr-text-tertiary)]"
        />
      </button>
      {menu}
    </div>
  )
}

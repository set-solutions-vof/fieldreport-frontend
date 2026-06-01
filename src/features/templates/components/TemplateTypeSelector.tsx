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
} from '@/types/templateView'
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
          event.target.closest('.fr-template-type-selector__menu') !== null)
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
            className="fr-template-type-selector__menu"
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
                    'fr-template-type-selector__option',
                    isSelected && 'fr-template-type-selector__option--selected',
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
                    className="fr-template-type-selector__option-icon"
                  />
                  <span className="fr-template-type-selector__option-copy">
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
    <div className="fr-template-type-selector" ref={selectorRef}>
      <button
        ref={triggerRef}
        type="button"
        className="fr-template-type-selector__trigger"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={toggleMenu}
      >
        <TemplateTypePill type={type} />
        <TemplateIcon
          name="chevronDown"
          className="fr-template-type-selector__chevron"
        />
      </button>
      {menu}
    </div>
  )
}

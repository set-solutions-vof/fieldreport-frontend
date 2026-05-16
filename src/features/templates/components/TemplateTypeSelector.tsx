import { useEffect, useRef, useState } from 'react'
import { getTemplateTypeMeta, templateTypeOptions } from '../lib/templateMeta'
import type { TemplateTypeSelectorProps } from '../types/templateView'
import { TemplateIcon } from './icons/TemplateIcon'
import { TemplateTypePill } from './TemplateTypePill'

export function TemplateTypeSelector({
  type,
  readonly = false,
  ariaLabel,
  onChange,
}: TemplateTypeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const selectorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    function handlePointerDown(event: PointerEvent): void {
      if (!selectorRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent): void {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  if (readonly) {
    return <TemplateTypePill type={type} />
  }

  return (
    <div className="fr-template-type-selector" ref={selectorRef}>
      <button
        type="button"
        className="fr-template-type-selector__trigger"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((currentIsOpen) => !currentIsOpen)}
      >
        <TemplateTypePill type={type} />
        <TemplateIcon
          name="chevronDown"
          className="fr-template-type-selector__chevron"
        />
      </button>
      {isOpen && (
        <div className="fr-template-type-selector__menu" role="listbox">
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
        </div>
      )}
    </div>
  )
}

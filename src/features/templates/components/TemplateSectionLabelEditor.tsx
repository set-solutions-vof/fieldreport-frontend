import { useEffect, useRef, useState } from 'react'
import { Input } from '@set-solutions-vof/design-system'
import type { TemplateSectionLabelEditorProps } from '@/typing/templateView'
import { TemplateIcon } from './icons/TemplateIcon'

export function TemplateSectionLabelEditor({
  sectionId,
  label,
  readonly,
  prominent = false,
  onLabelChange,
}: TemplateSectionLabelEditorProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [draftLabel, setDraftLabel] = useState(label)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus()
      inputRef.current?.select()
    }
  }, [isEditing])

  function startEditing(): void {
    if (!readonly) {
      setDraftLabel(label)
      setIsEditing(true)
    }
  }

  function commitLabel(): void {
    setIsEditing(false)
    onLabelChange?.(sectionId, draftLabel.trim())
  }

  if (isEditing) {
    return (
      <Input
        ref={inputRef}
        inputSize="sm"
        value={draftLabel}
        fieldClassName="[max-width:calc(var(--fr-space-16)_+_var(--fr-space-12))]"
        onChange={(event) => setDraftLabel(event.target.value)}
        onBlur={commitLabel}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            commitLabel()
          }
        }}
      />
    )
  }

  return (
    <button
      type="button"
      className={[
        'inline-flex items-center [gap:var(--fr-space-2)] self-start [padding:var(--fr-space-0)] [font:inherit] [line-height:var(--fr-leading-snug)] [color:var(--fr-text-primary)] text-left cursor-pointer bg-transparent border-0 disabled:[cursor:default] focus-visible:outline-none focus-visible:[box-shadow:var(--fr-shadow-focus)]',
        prominent
          ? '[font-size:var(--fr-text-xl)] [font-weight:var(--fr-weight-bold)] [letter-spacing:var(--fr-tracking-title)]'
          : '[font-size:var(--fr-text-base)] [font-weight:var(--fr-weight-medium)]',
      ].join(' ')}
      disabled={readonly}
      onClick={startEditing}
    >
      <span>{label}</span>
      {!readonly && (
        <TemplateIcon name="edit" className="[width:var(--fr-space-3)] [height:var(--fr-space-3)] [color:var(--fr-text-tertiary)] [opacity:0.5] block [width:var(--fr-space-4)] [height:var(--fr-space-4)] [stroke-width:1.6]" />
      )}
    </button>
  )
}

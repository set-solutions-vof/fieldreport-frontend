import { useEffect, useRef, useState } from 'react'
import { Input } from '@/design-system'
import { TemplateIcon } from './icons/TemplateIcon'

type TemplateSectionLabelEditorProps = {
  sectionId: string
  label: string
  readonly: boolean
  onLabelChange?: (sectionId: string, label: string) => void
}

export function TemplateSectionLabelEditor({
  sectionId,
  label,
  readonly,
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
        fieldClassName="fr-template-section-card__field"
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
      className="fr-template-section-card__label"
      disabled={readonly}
      onClick={startEditing}
    >
      <span>{label}</span>
      {!readonly && (
        <TemplateIcon name="edit" className="fr-template-section-card__edit" />
      )}
    </button>
  )
}

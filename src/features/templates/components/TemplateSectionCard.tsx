import { useEffect, useRef, useState } from 'react'
import { Card, Input } from '@/design-system'
import { formatTemplateOrder } from '../lib/templateFormatters'
import { templateSectionRenderType } from '../lib/templateSection'
import type { TemplateSectionCardProps } from '../types/templateView'
import { TemplateFieldChip } from './TemplateFieldChip'
import { TemplateIcon } from './icons/TemplateIcon'
import { TemplateTypePill } from './TemplateTypePill'

export function TemplateSectionCard({
  section,
  index,
  readonly = false,
  feature = false,
  onLabelChange,
}: TemplateSectionCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [draftLabel, setDraftLabel] = useState(section.label)
  const inputRef = useRef<HTMLInputElement>(null)
  const visibleFieldsCount = feature ? 8 : 6
  const renderType = templateSectionRenderType(section)
  const visibleFields = section.fields?.slice(0, visibleFieldsCount) ?? []
  const hiddenFieldsCount = (section.fields?.length ?? 0) - visibleFields.length

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus()
      inputRef.current?.select()
    }
  }, [isEditing])

  function startEditing(): void {
    if (!readonly) {
      setDraftLabel(section.label)
      setIsEditing(true)
    }
  }

  function commitLabel(): void {
    setIsEditing(false)
    onLabelChange?.(section.id, draftLabel.trim())
  }

  return (
    <Card
      padding="md"
      className={[
        'fr-template-section-card',
        feature && 'fr-template-section-card--feature',
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <TemplateIcon
        name="grip"
        className={[
          'fr-template-section-card__grip',
          readonly && 'fr-template-section-card__grip--readonly',
        ]
          .filter(Boolean)
          .join(' ')}
      />
      <div className="fr-template-section-card__body">
        {isEditing ? (
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
        ) : (
          <button
            type="button"
            className="fr-template-section-card__label"
            disabled={readonly}
            onClick={startEditing}
          >
            <span>{section.label}</span>
            {!readonly && (
              <TemplateIcon
                name="edit"
                className="fr-template-section-card__edit"
              />
            )}
          </button>
        )}
        <TemplateTypePill type={renderType} />
        {renderType === 'key_value_table' && (
          <div className="fr-template-section-card__fields">
            {visibleFields.map((field) => (
              <TemplateFieldChip key={field}>{field}</TemplateFieldChip>
            ))}
            {hiddenFieldsCount > 0 && (
              <TemplateFieldChip
                neutral
              >{`+${hiddenFieldsCount} more`}</TemplateFieldChip>
            )}
          </div>
        )}
      </div>
      <span className="fr-template-section-card__order">
        {formatTemplateOrder(index)}
      </span>
    </Card>
  )
}

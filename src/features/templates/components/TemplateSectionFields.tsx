import { useState } from 'react'
import { Button, Input } from '@/design-system'
import { translations } from '@/lib/translations'
import type { TemplateSectionFieldsProps } from '@/types/templateView'
import { TemplateFieldChip } from './TemplateFieldChip'
import { TemplateSectionGroups } from './TemplateSectionGroups'
import { TemplateIcon } from './icons/TemplateIcon'

export function TemplateSectionFields({
  sectionId,
  sectionLabel,
  renderType,
  fields,
  groups,
  readonly,
  visibleFieldsCount,
  onFieldsChange,
  onGroupsChange,
}: TemplateSectionFieldsProps) {
  const [draftField, setDraftField] = useState('')
  const [isCollapsed, setIsCollapsed] = useState(false)

  if (renderType === 'measurement_table') {
    return (
      <TemplateSectionGroups
        sectionId={sectionId}
        sectionLabel={sectionLabel}
        fields={fields}
        groups={groups}
        readonly={readonly}
        onGroupsChange={onGroupsChange}
      />
    )
  }

  const visibleFields = readonly
    ? fields.slice(0, visibleFieldsCount)
    : isCollapsed
      ? fields.slice(0, 6)
      : fields
  const hiddenFieldsCount = fields.length - visibleFields.length
  const shouldShowCollapseToggle = !readonly && fields.length > 6

  function addField(): void {
    const fieldName = draftField.trim()

    if (fieldName === '') {
      return
    }

    onFieldsChange!(sectionId, [...fields, fieldName])
    setDraftField('')
  }

  function removeField(fieldName: string): void {
    onFieldsChange!(
      sectionId,
      fields.filter((field) => field !== fieldName),
    )
  }

  return (
    <>
      <div className="fr-template-section-card__fields">
        {visibleFields.map((field, fieldIndex) => (
          <TemplateFieldChip
            key={`${field}-${fieldIndex}`}
            removeLabel={`${translations.template.review.remove_field_label}: ${field}`}
            onRemove={readonly ? undefined : () => removeField(field)}
          >
            {field}
          </TemplateFieldChip>
        ))}
        {hiddenFieldsCount > 0 && (
          <TemplateFieldChip
            neutral
          >{`+${hiddenFieldsCount} more`}</TemplateFieldChip>
        )}
      </div>
      {shouldShowCollapseToggle && (
        <button
          type="button"
          className="fr-template-section-card__collapse"
          onClick={() =>
            setIsCollapsed((currentIsCollapsed) => !currentIsCollapsed)
          }
        >
          {isCollapsed
            ? translations.template.review.expand_fields
            : translations.template.review.collapse_fields}
        </button>
      )}
      {!readonly && !isCollapsed && (
        <div className="fr-template-section-card__field-row">
          <Input
            inputSize="sm"
            value={draftField}
            aria-label={translations.template.review.field_input_label}
            placeholder={translations.template.review.field_input_placeholder}
            fieldClassName="fr-template-section-card__new-field"
            onChange={(event) => setDraftField(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                addField()
              }
            }}
          />
          <Button
            size="sm"
            variant="secondary"
            className="fr-template-section-card__icon-button"
            aria-label={translations.template.review.add_field_label}
            disabled={draftField.trim() === ''}
            leadingIcon={
              <TemplateIcon
                name="plus"
                className="fr-template-section-card__button-icon"
              />
            }
            onClick={addField}
          >
            {translations.template.review.add_field_label}
          </Button>
        </div>
      )}
    </>
  )
}

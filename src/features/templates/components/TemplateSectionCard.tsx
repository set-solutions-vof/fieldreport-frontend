import { Button, Card } from '@/design-system'
import { translations } from '@/lib/translations'
import { useTemplateSectionDrag } from '../hooks/useTemplateSectionDrag'
import { formatTemplateOrder } from '../lib/templateFormatters'
import { templateSectionRenderType } from '../lib/templateSection'
import type { TemplateSectionCardProps } from '@/types/templateView'
import { TemplateIcon } from './icons/TemplateIcon'
import { TemplateSectionFields } from './TemplateSectionFields'
import { TemplateSectionLabelEditor } from './TemplateSectionLabelEditor'
import { TemplateSectionPhotoHint } from './TemplateSectionPhotoHint'
import { TemplateTypeSelector } from './TemplateTypeSelector'

export function TemplateSectionCard({
  section,
  index,
  readonly = false,
  feature = false,
  draggable = false,
  isDragging = false,
  dropIndicator = null,
  onLabelChange,
  onDelete,
  onRenderTypeChange,
  onFieldsChange,
  onGroupsChange,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
}: TemplateSectionCardProps) {
  const visibleFieldsCount = feature ? 8 : 6
  const renderType = templateSectionRenderType(section)
  const fields = section.fields ?? []
  const hasEditableFields =
    renderType === 'key_value_table' || renderType === 'measurement_table'
  const { handleDragStart, handleDragOver, handleDrop, handleDragEnd } =
    useTemplateSectionDrag({
      sectionId: section.id,
      index,
      draggable,
      onDragStart,
      onDragOver,
      onDrop,
      onDragEnd,
    })

  return (
    <Card
      padding="md"
      draggable={draggable}
      className={[
        'fr-template-section-card',
        feature && 'fr-template-section-card--feature',
        draggable && 'fr-template-section-card--draggable',
        isDragging && 'fr-template-section-card--dragging',
        dropIndicator === 'before' && 'fr-template-section-card--drop-before',
        dropIndicator === 'after' && 'fr-template-section-card--drop-after',
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ animationDelay: `${index * 80}ms` }}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragEnd={handleDragEnd}
    >
      <TemplateIcon
        name="grip"
        className={[
          'fr-template-section-card__grip',
          readonly && 'fr-template-section-card__grip--readonly',
          !readonly && 'fr-template-section-card__grip--draggable',
          isDragging && 'fr-template-section-card__grip--dragging',
        ]
          .filter(Boolean)
          .join(' ')}
      />
      <div className="fr-template-section-card__body">
        <TemplateSectionLabelEditor
          sectionId={section.id}
          label={section.label}
          readonly={readonly}
          onLabelChange={onLabelChange}
        />
        <TemplateTypeSelector
          type={renderType}
          readonly={readonly}
          ariaLabel={`${translations.template.review.change_render_type_label}: ${section.label}`}
          onChange={(selectedRenderType) =>
            onRenderTypeChange?.(section.id, selectedRenderType)
          }
        />
        {hasEditableFields && (
          <TemplateSectionFields
            sectionId={section.id}
            sectionLabel={section.label}
            renderType={renderType}
            fields={fields}
            groups={section.groups ?? null}
            readonly={readonly}
            visibleFieldsCount={visibleFieldsCount}
            onFieldsChange={onFieldsChange}
            onGroupsChange={onGroupsChange}
          />
        )}
        {renderType === 'photo_grid' && <TemplateSectionPhotoHint />}
      </div>
      {!readonly && (
        <Button
          size="sm"
          variant="ghost"
          className="fr-template-section-card__icon-button fr-template-section-card__delete"
          aria-label={`${translations.template.review.delete_section_label}: ${section.label}`}
          leadingIcon={
            <TemplateIcon
              name="trash"
              className="fr-template-section-card__button-icon"
            />
          }
          onClick={() => onDelete?.(section.id)}
        >
          {translations.template.review.delete_section_label}
        </Button>
      )}
      <span className="fr-template-section-card__order">
        {formatTemplateOrder(index)}
      </span>
    </Card>
  )
}

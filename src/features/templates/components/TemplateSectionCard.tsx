import { Button, Card } from '@set-solutions-vof/design-system'
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
        'relative flex items-start [gap:var(--fr-space-3)] [animation:frTemplateFadeUp_250ms_var(--fr-ease-out)_forwards]',
        feature && '[grid-column:span_2]',
        draggable && 'cursor-grab',
        isDragging && 'cursor-grabbing [opacity:0.65]',
        dropIndicator === 'before' &&
          "[&::before]:absolute [&::before]:[right:var(--fr-space-3)] [&::before]:[left:var(--fr-space-3)] [&::before]:[height:var(--fr-border-width-sm)] [&::before]:[background:var(--fr-accent)] [&::before]:[border-radius:var(--fr-radius-full)] [&::before]:[content:''] [&::before]:[top:calc(var(--fr-space-2)_*_-1)]",
        dropIndicator === 'after' &&
          "[&::after]:absolute [&::after]:[right:var(--fr-space-3)] [&::after]:[left:var(--fr-space-3)] [&::after]:[height:var(--fr-border-width-sm)] [&::after]:[background:var(--fr-accent)] [&::after]:[border-radius:var(--fr-radius-full)] [&::after]:[content:''] [&::after]:[bottom:calc(var(--fr-space-2)_*_-1)]",
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
          '[width:var(--fr-space-4)] [height:var(--fr-space-4)] shrink-0 [margin-top:calc(var(--fr-space-1)_/_2)] [color:var(--fr-text-tertiary)]',
          readonly && '[color:transparent]',
          !readonly && 'cursor-grab',
          isDragging && 'cursor-grabbing',
        ]
          .filter(Boolean)
          .join(' ')}
      />
      <div className="flex [min-width:var(--fr-space-0)] flex-1 flex-col [gap:var(--fr-space-3)]">
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
          className="[width:var(--fr-control-height-sm)] [gap:var(--fr-space-0)] [padding:var(--fr-space-0)] [color:var(--fr-text-tertiary)] hover:[color:var(--fr-destructive)] focus-visible:[color:var(--fr-destructive)]"
          aria-label={`${translations.template.review.delete_section_label}: ${section.label}`}
          leadingIcon={
            <TemplateIcon
              name="trash"
              className="block [width:var(--fr-space-4)] [height:var(--fr-space-4)] [stroke-width:1.6]"
            />
          }
          onClick={() => onDelete?.(section.id)}
        >
          {translations.template.review.delete_section_label}
        </Button>
      )}
      <span className="shrink-0 [font-size:var(--fr-text-sm)] [font-weight:var(--fr-weight-medium)] [line-height:var(--fr-leading-snug)] [color:var(--fr-text-tertiary)] [font-variant-numeric:tabular-nums]">
        {formatTemplateOrder(index)}
      </span>
    </Card>
  )
}

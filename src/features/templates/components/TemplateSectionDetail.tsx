import { Button } from '@set-solutions-vof/design-system'
import { translations } from '@/lib/translations'
import { formatTemplateOrder } from '../lib/templateFormatters'
import { templateSectionRenderType } from '../lib/templateSection'
import type { TemplateSectionDetailProps } from '@/typing/templateView'
import { TemplateIcon } from './icons/TemplateIcon'
import { TemplateSectionFields } from './TemplateSectionFields'
import { TemplateSectionLabelEditor } from './TemplateSectionLabelEditor'
import { TemplateSectionPhotoHint } from './TemplateSectionPhotoHint'
import { TemplateTypeSelector } from './TemplateTypeSelector'

export function TemplateSectionDetail({
  section,
  index,
  readonly = false,
  onLabelChange,
  onDelete,
  onRenderTypeChange,
  onFieldsChange,
  onGroupsChange,
}: TemplateSectionDetailProps) {
  const renderType = templateSectionRenderType(section)
  const fields = section.fields ?? []
  const hasEditableFields =
    renderType === 'key_value_table' || renderType === 'measurement_table'

  return (
    <section className="flex [min-width:var(--fr-space-0)] flex-1 flex-col overflow-y-auto [padding:var(--fr-space-6)_var(--fr-space-8)]">
      <header className="flex items-start justify-between [gap:var(--fr-space-4)] [margin-bottom:var(--fr-space-6)]">
        <div className="flex flex-col [gap:var(--fr-space-2)]">
          <span className="[font-size:var(--fr-text-xs)] [font-weight:var(--fr-weight-semibold)] [line-height:var(--fr-leading-snug)] [letter-spacing:var(--fr-tracking-label)] [color:var(--fr-text-tertiary)] uppercase">
            {translations.template.review.section_label}{' '}
            {formatTemplateOrder(index)}
          </span>
          <TemplateSectionLabelEditor
            sectionId={section.id}
            label={section.label}
            readonly={readonly}
            prominent
            onLabelChange={onLabelChange}
          />
        </div>
        {!readonly && (
          <Button
            size="sm"
            variant="ghost"
            className="[color:var(--fr-text-tertiary)] hover:[color:var(--fr-destructive)] focus-visible:[color:var(--fr-destructive)]"
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
      </header>

      <div className="flex flex-col [gap:var(--fr-space-5)]">
        <div className="flex flex-col [gap:var(--fr-space-2)]">
          <span className="[font-size:var(--fr-text-xs)] [font-weight:var(--fr-weight-semibold)] [line-height:var(--fr-leading-snug)] [letter-spacing:var(--fr-tracking-label)] [color:var(--fr-text-tertiary)] uppercase">
            {translations.template.review.change_render_type_label}
          </span>
          <TemplateTypeSelector
            type={renderType}
            readonly={readonly}
            ariaLabel={`${translations.template.review.change_render_type_label}: ${section.label}`}
            onChange={(selectedRenderType) =>
              onRenderTypeChange?.(section.id, selectedRenderType)
            }
          />
        </div>

        {hasEditableFields && (
          <div className="flex flex-col [gap:var(--fr-space-3)]">
            <span className="[font-size:var(--fr-text-xs)] [font-weight:var(--fr-weight-semibold)] [line-height:var(--fr-leading-snug)] [letter-spacing:var(--fr-tracking-label)] [color:var(--fr-text-tertiary)] uppercase">
              {translations.template.review.fields_heading}
            </span>
            <TemplateSectionFields
              sectionId={section.id}
              sectionLabel={section.label}
              renderType={renderType}
              fields={fields}
              groups={section.groups ?? null}
              readonly={readonly}
              visibleFieldsCount={fields.length}
              onFieldsChange={onFieldsChange}
              onGroupsChange={onGroupsChange}
            />
          </div>
        )}

        {renderType === 'photo_grid' && <TemplateSectionPhotoHint />}

        {renderType === 'text_block' && (
          <p className="[margin:var(--fr-space-0)] [font-size:var(--fr-text-sm)] [line-height:var(--fr-leading-snug)] [color:var(--fr-text-tertiary)]">
            {translations.template.review.text_block_hint}
          </p>
        )}
      </div>
    </section>
  )
}

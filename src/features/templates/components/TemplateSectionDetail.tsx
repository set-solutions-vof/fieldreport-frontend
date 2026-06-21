import {
  Button,
  Card,
  CardHeader,
  CardTitle,
} from '@set-solutions-vof/design-system'
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
  const renderTypeLabel = readonly
    ? translations.template.review.render_type_label
    : translations.template.review.change_render_type_label

  return (
    <section className="flex [min-width:var(--fr-space-0)] flex-1 flex-col overflow-hidden [background:var(--fr-surface)]">
      <header className="sticky [top:var(--fr-space-0)] z-10 flex shrink-0 items-start justify-between [gap:var(--fr-space-4)] [padding:var(--fr-space-5)] [background:var(--fr-surface)] [border-bottom:var(--fr-border-width-sm)_solid_var(--fr-border)]">
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

      <div className="flex flex-1 flex-col overflow-y-auto [padding:var(--fr-space-5)]">
        <div className="flex max-w-[880px] flex-col [gap:var(--fr-space-4)]">
          <Card padding="md" className="flex flex-col [gap:var(--fr-space-3)]">
            <label className="[font-size:var(--fr-text-xs)] [font-weight:var(--fr-weight-semibold)] [line-height:var(--fr-leading-snug)] [letter-spacing:var(--fr-tracking-label)] [color:var(--fr-text-tertiary)] uppercase">
              {renderTypeLabel}
            </label>
            <TemplateTypeSelector
              type={renderType}
              readonly={readonly}
              ariaLabel={`${renderTypeLabel}: ${section.label}`}
              onChange={(selectedRenderType) =>
                onRenderTypeChange?.(section.id, selectedRenderType)
              }
            />
          </Card>

          {hasEditableFields && (
            <Card
              padding="md"
              className="flex flex-col [gap:var(--fr-space-4)]"
            >
              <CardHeader className="[padding:var(--fr-space-0)]">
                <CardTitle className="flex items-center [gap:var(--fr-space-2)] [font-size:var(--fr-text-xs)] [font-weight:var(--fr-weight-semibold)] [letter-spacing:var(--fr-tracking-label)] [color:var(--fr-text-tertiary)] uppercase">
                  <span
                    className="inline-block [width:calc(var(--fr-space-1)_-_var(--fr-border-width-sm))] [height:var(--fr-space-3)] [border-radius:var(--fr-radius-sm)] [background:var(--fr-accent)] shrink-0"
                    aria-hidden="true"
                  />
                  {translations.template.review.fields_heading}
                </CardTitle>
              </CardHeader>
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
            </Card>
          )}

          {renderType === 'photo_grid' && (
            <Card padding="md">
              <TemplateSectionPhotoHint />
            </Card>
          )}

          {renderType === 'text_block' && (
            <Card padding="md">
              <p className="[margin:var(--fr-space-0)] [font-size:var(--fr-text-sm)] [line-height:var(--fr-leading-snug)] [color:var(--fr-text-secondary)]">
                {translations.template.review.text_block_hint}
              </p>
            </Card>
          )}
        </div>
      </div>
    </section>
  )
}

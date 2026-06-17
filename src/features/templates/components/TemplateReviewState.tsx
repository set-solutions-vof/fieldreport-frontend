import { Button } from '@set-solutions-vof/design-system'
import { translations } from '@/lib/translations'
import type { TemplateReviewStateProps } from '@/types/templateView'
import { TemplateIcon } from './icons/TemplateIcon'
import { TemplatePreviewPanel } from './TemplatePreviewPanel'
import { TemplateSectionGrid } from './TemplateSectionGrid'
import { TemplateSummaryHeader } from './TemplateSummaryHeader'

export function TemplateReviewState({
  sections,
  approved = false,
  editing = false,
  showPreview = false,
  actionErrorMessage,
  isConfirming,
  hasUnsavedChanges,
  onLabelChange,
  onDelete,
  onRenderTypeChange,
  onFieldsChange,
  onGroupsChange,
  onReorder,
  onConfirm,
  onEdit,
  onCancel,
}: TemplateReviewStateProps) {
  const fieldsCount = sections.reduce(
    (totalFields, section) => totalFields + (section.fields?.length ?? 0),
    0,
  )
  const stats = [
    {
      label: translations.template.review.sections_stat,
      value: String(sections.length),
    },
    {
      label: translations.template.review.fields_stat,
      value: String(fieldsCount),
    },
  ]

  const content = (
    <>
      <TemplateSummaryHeader
        title={
          approved ? (
            <span className="inline-flex items-center [gap:var(--fr-space-3)]">
              <TemplateIcon
                name="checkCircle"
                className="[width:var(--fr-space-4)] [height:var(--fr-space-4)] [color:var(--fr-status-approved-fg)] [stroke-width:1.6]"
              />
              {translations.template.approved.title}
            </span>
          ) : (
            translations.template.review.title
          )
        }
        hint={
          approved
            ? translations.template.approved.hint
            : editing
              ? translations.template.approved.editing_hint
              : translations.template.review.hint
        }
        stats={stats}
        hasUnsavedChanges={!approved && hasUnsavedChanges}
        action={
          approved ? (
            <Button variant="secondary" onClick={onEdit}>
              {translations.template.approved.edit_button}
            </Button>
          ) : editing ? (
            <div className="flex items-center [gap:var(--fr-space-2)]">
              <Button variant="ghost" onClick={onCancel}>
                {translations.template.approved.cancel_button}
              </Button>
              <Button
                variant="primary"
                loading={isConfirming}
                onClick={onConfirm}
              >
                {translations.template.approved.save_button}
              </Button>
            </div>
          ) : (
            <Button
              variant="primary"
              loading={isConfirming}
              onClick={onConfirm}
            >
              {translations.template.review.confirm_button}
            </Button>
          )
        }
      />
      <section className="flex flex-1 flex-col items-center [gap:var(--fr-space-4)] overflow-y-auto [padding:var(--fr-space-6)_var(--fr-space-8)_var(--fr-space-8)]">
        {actionErrorMessage !== null && (
          <p className="[margin:var(--fr-space-0)] [font-size:var(--fr-text-sm)] [line-height:var(--fr-leading-snug)] [color:var(--fr-destructive)]">{actionErrorMessage}</p>
        )}
        <TemplateSectionGrid
          sections={sections}
          readonly={approved}
          onLabelChange={onLabelChange}
          onDelete={onDelete}
          onRenderTypeChange={onRenderTypeChange}
          onFieldsChange={onFieldsChange}
          onGroupsChange={onGroupsChange}
          onReorder={onReorder}
        />
      </section>
    </>
  )

  if (!showPreview) {
    return content
  }

  return (
    <div className="[min-height:var(--fr-space-16)] flex flex-1 [min-height:var(--fr-space-0)] [gap:var(--fr-space-0)]">
      <div className="flex [min-width:var(--fr-space-0)] flex-1 flex-col overflow-y-auto">{content}</div>
      <div className="[height:auto] sticky [top:var(--fr-space-0)] box-border [width:calc(var(--fr-space-15)_*_2_+_var(--fr-space-12)_+_var(--fr-space-5))] [height:calc(100dvh_-_var(--fr-space-10))] shrink-0 overflow-y-auto [padding:var(--fr-space-5)] [background:var(--fr-surface-sunken)] [border-left:var(--fr-border-width-sm)_solid_var(--fr-border)]">
        <TemplatePreviewPanel sections={sections} />
      </div>
    </div>
  )
}

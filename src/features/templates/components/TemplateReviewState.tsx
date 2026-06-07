import { Button } from '@/design-system'
import { translations } from '@/lib/translations'
import type { TemplateReviewStateProps } from '@/types/templateView'
import { TemplateIcon } from './icons/TemplateIcon'
import { TemplatePreviewPanel } from './TemplatePreviewPanel'
import { TemplateSectionGrid } from './TemplateSectionGrid'
import { TemplateSummaryHeader } from './TemplateSummaryHeader'
import './TemplateReviewState.css'

export function TemplateReviewState({
  sections,
  approved = false,
  editing = false,
  showPreview = false,
  actionErrorMessage,
  isConfirming,
  saveStatus,
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
            <span className="fr-template-approved-title">
              <TemplateIcon
                name="checkCircle"
                className="fr-template-approved-title__icon"
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
        saveStatus={approved ? 'idle' : saveStatus}
        action={
          approved ? (
            <Button variant="secondary" onClick={onEdit}>
              {translations.template.approved.edit_button}
            </Button>
          ) : editing ? (
            <div className="fr-template-summary__actions">
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
      <section className="fr-template-review">
        {actionErrorMessage !== null && (
          <p className="fr-template-action-error">{actionErrorMessage}</p>
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
    <div className="fr-template-review-layout">
      <div className="fr-template-review-layout__config">{content}</div>
      <div className="fr-template-review-layout__preview">
        <TemplatePreviewPanel sections={sections} />
      </div>
    </div>
  )
}

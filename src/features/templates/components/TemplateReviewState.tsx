import { useState } from 'react'
import { Button } from '@set-solutions-vof/design-system'
import { translations } from '@/lib/translations'
import { getTemplateSectionFieldCount } from '../lib/templateSectionFieldCount'
import type { TemplateReviewStateProps } from '@/typing/templateView'
import { TemplateIcon } from './icons/TemplateIcon'
import { TemplatePreviewPanel } from './TemplatePreviewPanel'
import { TemplateSectionEditor } from './TemplateSectionEditor'
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
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const fieldsCount = sections.reduce(
    (totalFields, section) => totalFields + getTemplateSectionFieldCount(section),
    0,
  )

  const statsLine = `${sections.length} ${translations.template.review.sections_stat.toLowerCase()} · ${fieldsCount} ${translations.template.review.fields_stat.toLowerCase()}`

  const title = translations.template.review.section_structure_title

  const titleLeadingIcon = approved ? (
    <TemplateIcon
      name="checkCircle"
      className="shrink-0 [width:var(--fr-space-4)] [height:var(--fr-space-4)] [color:var(--fr-status-approved-fg)] [stroke-width:1.6]"
    />
  ) : undefined

  const hint = approved
    ? null
    : editing
      ? translations.template.approved.editing_hint
      : translations.template.review.hint

  const metadata = approved ? (
    <>
      {statsLine} · {translations.template.review.active_status}
    </>
  ) : (
    <>
      {statsLine}
      {hint !== null && (
        <>
          <br />
          {hint}
        </>
      )}
    </>
  )

  const action = approved ? (
    <Button variant="secondary" onClick={onEdit}>
      {translations.template.approved.edit_button}
    </Button>
  ) : editing ? (
    <div className="flex items-center [gap:var(--fr-space-2)]">
      {showPreview && (
        <Button
          variant="secondary"
          onClick={() => setIsPreviewOpen((open) => !open)}
        >
          {translations.template.review.preview_button}
        </Button>
      )}
      <Button variant="ghost" onClick={onCancel}>
        {translations.template.approved.cancel_button}
      </Button>
      <Button variant="primary" loading={isConfirming} onClick={onConfirm}>
        {translations.template.approved.save_button}
      </Button>
    </div>
  ) : (
    <div className="flex items-center [gap:var(--fr-space-2)]">
      {showPreview && (
        <Button
          variant="secondary"
          onClick={() => setIsPreviewOpen((open) => !open)}
        >
          {translations.template.review.preview_button}
        </Button>
      )}
      <Button variant="primary" loading={isConfirming} onClick={onConfirm}>
        {translations.template.review.save_changes_button}
      </Button>
    </div>
  )

  return (
    <div className="flex flex-1 flex-col [min-height:var(--fr-space-0)]">
      <TemplateSummaryHeader
        title={title}
        titleLeadingIcon={titleLeadingIcon}
        metadata={metadata}
        hasUnsavedChanges={!approved && hasUnsavedChanges}
        action={action}
      />
      <div className="flex flex-1 [min-height:var(--fr-space-0)]">
        <div className="flex [min-width:var(--fr-space-0)] flex-1 flex-col overflow-hidden">
          {actionErrorMessage !== null && (
            <p className="[margin:var(--fr-space-0)] [padding:var(--fr-space-3)_var(--fr-space-5)_var(--fr-space-0)] [font-size:var(--fr-text-sm)] [line-height:var(--fr-leading-snug)] [color:var(--fr-destructive)]">
              {actionErrorMessage}
            </p>
          )}
          <TemplateSectionEditor
            sections={sections}
            readonly={approved}
            onLabelChange={onLabelChange}
            onDelete={onDelete}
            onRenderTypeChange={onRenderTypeChange}
            onFieldsChange={onFieldsChange}
            onGroupsChange={onGroupsChange}
            onReorder={onReorder}
          />
        </div>
        {showPreview && isPreviewOpen && (
          <div className="sticky [top:var(--fr-space-0)] box-border [width:calc(var(--fr-space-15)_*_2_+_var(--fr-space-12)_+_var(--fr-space-5))] [height:calc(100dvh_-_var(--fr-space-10))] shrink-0 overflow-y-auto [padding:var(--fr-space-5)] [background:var(--fr-surface-sunken)] [border-left:var(--fr-border-width-sm)_solid_var(--fr-border)]">
            <TemplatePreviewPanel sections={sections} />
          </div>
        )}
      </div>
    </div>
  )
}

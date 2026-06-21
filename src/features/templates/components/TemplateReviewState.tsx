import { useState } from 'react'
import { Button } from '@set-solutions-vof/design-system'
import { translations } from '@/lib/translations'
import { getTemplateSectionFieldCount } from '../lib/templateSectionFieldCount'
import type { TemplateReviewStateProps } from '@/typing/templateView'
import { TemplatePreviewPanel } from './TemplatePreviewPanel'
import { TemplateSectionEditor } from './TemplateSectionEditor'
import { TemplateSummaryHeader } from './TemplateSummaryHeader'

export function TemplateReviewState({
  sections,
  approved = false,
  editing = false,
  showPreview = false,
  version,
  updatedAt,
  actionErrorMessage,
  isConfirming,
  hasUnsavedChanges,
  onLabelChange,
  onDelete,
  onAddSection,
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
    (totalFields, section) =>
      totalFields + getTemplateSectionFieldCount(section),
    0,
  )

  const title = translations.template.review.section_structure_title

  const hint = approved || editing ? null : translations.template.review.hint

  const statusLabel = approved
    ? translations.template.review.active_status
    : null

  const action = approved ? (
    <div className="flex items-center [gap:var(--fr-space-2)]">
      {showPreview && (
        <Button
          variant="secondary"
          onClick={() => setIsPreviewOpen((open) => !open)}
        >
          {translations.template.review.preview_button}
        </Button>
      )}
      <Button variant="secondary" onClick={onEdit}>
        {translations.template.approved.edit_button}
      </Button>
    </div>
  ) : editing ? (
    <div className="flex items-center [gap:var(--fr-space-3)]">
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
      </div>
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
    <div className="flex [width:100%] flex-1 flex-col [min-height:var(--fr-space-0)] [padding-bottom:var(--fr-space-5)] [background:var(--fr-background)]">
      <div className="flex [width:100%] shrink-0 flex-col [padding:var(--fr-space-5)_var(--fr-space-5)_var(--fr-space-4)]">
        <TemplateSummaryHeader
          title={title}
          sectionsCount={sections.length}
          fieldsCount={fieldsCount}
          version={approved ? version : undefined}
          updatedAt={approved ? updatedAt : undefined}
          hint={hint}
          statusLabel={statusLabel}
          hasUnsavedChanges={!approved && hasUnsavedChanges}
          action={action}
        />
        {actionErrorMessage !== null && (
          <p className="[margin:var(--fr-space-2)_var(--fr-space-0)_var(--fr-space-0)] [font-size:var(--fr-text-sm)] [line-height:var(--fr-leading-snug)] [color:var(--fr-destructive)]">
            {actionErrorMessage}
          </p>
        )}
      </div>
      <div className="mx-[var(--fr-space-5)] flex [min-height:var(--fr-space-0)] flex-1 overflow-hidden [border:var(--fr-border-width-sm)_solid_var(--fr-border)] [border-radius:var(--fr-radius-lg)] [background:var(--fr-surface)] [box-shadow:var(--fr-shadow-md)]">
        <TemplateSectionEditor
          sections={sections}
          readonly={approved}
          onLabelChange={onLabelChange}
          onDelete={onDelete}
          onAddSection={approved ? undefined : onAddSection}
          onRenderTypeChange={onRenderTypeChange}
          onFieldsChange={onFieldsChange}
          onGroupsChange={onGroupsChange}
          onReorder={onReorder}
        />
        {showPreview && isPreviewOpen && (
          <aside className="box-border flex shrink-0 flex-col overflow-hidden [width:min(100%,calc(var(--fr-space-16)_+_var(--fr-space-15)))] [border-left:var(--fr-border-width-sm)_solid_var(--fr-border)] [background:var(--fr-surface-sunken)]">
            <div className="flex shrink-0 items-center justify-between [padding:var(--fr-space-4)_var(--fr-space-5)] [border-bottom:var(--fr-border-width-sm)_solid_var(--fr-border)] [background:var(--fr-surface)]">
              <span className="[font-size:var(--fr-text-xs)] [font-weight:var(--fr-weight-semibold)] [line-height:var(--fr-leading-snug)] [letter-spacing:var(--fr-tracking-label)] [color:var(--fr-text-tertiary)] uppercase">
                {translations.template.review.preview_button}
              </span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsPreviewOpen(false)}
              >
                {translations.template.review.preview_close_button}
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto [padding:var(--fr-space-5)]">
              <TemplatePreviewPanel sections={sections} />
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}

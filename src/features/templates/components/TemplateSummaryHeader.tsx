import { PageHeader } from '@/components/PageHeader'
import { translations } from '@/lib/translations'
import { templateSidebarWidthClass } from '../lib/templateLayout'
import type { TemplateSummaryHeaderProps } from '@/typing/templateView'
import { TemplateIcon } from './icons/TemplateIcon'

export function TemplateSummaryHeader({
  title,
  titleLeadingIcon,
  metadata,
  action,
  hasUnsavedChanges = false,
}: TemplateSummaryHeaderProps) {
  return (
    <header className="flex shrink-0 [background:var(--fr-surface)] [border-bottom:var(--fr-border-width-sm)_solid_var(--fr-border)]">
      <div
        className={`flex shrink-0 flex-col ${templateSidebarWidthClass} [padding:var(--fr-space-5)]`}
      >
        <PageHeader
          title={title}
          titleLeadingIcon={titleLeadingIcon}
          eyebrowLabel={translations.template.review.breadcrumb_label}
          metadata={metadata}
          className="[margin-bottom:var(--fr-space-0)]"
        />
        {hasUnsavedChanges && (
          <span className="inline-flex items-center [gap:var(--fr-space-2)] [margin-top:var(--fr-space-2)] [color:var(--fr-text-tertiary)] [font-size:var(--fr-text-sm)] [font-weight:var(--fr-weight-medium)] [line-height:var(--fr-leading-snug)]">
            <TemplateIcon
              name="edit"
              className="block [width:var(--fr-space-3)] [height:var(--fr-space-3)] [stroke-width:1.6]"
            />
            {translations.template.review.unsaved_changes_label}
          </span>
        )}
      </div>
      <div className="flex [min-width:var(--fr-space-0)] flex-1 items-center justify-end [padding:var(--fr-space-5)_var(--fr-space-8)]">
        {action}
      </div>
    </header>
  )
}

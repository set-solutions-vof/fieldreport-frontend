import type { ReactNode } from 'react'
import { PageSummaryHeader } from '@/components/PageSummaryHeader'
import { translations } from '@/lib/translations'
import type { TemplateSummaryHeaderProps } from '@/typing/templateView'
import { formatTemplateDate } from '../lib/formatTemplateDate'
import { TemplateIcon } from './icons/TemplateIcon'

function StatusBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center [gap:var(--fr-space-2)] [padding:var(--fr-space-1)_var(--fr-space-2)] [border-radius:var(--fr-radius-full)] [font-size:var(--fr-text-xs)] [font-weight:var(--fr-weight-medium)] [line-height:var(--fr-leading-snug)] [color:var(--fr-status-approved-fg)] [background:var(--fr-status-approved-bg)] [border:var(--fr-border-width-sm)_solid_var(--fr-status-approved-border)]">
      {children}
    </span>
  )
}

export function TemplateSummaryHeader({
  title,
  titleLeadingIcon,
  sectionsCount,
  fieldsCount,
  version,
  updatedAt,
  hint,
  statusLabel,
  action,
  hasUnsavedChanges = false,
}: TemplateSummaryHeaderProps) {
  const sectionsLabel = `${sectionsCount} ${translations.template.review.sections_stat.toLowerCase()}`
  const fieldsLabel = `${fieldsCount} ${translations.template.review.fields_stat.toLowerCase()}`
  const versionLabel =
    version !== undefined
      ? translations.template.approved.version_label.replace(
          '{{version}}',
          String(version),
        )
      : null
  const updatedLabel =
    updatedAt !== undefined
      ? translations.template.approved.last_updated_label.replace(
          '{{date}}',
          formatTemplateDate(updatedAt),
        )
      : null
  const metadataParts = [
    versionLabel,
    updatedLabel,
    sectionsLabel,
    fieldsLabel,
  ].filter((part): part is string => part !== null)

  return (
    <PageSummaryHeader
      title={title}
      titleLeadingIcon={titleLeadingIcon}
      metadata={metadataParts.join(' · ')}
      metadataBadges={
        <>
          {hasUnsavedChanges ? (
            <span className="inline-flex items-center [gap:var(--fr-space-2)] [padding:var(--fr-space-1)_var(--fr-space-2)] [border-radius:var(--fr-radius-full)] [font-size:var(--fr-text-xs)] [font-weight:var(--fr-weight-medium)] [line-height:var(--fr-leading-snug)] [color:var(--fr-color-amber-700)] [background:var(--fr-color-amber-50)] [border:var(--fr-border-width-sm)_solid_var(--fr-color-amber-100)]">
              <TemplateIcon
                name="edit"
                className="block [width:var(--fr-space-3)] [height:var(--fr-space-3)] [stroke-width:1.6]"
              />
              {translations.template.review.unsaved_changes_label}
            </span>
          ) : null}
          {statusLabel !== null && statusLabel !== undefined ? (
            <StatusBadge>
              <TemplateIcon
                name="checkCircle"
                className="block [width:var(--fr-space-3)] [height:var(--fr-space-3)] [stroke-width:1.6]"
              />
              {statusLabel}
            </StatusBadge>
          ) : null}
        </>
      }
      hint={hint}
      action={action}
    />
  )
}

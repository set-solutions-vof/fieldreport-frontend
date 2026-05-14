import { Button } from '@/design-system'
import { translations } from '@/lib/translations'
import type { TemplateSection } from '@/types/template'
import { TemplateIcon } from './TemplateIcon'
import { TemplateSectionGrid } from './TemplateSectionGrid'
import { TemplateSummaryHeader } from './TemplateSummaryHeader'

type TemplateReviewStateProps = {
  sections: TemplateSection[]
  reportsCount: number
  approved?: boolean
  actionErrorMessage: string | null
  isConfirming: boolean
  onLabelChange: (sectionId: string, label: string) => void
  onConfirm: () => void
}

export function TemplateReviewState({
  sections,
  reportsCount,
  approved = false,
  actionErrorMessage,
  isConfirming,
  onLabelChange,
  onConfirm,
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
    {
      label: translations.template.review.reports_stat,
      value: String(reportsCount),
    },
  ]

  return (
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
            : translations.template.review.hint
        }
        stats={stats}
        action={
          approved ? (
            <Button
              variant="ghost"
              disabled
              title={translations.template.approved.edit_tooltip}
            >
              {translations.template.approved.edit_button}
            </Button>
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
        />
      </section>
    </>
  )
}

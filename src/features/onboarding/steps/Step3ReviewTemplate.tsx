import { TemplateFailedState } from '@/features/templates/components/TemplateFailedState'
import { TemplateReviewState } from '@/features/templates/components/TemplateReviewState'
import { translations } from '@/lib/translations'
import type { Step3ReviewTemplateProps } from '@/types/onboardingView'

export function Step3ReviewTemplate({
  templateConfiguration,
}: Step3ReviewTemplateProps) {
  const {
    pageState,
    actionErrorMessage,
    isConfirming,
    saveStatus,
    updateSectionLabel,
    updateSectionRenderType,
    updateSectionFields,
    updateSectionGroups,
    deleteSection,
    reorderSections,
    confirmCurrentTemplate,
    resetAfterFailure,
  } = templateConfiguration

  if (pageState.kind === 'failed') {
    return (
      <section className="fr-onboarding-step fr-onboarding-step--review">
        <TemplateFailedState
          errorMessage={pageState.errorMessage}
          onTryAgain={resetAfterFailure}
        />
      </section>
    )
  }

  if (pageState.kind !== 'preview' && pageState.kind !== 'approved') {
    return (
      <section className="fr-onboarding-step fr-onboarding-step--review">
        <TemplateFailedState
          errorMessage={translations.onboarding.template_review.missing_reports}
          onTryAgain={resetAfterFailure}
        />
      </section>
    )
  }

  return (
    <section className="fr-onboarding-step fr-onboarding-step--review">
      <TemplateReviewState
        showPreview
        approved={pageState.kind === 'approved'}
        sections={pageState.sections}
        actionErrorMessage={actionErrorMessage}
        isConfirming={isConfirming}
        saveStatus={saveStatus}
        onLabelChange={updateSectionLabel}
        onDelete={deleteSection}
        onRenderTypeChange={updateSectionRenderType}
        onFieldsChange={updateSectionFields}
        onGroupsChange={updateSectionGroups}
        onReorder={reorderSections}
        onConfirm={() => void confirmCurrentTemplate()}
      />
    </section>
  )
}

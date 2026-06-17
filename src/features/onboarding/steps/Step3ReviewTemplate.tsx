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
    hasUnsavedChanges,
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
      <section className="flex [min-height:100%] [width:min(100%,_calc(var(--fr-space-16)_*_5))] box-border flex-col [gap:var(--fr-space-6)] [padding:var(--fr-space-8)_var(--fr-space-7)] w-full [padding:var(--fr-space-0)]">
        <TemplateFailedState
          errorMessage={pageState.errorMessage}
          onTryAgain={resetAfterFailure}
        />
      </section>
    )
  }

  if (pageState.kind !== 'preview' && pageState.kind !== 'approved') {
    return (
      <section className="flex [min-height:100%] [width:min(100%,_calc(var(--fr-space-16)_*_5))] box-border flex-col [gap:var(--fr-space-6)] [padding:var(--fr-space-8)_var(--fr-space-7)] w-full [padding:var(--fr-space-0)]">
        <TemplateFailedState
          errorMessage={translations.onboarding.template_review.missing_reports}
          onTryAgain={resetAfterFailure}
        />
      </section>
    )
  }

  return (
    <section className="flex [min-height:100%] [width:min(100%,_calc(var(--fr-space-16)_*_5))] box-border flex-col [gap:var(--fr-space-6)] [padding:var(--fr-space-8)_var(--fr-space-7)] w-full [padding:var(--fr-space-0)]">
      <TemplateReviewState
        showPreview
        approved={pageState.kind === 'approved'}
        sections={pageState.sections}
        actionErrorMessage={actionErrorMessage}
        isConfirming={isConfirming}
        hasUnsavedChanges={hasUnsavedChanges}
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

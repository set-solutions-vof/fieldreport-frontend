import { TemplateFailedState } from '@/features/templates/components/TemplateFailedState'
import { TemplateReviewState } from '@/features/templates/components/TemplateReviewState'
import { translations } from '@/lib/translations'
import type { Step3ReviewTemplateProps } from '@/typing/onboardingView'

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
    startEditingTemplate,
    cancelEditing,
    resetAfterFailure,
  } = templateConfiguration

  if (pageState.kind === 'failed') {
    return (
      <div className="flex flex-1 items-center justify-center [padding:var(--fr-space-6)]">
        <TemplateFailedState
          errorMessage={pageState.errorMessage}
          onTryAgain={resetAfterFailure}
        />
      </div>
    )
  }

  if (
    pageState.kind !== 'preview' &&
    pageState.kind !== 'approved' &&
    pageState.kind !== 'editing'
  ) {
    return (
      <div className="flex flex-1 items-center justify-center [padding:var(--fr-space-6)]">
        <TemplateFailedState
          errorMessage={translations.onboarding.template_review.missing_reports}
          onTryAgain={resetAfterFailure}
        />
      </div>
    )
  }

  return (
    <TemplateReviewState
      showPreview
      approved={pageState.kind === 'approved'}
      editing={pageState.kind === 'editing'}
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
      onEdit={startEditingTemplate}
      onCancel={cancelEditing}
    />
  )
}

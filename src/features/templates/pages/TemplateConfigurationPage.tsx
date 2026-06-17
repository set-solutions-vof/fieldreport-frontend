import { useRef } from 'react'
import type { ChangeEvent, DragEvent } from 'react'
import { Button, Spinner } from '@set-solutions-vof/design-system'
import { useCurrentUser } from '@/features/auth/useCurrentUser'
import { AppShell } from '@/app/AppShell'
import { PageHeader } from '@/components/PageHeader'
import { translations } from '@/lib/translations'
import { TemplateEmptyState } from '../components/TemplateEmptyState'
import { TemplateFailedState } from '../components/TemplateFailedState'
import { TemplateReviewState } from '../components/TemplateReviewState'
import { TemplateSkeletonGrid } from '../components/TemplateSkeletonGrid'
import { TemplateUploadingState } from '../components/TemplateUploadingState'
import { useTemplateConfiguration } from '../hooks/useTemplateConfiguration'
import type { TemplateConfigurationPageProps } from '@/types/templateView'

export function TemplateConfigurationPage({
  onOpenTemplate,
  onOpenTeam,
  onOpenProfile,
  onAuthenticationExpired,
  onLogout,
}: TemplateConfigurationPageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const {
    pageState,
    isLoading,
    isError,
    errorMessage,
    actionErrorMessage,
    isConfirming,
    hasUnsavedChanges,
    retry,
    addFiles,
    removeFile,
    cancelUpload,
    startAnalysis,
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
  } = useTemplateConfiguration({ onAuthenticationExpired })
  const {
    currentUser,
    isLoading: isCurrentUserLoading,
    isError: isCurrentUserError,
    errorMessage: currentUserErrorMessage,
    retry: retryCurrentUser,
  } = useCurrentUser({ onAuthenticationExpired })

  function openFilePicker(): void {
    fileInputRef.current?.click()
  }

  function handleFileInputChange(event: ChangeEvent<HTMLInputElement>): void {
    addFiles(Array.from(event.target.files ?? []))
    event.target.value = ''
  }

  function handleDrop(event: DragEvent<HTMLElement>): void {
    event.preventDefault()
    addFiles(Array.from(event.dataTransfer.files))
  }

  function handleDragOver(event: DragEvent<HTMLElement>): void {
    event.preventDefault()
  }

  if (isLoading || isCurrentUserLoading) {
    return (
      <main className="flex min-h-[100dvh] box-border [padding:var(--fr-space-7)] [background:var(--fr-background)]">
        <div className="flex [max-width:calc(var(--fr-space-16)_+_var(--fr-space-15))] flex-col items-start">
          <Spinner size="lg" />
        </div>
      </main>
    )
  }

  if (isError || isCurrentUserError || currentUser === null) {
    return (
      <main className="flex min-h-[100dvh] box-border [padding:var(--fr-space-7)] [background:var(--fr-background)]">
        <div className="flex [max-width:calc(var(--fr-space-16)_+_var(--fr-space-15))] flex-col items-start">
          <PageHeader
            title={translations.template.errors.load_failed_title}
            metadata={errorMessage ?? currentUserErrorMessage}
          />
          <Button
            type="button"
            variant="primary"
            onClick={() => {
              retry()
              retryCurrentUser()
            }}
          >
            {translations.dashboard.states.retry_button}
          </Button>
        </div>
      </main>
    )
  }

  return (
    <AppShell
      currentUser={currentUser}
      activeNavigationItem="template"
      breadcrumbItems={[{ label: translations.template.navigation_label }]}
      contentClassName="[gap:var(--fr-space-0)] [padding:var(--fr-space-0)]"
      onOpenTemplate={onOpenTemplate}
      onOpenTeam={onOpenTeam}
      onOpenProfile={onOpenProfile}
      onLogout={onLogout}
    >
      <main
        className="flex [min-height:calc(100dvh_-_var(--fr-space-10))] flex-col [background:var(--fr-background)]"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          ref={fileInputRef}
          className="absolute [width:var(--fr-space-0)] [height:var(--fr-space-0)] overflow-hidden [opacity:0] pointer-events-none"
          type="file"
          multiple
          accept="application/pdf"
          onChange={handleFileInputChange}
        />
        {pageState.kind === 'empty' && (
          <TemplateEmptyState onUploadReports={openFilePicker} />
        )}
        {pageState.kind === 'uploading' && (
          <TemplateUploadingState
            files={pageState.files}
            actionErrorMessage={actionErrorMessage}
            onAddFiles={openFilePicker}
            onRemoveFile={removeFile}
            onCancel={cancelUpload}
            onStartAnalysis={() => void startAnalysis()}
          />
        )}
        {pageState.kind === 'processing' && <TemplateSkeletonGrid />}
        {pageState.kind === 'failed' && (
          <TemplateFailedState
            errorMessage={pageState.errorMessage}
            onTryAgain={resetAfterFailure}
          />
        )}
        {pageState.kind === 'preview' && (
          <TemplateReviewState
            showPreview
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
        )}
        {pageState.kind === 'editing' && (
          <TemplateReviewState
            editing
            showPreview
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
            onCancel={cancelEditing}
          />
        )}
        {pageState.kind === 'approved' && (
          <TemplateReviewState
            approved
            sections={pageState.sections}
            actionErrorMessage={actionErrorMessage}
            isConfirming={isConfirming}
            onLabelChange={updateSectionLabel}
            onDelete={deleteSection}
            onRenderTypeChange={updateSectionRenderType}
            onFieldsChange={updateSectionFields}
            onGroupsChange={updateSectionGroups}
            onReorder={reorderSections}
            onConfirm={() => void confirmCurrentTemplate()}
            onEdit={startEditingTemplate}
          />
        )}
      </main>
    </AppShell>
  )
}

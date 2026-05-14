import { useRef } from 'react'
import type { ChangeEvent, DragEvent } from 'react'
import { Button, Spinner } from '@/design-system'
import { useCurrentUser } from '@/features/auth/useCurrentUser'
import { AppShell } from '@/app/AppShell'
import { translations } from '@/lib/translations'
import { TemplateEmptyState } from '../components/TemplateEmptyState'
import { TemplateReviewState } from '../components/TemplateReviewState'
import { TemplateSkeletonGrid } from '../components/TemplateSkeletonGrid'
import { TemplateUploadingState } from '../components/TemplateUploadingState'
import { useTemplateConfiguration } from '../hooks/useTemplateConfiguration'
import type { TemplateConfigurationPageProps } from '../types/templateView'
import './TemplateConfigurationPage.css'

export function TemplateConfigurationPage({
  onOpenTemplate,
  onAuthenticationExpired,
}: TemplateConfigurationPageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const {
    pageState,
    isLoading,
    isError,
    errorMessage,
    actionErrorMessage,
    isConfirming,
    retry,
    addFiles,
    removeFile,
    cancelUpload,
    startAnalysis,
    updateSectionLabel,
    confirmCurrentTemplate,
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
      <main className="fr-dashboard-loading-page">
        <div className="fr-dashboard-state">
          <Spinner size="lg" />
        </div>
      </main>
    )
  }

  if (isError || isCurrentUserError || currentUser === null) {
    return (
      <main className="fr-dashboard-loading-page">
        <div className="fr-dashboard-state">
          <h1>{translations.template.errors.load_failed_title}</h1>
          <p>{errorMessage ?? currentUserErrorMessage}</p>
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
      contentClassName="fr-dashboard-content--template"
      onOpenTemplate={onOpenTemplate}
    >
      <main
        className="fr-template-page"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          ref={fileInputRef}
          className="fr-template-file-input"
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
        {pageState.kind === 'preview' && (
          <TemplateReviewState
            sections={pageState.sections}
            actionErrorMessage={actionErrorMessage}
            isConfirming={isConfirming}
            onLabelChange={updateSectionLabel}
            onConfirm={() => void confirmCurrentTemplate()}
          />
        )}
        {pageState.kind === 'approved' && (
          <TemplateReviewState
            approved
            sections={pageState.sections}
            actionErrorMessage={actionErrorMessage}
            isConfirming={isConfirming}
            onLabelChange={updateSectionLabel}
            onConfirm={() => void confirmCurrentTemplate()}
          />
        )}
      </main>
    </AppShell>
  )
}

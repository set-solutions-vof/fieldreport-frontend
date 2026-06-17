import { useRef } from 'react'
import type { ChangeEvent, DragEvent } from 'react'
import { translations } from '@/lib/translations'
import {
  ShellContentError,
  ShellContentLoader,
} from '@/components/ShellContentState'
import { TemplateEmptyState } from '../components/TemplateEmptyState'
import { TemplateFailedState } from '../components/TemplateFailedState'
import { TemplateReviewState } from '../components/TemplateReviewState'
import { TemplateSkeletonGrid } from '../components/TemplateSkeletonGrid'
import { TemplateUploadingState } from '../components/TemplateUploadingState'
import { useTemplateConfiguration } from '../hooks/useTemplateConfiguration'
import type { TemplateConfigurationPageProps } from '@/typing/templateView'

export function TemplateConfigurationPage({
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

  if (isLoading) {
    return <ShellContentLoader />
  }

  if (isError) {
    return (
      <ShellContentError
        title={translations.template.errors.load_failed_title}
        message={errorMessage}
        onRetry={retry}
      />
    )
  }

  return (
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
  )
}

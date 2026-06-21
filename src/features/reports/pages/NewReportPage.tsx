import { useRef } from 'react'
import type { FormEvent } from 'react'
import { Button } from '@set-solutions-vof/design-system'
import { translations } from '@/lib/translations'
import { NewReportCompletionProgress } from '../components/NewReportCompletionProgress'
import { NewReportContextCard } from '../components/NewReportContextCard'
import { NewReportFilesCard } from '../components/NewReportFilesCard'
import { NewReportProjectDetailsCard } from '../components/NewReportProjectDetailsCard'
import { useActiveTemplate } from '../hooks/useActiveTemplate'
import { useNewReport } from '../hooks/useNewReport'
import { currentUserDisplayName } from '@/typing/auth'
import type { NewReportPageProps } from '@/typing/newReportView'

export function NewReportPage({
  currentUser,
  onAuthenticationExpired,
  onReportCreated,
  onCancel,
}: NewReportPageProps) {
  const audioInputRef = useRef<HTMLInputElement>(null)
  const photosInputRef = useRef<HTMLInputElement>(null)
  const {
    form,
    errors,
    isSubmitting,
    showMetadataErrors,
    updateMetadata,
    updateField,
    addAudioFiles,
    removeAudioFile,
    addPhotoFiles,
    removePhotoFile,
    submit,
  } = useNewReport({
    onAuthenticationExpired,
    onSuccess: onReportCreated,
  })
  const {
    template,
    isLoading: isTemplateLoading,
    isError: isTemplateError,
    errorMessage: templateErrorMessage,
    retry: retryTemplate,
  } = useActiveTemplate({ onAuthenticationExpired })

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    void submit(template?.metadata_fields ?? [])
  }

  return (
    <form
      className="flex [width:min(100%,_calc(var(--fr-space-16)_*_4))] flex-col [gap:var(--fr-space-5)]"
      noValidate
      onSubmit={handleSubmit}
    >
      <NewReportCompletionProgress
        metadataFields={template?.metadata_fields ?? []}
        metadataValue={form.metadata}
      />
      <NewReportProjectDetailsCard
        fields={template?.metadata_fields ?? []}
        inspectorName={currentUserDisplayName(currentUser)}
        isSubmitting={isSubmitting}
        isTemplateError={isTemplateError}
        isTemplateLoading={isTemplateLoading}
        metadataValue={form.metadata}
        showMetadataErrors={showMetadataErrors}
        templateErrorMessage={templateErrorMessage}
        onMetadataChange={updateMetadata}
        onRetryTemplate={retryTemplate}
      />
      <NewReportFilesCard
        audioFiles={form.audioFiles}
        audioInputRef={audioInputRef}
        audioError={errors.audioFiles}
        photoFiles={form.photoFiles}
        photosInputRef={photosInputRef}
        onAddAudioFiles={addAudioFiles}
        onAddPhotoFiles={addPhotoFiles}
        onRemoveAudioFile={removeAudioFile}
        onRemovePhotoFile={removePhotoFile}
      />
      <NewReportContextCard
        extraContext={form.extraContext}
        isSubmitting={isSubmitting}
        onExtraContextChange={(event) =>
          updateField('extraContext', event.currentTarget.value)
        }
      />
      {errors.submit && (
        <p
          className="[margin:var(--fr-space-0)] [color:var(--fr-destructive)] [font-size:var(--fr-text-sm)] [line-height:var(--fr-leading-snug)]"
          role="alert"
        >
          {errors.submit}
        </p>
      )}
      <footer className="flex items-center justify-end [gap:var(--fr-space-3)]">
        <Button
          type="button"
          variant="ghost"
          disabled={isSubmitting}
          onClick={onCancel}
        >
          {translations.new_report.cancel_button}
        </Button>
        <Button
          type="submit"
          variant="primary"
          disabled={isTemplateLoading || isTemplateError}
          loading={isSubmitting}
        >
          {translations.new_report.submit_button}
        </Button>
      </footer>
    </form>
  )
}

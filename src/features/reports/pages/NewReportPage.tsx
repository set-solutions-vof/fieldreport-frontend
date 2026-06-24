import { useRef } from 'react'
import type { FormEvent } from 'react'
import { Button } from '@set-solutions-vof/design-system'
import { PageHeader } from '@/components/PageHeader'
import { translations } from '@/lib/translations'
import { NewReportFilesCard } from '../components/NewReportFilesCard'
import { NewReportProjectDetailsCard } from '../components/NewReportProjectDetailsCard'
import { useActiveTemplate } from '../hooks/useActiveTemplate'
import { useNewReport } from '../hooks/useNewReport'
import type { NewReportPageProps } from '@/typing/newReportView'

export function NewReportPage({
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
      className="flex w-full flex-col [gap:var(--fr-space-5)]"
      noValidate
      onSubmit={handleSubmit}
    >
      <PageHeader
        title={translations.new_report.page_title}
        metadata={translations.new_report.page_subtitle}
        withBottomSpacing={false}
      />
      <div className="grid [grid-template-columns:1fr_1fr] [gap:var(--fr-space-5)]">
        <NewReportProjectDetailsCard
          fields={template?.metadata_fields ?? []}
          isSubmitting={isSubmitting}
          isTemplateError={isTemplateError}
          isTemplateLoading={isTemplateLoading}
          metadataValue={form.metadata}
          showMetadataErrors={showMetadataErrors}
          templateErrorMessage={templateErrorMessage}
          onMetadataChange={updateMetadata}
          onRetryTemplate={retryTemplate}
        />
        <div className="flex flex-col">
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
        </div>
      </div>
      {errors.submit && (
        <p
          className="[margin:var(--fr-space-0)] [color:var(--fr-destructive)] [font-size:var(--fr-text-sm)] [line-height:var(--fr-leading-snug)]"
          role="alert"
        >
          {errors.submit}
        </p>
      )}
      <footer className="flex items-center justify-end [gap:var(--fr-space-3)] [padding-top:var(--fr-space-4)] [border-top:var(--fr-border-width-sm)_solid_var(--fr-border)]">
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

import { useRef } from 'react'
import type { FormEvent } from 'react'
import { Button, Spinner } from '@set-solutions-vof/design-system'
import { AppShell } from '@/app/AppShell'
import { PageHeader } from '@/components/PageHeader'
import { useCurrentUser } from '@/features/auth/useCurrentUser'
import { translations } from '@/lib/translations'
import type { NewReportPageProps } from '@/types/newReportView'
import { NewReportCompletionProgress } from '../components/NewReportCompletionProgress'
import { NewReportContextCard } from '../components/NewReportContextCard'
import { NewReportFilesCard } from '../components/NewReportFilesCard'
import { NewReportProjectDetailsCard } from '../components/NewReportProjectDetailsCard'
import { useActiveTemplate } from '../hooks/useActiveTemplate'
import { useNewReport } from '../hooks/useNewReport'

export function NewReportPage({
  onAuthenticationExpired,
  onReportCreated,
  onCancel,
  onOpenDashboard,
  onOpenReports,
  onOpenProfile,
  onLogout,
  totalReportsCount,
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
  const {
    currentUser,
    isLoading: isCurrentUserLoading,
    isError: isCurrentUserError,
    errorMessage: currentUserErrorMessage,
    retry: retryCurrentUser,
  } = useCurrentUser({ onAuthenticationExpired })

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    void submit(template?.metadata_fields ?? [])
  }

  if (isCurrentUserLoading) {
    return (
      <main className="flex min-h-[100dvh] box-border [padding:var(--fr-space-7)] [background:var(--fr-background)]">
        <div className="flex [max-width:calc(var(--fr-space-16)_+_var(--fr-space-15))] flex-col items-start">
          <Spinner size="lg" />
        </div>
      </main>
    )
  }

  if (isCurrentUserError) {
    return (
      <main className="flex min-h-[100dvh] box-border [padding:var(--fr-space-7)] [background:var(--fr-background)]">
        <div className="flex [max-width:calc(var(--fr-space-16)_+_var(--fr-space-15))] flex-col items-start">
          <PageHeader
            title={translations.dashboard.states.reports_load_failed_title}
            metadata={currentUserErrorMessage}
          />
          <Button type="button" variant="primary" onClick={retryCurrentUser}>
            {translations.dashboard.states.retry_button}
          </Button>
        </div>
      </main>
    )
  }

  return (
    <AppShell
      currentUser={currentUser!}
      activeNavigationItem="dashboard"
      breadcrumbItems={[
        {
          label: translations.dashboard.navigation.dashboard,
          onClick: onOpenDashboard,
        },
        { label: translations.new_report.page_title },
      ]}
      contentClassName="[gap:var(--fr-space-0)]"
      totalReportsCount={totalReportsCount}
      onOpenDashboard={onOpenDashboard}
      onOpenReports={onOpenReports}
      onOpenProfile={onOpenProfile}
      onLogout={onLogout}
    >
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
          inspectorName={currentUser!.name}
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
    </AppShell>
  )
}

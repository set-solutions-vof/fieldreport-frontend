import { useRef } from 'react'
import type { FormEvent } from 'react'
import { Button, Spinner } from '@/design-system'
import { AppShell } from '@/app/AppShell'
import { useCurrentUser } from '@/features/auth/useCurrentUser'
import { translations } from '@/lib/translations'
import type { NewReportPageProps } from '@/types/newReportView'
import { NewReportCompletionProgress } from '../components/NewReportCompletionProgress'
import { NewReportContextCard } from '../components/NewReportContextCard'
import { NewReportFilesCard } from '../components/NewReportFilesCard'
import { NewReportProjectDetailsCard } from '../components/NewReportProjectDetailsCard'
import { useActiveTemplate } from '../hooks/useActiveTemplate'
import { useNewReport } from '../hooks/useNewReport'
import './NewReportPage.css'

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
      <main className="fr-dashboard-loading-page">
        <div className="fr-dashboard-state">
          <Spinner size="lg" />
        </div>
      </main>
    )
  }

  if (isCurrentUserError) {
    return (
      <main className="fr-dashboard-loading-page">
        <div className="fr-dashboard-state">
          <h1>{translations.dashboard.states.reports_load_failed_title}</h1>
          <p>{currentUserErrorMessage}</p>
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
      contentClassName="fr-dashboard-content--new-report"
      totalReportsCount={totalReportsCount}
      onOpenDashboard={onOpenDashboard}
      onOpenReports={onOpenReports}
      onOpenProfile={onOpenProfile}
      onLogout={onLogout}
    >
      <form className="fr-new-report-page" noValidate onSubmit={handleSubmit}>
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
          <p className="fr-new-report-submit-error" role="alert">
            {errors.submit}
          </p>
        )}
        <footer className="fr-new-report-submit-row">
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

import { TemplateEmptyState } from '@/features/templates/components/TemplateEmptyState'
import { TemplateFailedState } from '@/features/templates/components/TemplateFailedState'
import { TemplateSkeletonGrid } from '@/features/templates/components/TemplateSkeletonGrid'
import { TemplateUploadingState } from '@/features/templates/components/TemplateUploadingState'
import type { Step2UploadReportsProps } from '@/types/onboardingView'

export function Step2UploadReports({
  templateConfiguration,
  onOpenFilePicker,
}: Step2UploadReportsProps) {
  const {
    pageState,
    actionErrorMessage,
    removeFile,
    cancelUpload,
    startAnalysis,
    resetAfterFailure,
  } = templateConfiguration

  return (
    <section className="fr-onboarding-step fr-onboarding-step--template-upload">
      {(pageState.kind === 'empty' ||
        pageState.kind === 'preview' ||
        pageState.kind === 'approved') && (
        <TemplateEmptyState onUploadReports={onOpenFilePicker} />
      )}
      {pageState.kind === 'uploading' && (
        <TemplateUploadingState
          files={pageState.files}
          actionErrorMessage={actionErrorMessage}
          onAddFiles={onOpenFilePicker}
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
    </section>
  )
}

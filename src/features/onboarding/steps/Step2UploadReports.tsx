import { TemplateEmptyState } from '@/features/templates/components/TemplateEmptyState'
import { TemplateFailedState } from '@/features/templates/components/TemplateFailedState'
import { TemplateSkeletonGrid } from '@/features/templates/components/TemplateSkeletonGrid'
import { TemplateUploadingState } from '@/features/templates/components/TemplateUploadingState'
import type { Step2UploadReportsProps } from '@/typing/onboardingView'

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
    <section className="flex [min-height:100%] [width:min(100%,_calc(var(--fr-space-16)_*_5))] box-border flex-col [gap:var(--fr-space-6)] [padding:var(--fr-space-8)_var(--fr-space-7)] w-full [max-width:none] [padding:var(--fr-space-0)]">
      {pageState.kind === 'empty' && (
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
      {(pageState.kind === 'preview' || pageState.kind === 'approved') && (
        <TemplateSkeletonGrid />
      )}
      {pageState.kind === 'failed' && (
        <TemplateFailedState
          errorMessage={pageState.errorMessage}
          onTryAgain={resetAfterFailure}
        />
      )}
    </section>
  )
}

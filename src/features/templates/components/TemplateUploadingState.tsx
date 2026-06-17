import { Button } from '@set-solutions-vof/design-system'
import { PageHeader } from '@/components/PageHeader'
import { translations } from '@/lib/translations'
import { formatFileSize } from '../lib/templateFormatters'
import type { TemplateUploadingStateProps } from '@/typing/templateView'
import { TemplateIcon } from './icons/TemplateIcon'

export function TemplateUploadingState({
  files,
  actionErrorMessage,
  onAddFiles,
  onRemoveFile,
  onCancel,
  onStartAnalysis,
}: TemplateUploadingStateProps) {
  const filesReadyText = (
    files.length === 1
      ? translations.template.uploading.files_ready_singular
      : translations.template.uploading.files_ready_plural
  ).replace('{{count}}', String(files.length))

  return (
    <section className="flex [width:min(_calc(var(--fr-space-15)_*_3_+_var(--fr-space-8)),_calc(100%_-_var(--fr-space-12))_)] flex-1 flex-col justify-center [gap:var(--fr-space-5)] [margin:var(--fr-space-0)_auto] [padding:var(--fr-space-6)]">
      <PageHeader
        title={translations.template.uploading.title}
        metadata={translations.template.uploading.description}
      />
      <button
        type="button"
        className="flex flex-row items-center [gap:var(--fr-space-3)] [padding:var(--fr-space-4)] [font:inherit] [color:var(--fr-text-secondary)] text-left cursor-pointer [background:var(--fr-surface)] [border:var(--fr-border-width-sm)_dashed_var(--fr-border-strong)] [border-radius:var(--fr-radius-lg)] hover:[border-color:var(--fr-border-focus)] hover:outline-none focus-visible:[border-color:var(--fr-border-focus)] focus-visible:outline-none focus-visible:[box-shadow:var(--fr-shadow-focus)]"
        onClick={onAddFiles}
      >
        <TemplateIcon
          name="upload"
          className="[width:var(--fr-space-7)] [height:var(--fr-space-7)] [padding:var(--fr-space-2)] box-border shrink-0 [color:var(--fr-text-tertiary)] [stroke-width:1.4] [background:var(--fr-surface)] [border:var(--fr-border-width-sm)_solid_var(--fr-border)] [border-radius:var(--fr-radius-md)]"
        />
        <span className="flex flex-col [gap:var(--fr-space-1)] [&_strong]:[font-size:var(--fr-text-sm)] [&_strong]:[font-weight:var(--fr-weight-semibold)] [&_strong]:[line-height:var(--fr-leading-snug)] [&_strong]:[color:var(--fr-text-primary)] [&_small]:[font-size:var(--fr-text-xs)] [&_small]:[line-height:var(--fr-leading-snug)] [&_small]:[color:var(--fr-text-secondary)]">
          <strong>
            {translations.template.uploading.dropzone_label}{' '}
            <span>{translations.template.uploading.dropzone_browse_label}</span>
          </strong>
          <small>{translations.template.uploading.dropzone_helper}</small>
        </span>
      </button>
      <div className="grid [grid-template-columns:1fr] [gap:var(--fr-space-2)]">
        {files.map((file) => (
          <div
            className="flex [min-width:var(--fr-space-0)] items-center [gap:var(--fr-space-3)] [padding:var(--fr-space-3)_var(--fr-space-4)] [background:var(--fr-surface)] [border:var(--fr-border-width-sm)_solid_var(--fr-border)] [border-radius:var(--fr-radius-lg)]"
            key={`${file.name}-${file.size}`}
          >
            <TemplateIcon
              name="document"
              className="[width:var(--fr-space-7)] [height:var(--fr-space-7)] [padding:var(--fr-space-2)] box-border shrink-0 [color:var(--fr-destructive)] [stroke-width:1.4] [background:var(--fr-status-failed-bg)] [border-radius:var(--fr-radius-md)]"
            />
            <span className="flex [min-width:var(--fr-space-0)] flex-1 flex-col [gap:var(--fr-space-1)]">
              <span className="[min-width:var(--fr-space-0)] overflow-hidden [font-size:var(--fr-text-sm)] [font-weight:var(--fr-weight-medium)] [line-height:var(--fr-leading-snug)] [color:var(--fr-text-primary)] text-ellipsis whitespace-nowrap">
                {file.name}
              </span>
              <span className="[font-variant-numeric:tabular-nums] shrink-0 [font-size:var(--fr-text-sm)] [line-height:var(--fr-leading-snug)] [color:var(--fr-text-tertiary)]">
                {formatFileSize(file)} · PDF
              </span>
            </span>
            <span className="inline-flex items-center [gap:var(--fr-space-1)] shrink-0 [padding:var(--fr-space-1)_var(--fr-space-2)] [border-radius:var(--fr-radius-full)] [font-size:var(--fr-text-xs)] [font-weight:var(--fr-weight-semibold)] [line-height:var(--fr-leading-snug)] [color:var(--fr-status-approved-fg)] [background:var(--fr-status-approved-bg)] [border:var(--fr-border-width-sm)_solid_var(--fr-status-approved-border)]">
              <TemplateIcon
                name="checkCircle"
                className="[width:var(--fr-space-3)] [height:var(--fr-space-3)] [stroke-width:2]"
              />
              {translations.template.uploading.ready_badge}
            </span>
            <button
              type="button"
              className="inline-flex items-center justify-center [padding:var(--fr-space-1)] [color:var(--fr-text-tertiary)] cursor-pointer bg-transparent border-0 [border-radius:var(--fr-radius-md)] hover:[color:var(--fr-text-primary)] hover:[background:var(--fr-surface-hover)] hover:outline-none focus-visible:[color:var(--fr-text-primary)] focus-visible:[background:var(--fr-surface-hover)] focus-visible:outline-none"
              aria-label={`${translations.template.uploading.remove_file_label} ${file.name}`}
              onClick={() => onRemoveFile(file.name)}
            >
              <TemplateIcon
                name="x"
                className="block [width:var(--fr-space-4)] [height:var(--fr-space-4)] [stroke-width:1.6]"
              />
            </button>
          </div>
        ))}
      </div>
      {actionErrorMessage !== null && (
        <p className="[margin:var(--fr-space-0)] [font-size:var(--fr-text-sm)] [line-height:var(--fr-leading-snug)] [color:var(--fr-destructive)]">
          {actionErrorMessage}
        </p>
      )}
      <footer className="[&>span]:[font-variant-numeric:tabular-nums] flex items-center justify-between [gap:var(--fr-space-4)] [&>span]:[font-size:var(--fr-text-xs)] [&>span]:[line-height:var(--fr-leading-snug)] [&>span]:[color:var(--fr-text-tertiary)] [&>div]:flex [&>div]:[gap:var(--fr-space-2)]">
        <span className="inline-flex items-center [gap:var(--fr-space-2)]">
          <TemplateIcon
            name="checkCircle"
            className="[width:var(--fr-space-3)] [height:var(--fr-space-3)] [stroke-width:2.25] [color:var(--fr-status-approved-fg)]"
          />
          {filesReadyText}
        </span>
        <div>
          <Button variant="ghost" onClick={onCancel}>
            {translations.template.uploading.cancel_button}
          </Button>
          <Button variant="primary" onClick={onStartAnalysis}>
            {translations.template.uploading.start_button}
          </Button>
        </div>
      </footer>
    </section>
  )
}

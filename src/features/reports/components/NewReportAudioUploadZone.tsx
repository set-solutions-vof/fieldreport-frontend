import { translations } from '@/lib/translations'
import type { NewReportAudioUploadZoneProps } from '@/typing/newReportView'
import { FileChip } from './NewReportFileChip'

export function NewReportAudioUploadZone({
  files,
  error,
  onRemoveFile,
  handlers,
}: NewReportAudioUploadZoneProps) {
  return (
    <div className="flex flex-col flex-1 [gap:var(--fr-space-2)]">
      <span className="[font-size:var(--fr-text-sm)] [font-weight:var(--fr-weight-medium)] [color:var(--fr-text-primary)]">
        {translations.new_report.fields.audio_label}
      </span>
      <div
        className="flex-1 flex flex-col items-center justify-center [gap:var(--fr-space-2)] [padding:var(--fr-space-6)_var(--fr-space-4)] cursor-pointer [background:var(--fr-surface-sunken)] [border:calc(var(--fr-border-width-sm)_+_var(--fr-border-width-sm)_/_2)_dashed_var(--fr-border-strong)] [border-radius:var(--fr-radius-lg)] [transition:var(--fr-transition-base)] hover:[border-color:var(--fr-accent)] hover:outline-none focus-visible:[border-color:var(--fr-accent)] focus-visible:outline-none"
        onDrop={handlers.onDrop}
        onDragOver={handlers.onDragOver}
        onClick={handlers.onOpenPicker}
        onKeyDown={handlers.onKeyDown}
        role="button"
        tabIndex={0}
        aria-label={translations.new_report.fields.audio_label}
      >
        <svg
          className="[width:var(--fr-space-6)] [height:var(--fr-space-6)] [color:var(--fr-text-tertiary)] [margin-bottom:var(--fr-space-1)]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3m6.366-.366-2.12 2.12M21 12h-3m.366 6.366-2.12-2.12M12 21v-3m-6.366.366 2.12-2.12M3 12h3m-.366-6.366 2.12 2.12" />
        </svg>
        <p className="[margin:var(--fr-space-0)] [font-size:var(--fr-text-base)] [font-weight:var(--fr-weight-medium)] [color:var(--fr-text-primary)]">
          {translations.new_report.fields.audio_help}{' '}
          <span className="[color:var(--fr-accent)]">
            {translations.new_report.fields.browse}
          </span>
        </p>
        <p className="[margin:var(--fr-space-0)] [font-size:var(--fr-text-sm)] [color:var(--fr-text-secondary)]">
          {translations.new_report.fields.audio_formats}
        </p>
      </div>
      {files.length > 0 && (
        <div className="flex flex-wrap [gap:var(--fr-space-1)]">
          {files.map((file) => (
            <FileChip key={file.name} file={file} onRemove={onRemoveFile} />
          ))}
        </div>
      )}
      {error && (
        <div
          className="[font-size:var(--fr-text-xs)] [color:var(--fr-destructive)] [line-height:var(--fr-leading-snug)]"
          role="alert"
        >
          {error}
        </div>
      )}
    </div>
  )
}

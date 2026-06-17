import { translations } from '@/lib/translations'
import type { NewReportAudioUploadZoneProps } from '@/types/newReportView'
import { FileChip } from './NewReportFileChip'

export function NewReportAudioUploadZone({
  files,
  error,
  onRemoveFile,
  handlers,
}: NewReportAudioUploadZoneProps) {
  return (
    <div>
      <div
        className="[padding:var(--fr-space-5)] text-center cursor-pointer [border:calc(var(--fr-border-width-sm)_+_var(--fr-border-width-sm)_/_2)_dashed_var(--fr-border-strong)] [border-radius:var(--fr-radius-lg)] [transition:var(--fr-transition-base)] hover:[background:var(--fr-accent-subtle)] hover:[border-color:var(--fr-color-accent-300)] hover:outline-none focus-visible:[background:var(--fr-accent-subtle)] focus-visible:[border-color:var(--fr-color-accent-300)] focus-visible:outline-none [padding:var(--fr-space-7)_var(--fr-space-5)] [background:var(--fr-accent-soft)] [border-color:var(--fr-color-accent-200)] hover:[background:var(--fr-accent-soft)] hover:[border-color:var(--fr-color-accent-400)] focus-visible:[background:var(--fr-accent-soft)] focus-visible:[border-color:var(--fr-color-accent-400)]"
        onDrop={handlers.onDrop}
        onDragOver={handlers.onDragOver}
        onClick={handlers.onOpenPicker}
        onKeyDown={handlers.onKeyDown}
        role="button"
        tabIndex={0}
        aria-label={translations.new_report.fields.audio_label}
      >
        <svg
          className="block [width:var(--fr-control-height-sm)] [height:var(--fr-control-height-sm)] [margin:var(--fr-space-0)_auto_var(--fr-space-2)] [color:var(--fr-accent)]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
          />
        </svg>
        <p className="[color:var(--fr-accent)] [margin:var(--fr-space-0)_var(--fr-space-0)_var(--fr-space-1)] [color:var(--fr-text-primary)] [font-size:var(--fr-text-base)] [font-weight:var(--fr-weight-medium)]">
          {translations.new_report.fields.audio_label}
        </p>
        <p className="[color:var(--fr-color-accent-600)] [margin:var(--fr-space-0)_var(--fr-space-0)_var(--fr-space-2)] [color:var(--fr-text-secondary)] [font-size:var(--fr-text-sm)]">
          {translations.new_report.fields.audio_help}
        </p>
        <span className="inline-block [margin:var(--fr-space-0)] [padding:calc(var(--fr-space-1)_/_2)_var(--fr-space-3)] [color:var(--fr-text-tertiary)] [background:var(--fr-surface)] [border-radius:var(--fr-radius-full)] [font-size:var(--fr-text-xs)]">
          {translations.new_report.fields.audio_formats}
        </span>
      </div>
      {files.length > 0 && (
        <div className="flex flex-wrap [gap:var(--fr-space-1)] [margin-top:var(--fr-space-2)]">
          {files.map((file) => (
            <FileChip key={file.name} file={file} onRemove={onRemoveFile} />
          ))}
        </div>
      )}
      {error && (
        <div
          className="[font-family:var(--fr-font-sans)] [font-size:var(--fr-text-xs)] [color:var(--fr-destructive)] [line-height:var(--fr-leading-snug)] flex items-start [gap:var(--fr-space-1)]"
          role="alert"
        >
          {error}
        </div>
      )}
    </div>
  )
}

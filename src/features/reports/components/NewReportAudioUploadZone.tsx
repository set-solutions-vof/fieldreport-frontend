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
        className="fr-new-report-upload-zone fr-new-report-upload-zone--audio"
        onDrop={handlers.onDrop}
        onDragOver={handlers.onDragOver}
        onClick={handlers.onOpenPicker}
        onKeyDown={handlers.onKeyDown}
        role="button"
        tabIndex={0}
        aria-label={translations.new_report.fields.audio_label}
      >
        <svg
          className="fr-new-report-upload-icon"
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
        <p className="fr-new-report-upload-label">
          {translations.new_report.fields.audio_label}
        </p>
        <p className="fr-new-report-upload-hint">
          {translations.new_report.fields.audio_help}
        </p>
        <span className="fr-new-report-upload-formats">
          {translations.new_report.fields.audio_formats}
        </span>
      </div>
      {files.length > 0 && (
        <div className="fr-new-report-audio-chips">
          {files.map((file) => (
            <FileChip key={file.name} file={file} onRemove={onRemoveFile} />
          ))}
        </div>
      )}
      {error && (
        <div className="fr-field__error" role="alert">
          {error}
        </div>
      )}
    </div>
  )
}

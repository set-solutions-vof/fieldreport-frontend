import { translations } from '@/lib/translations'
import type { NewReportPhotosUploadZoneProps } from '@/types/newReportView'
import { FileChip } from './NewReportFileChip'

export function NewReportPhotosUploadZone({
  files,
  onRemoveFile,
  handlers,
}: NewReportPhotosUploadZoneProps) {
  return (
    <div
      className="fr-new-report-upload-zone fr-new-report-upload-zone--photos"
      onDrop={handlers.onDrop}
      onDragOver={handlers.onDragOver}
      onClick={handlers.onOpenPicker}
      onKeyDown={handlers.onKeyDown}
      role="button"
      tabIndex={0}
      aria-label={translations.new_report.fields.photos_label}
    >
      <div className="fr-new-report-photos-row">
        <svg
          className="fr-new-report-photos-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
        <div>
          <p className="fr-new-report-upload-label">
            {translations.new_report.fields.photos_label}
          </p>
          <p className="fr-new-report-upload-formats">
            {translations.new_report.fields.photos_formats}
          </p>
        </div>
        {files.length > 0 && (
          <div className="fr-new-report-chips-inline">
            {files.slice(0, 3).map((file) => (
              <FileChip key={file.name} file={file} onRemove={onRemoveFile} />
            ))}
            {files.length > 3 && (
              <span className="fr-new-report-chip-overflow">
                +{files.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

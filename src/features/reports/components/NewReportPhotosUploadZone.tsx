import { translations } from '@/lib/translations'
import type { NewReportPhotosUploadZoneProps } from '@/typing/newReportView'
import { FileChip } from './NewReportFileChip'

export function NewReportPhotosUploadZone({
  files,
  onRemoveFile,
  handlers,
}: NewReportPhotosUploadZoneProps) {
  return (
    <div className="flex flex-col flex-1 [gap:var(--fr-space-2)]">
      <span className="[font-size:var(--fr-text-sm)] [font-weight:var(--fr-weight-medium)] [color:var(--fr-text-primary)]">
        {translations.new_report.fields.photos_label}
      </span>
      <div
        className="flex-1 flex flex-col items-center justify-center [gap:var(--fr-space-2)] [padding:var(--fr-space-6)_var(--fr-space-4)] cursor-pointer [background:var(--fr-surface-sunken)] [border:calc(var(--fr-border-width-sm)_+_var(--fr-border-width-sm)_/_2)_dashed_var(--fr-border-strong)] [border-radius:var(--fr-radius-lg)] [transition:var(--fr-transition-base)] hover:[border-color:var(--fr-accent)] hover:outline-none focus-visible:[border-color:var(--fr-accent)] focus-visible:outline-none"
        onDrop={handlers.onDrop}
        onDragOver={handlers.onDragOver}
        onClick={handlers.onOpenPicker}
        onKeyDown={handlers.onKeyDown}
        role="button"
        tabIndex={0}
        aria-label={translations.new_report.fields.photos_label}
      >
        <svg
          className="[width:var(--fr-space-6)] [height:var(--fr-space-6)] [color:var(--fr-text-tertiary)] [margin-bottom:var(--fr-space-1)]"
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
        <p className="[margin:var(--fr-space-0)] [font-size:var(--fr-text-base)] [font-weight:var(--fr-weight-medium)] [color:var(--fr-text-primary)]">
          {translations.new_report.fields.photos_help}{' '}
          <span className="[color:var(--fr-accent)]">
            {translations.new_report.fields.browse}
          </span>
        </p>
        <p className="[margin:var(--fr-space-0)] [font-size:var(--fr-text-sm)] [color:var(--fr-text-secondary)]">
          {translations.new_report.fields.photos_formats}
        </p>
      </div>
      {files.length > 0 && (
        <div className="flex flex-wrap [gap:var(--fr-space-1)] [margin-top:var(--fr-space-1)]">
          {files.slice(0, 6).map((file) => (
            <FileChip key={file.name} file={file} onRemove={onRemoveFile} />
          ))}
          {files.length > 6 && (
            <span className="inline-flex items-center [padding:calc(var(--fr-space-1)_/_2)_var(--fr-space-2)] [color:var(--fr-accent)] [background:var(--fr-accent-soft)] [border:var(--fr-border-width-sm)_solid_var(--fr-color-accent-200)] [border-radius:var(--fr-radius-full)] [font-size:var(--fr-text-xs)]">
              +{files.length - 6}
            </span>
          )}
        </div>
      )}
    </div>
  )
}

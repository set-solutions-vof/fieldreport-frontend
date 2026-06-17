import { translations } from '@/lib/translations'
import type { NewReportPhotosUploadZoneProps } from '@/typing/newReportView'
import { FileChip } from './NewReportFileChip'

export function NewReportPhotosUploadZone({
  files,
  onRemoveFile,
  handlers,
}: NewReportPhotosUploadZoneProps) {
  return (
    <div
      className="[padding:var(--fr-space-5)] text-center cursor-pointer [border:calc(var(--fr-border-width-sm)_+_var(--fr-border-width-sm)_/_2)_dashed_var(--fr-border-strong)] [border-radius:var(--fr-radius-lg)] [transition:var(--fr-transition-base)] hover:[background:var(--fr-accent-subtle)] hover:[border-color:var(--fr-color-accent-300)] hover:outline-none focus-visible:[background:var(--fr-accent-subtle)] focus-visible:[border-color:var(--fr-color-accent-300)] focus-visible:outline-none [padding:var(--fr-space-3)_var(--fr-space-4)]"
      onDrop={handlers.onDrop}
      onDragOver={handlers.onDragOver}
      onClick={handlers.onOpenPicker}
      onKeyDown={handlers.onKeyDown}
      role="button"
      tabIndex={0}
      aria-label={translations.new_report.fields.photos_label}
    >
      <div className="flex items-center [gap:var(--fr-space-3)] text-left">
        <svg
          className="shrink-0 [width:calc(var(--fr-space-5)_-_var(--fr-space-1))] [height:calc(var(--fr-space-5)_-_var(--fr-space-1))] [color:var(--fr-text-tertiary)]"
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
          <p className="[color:var(--fr-accent)] [margin:var(--fr-space-0)_var(--fr-space-0)_var(--fr-space-1)] [color:var(--fr-text-primary)] [font-size:var(--fr-text-base)] [font-weight:var(--fr-weight-medium)]">
            {translations.new_report.fields.photos_label}
          </p>
          <p className="inline-block [margin:var(--fr-space-0)] [padding:calc(var(--fr-space-1)_/_2)_var(--fr-space-3)] [color:var(--fr-text-tertiary)] [background:var(--fr-surface)] [border-radius:var(--fr-radius-full)] [font-size:var(--fr-text-xs)]">
            {translations.new_report.fields.photos_formats}
          </p>
        </div>
        {files.length > 0 && (
          <div className="flex flex-wrap [gap:var(--fr-space-1)] justify-end [margin-left:auto]">
            {files.slice(0, 3).map((file) => (
              <FileChip key={file.name} file={file} onRemove={onRemoveFile} />
            ))}
            {files.length > 3 && (
              <span className="inline-flex items-center [padding:calc(var(--fr-space-1)_/_2)_var(--fr-space-2)] [color:var(--fr-accent)] [background:var(--fr-accent-soft)] [border:var(--fr-border-width-sm)_solid_var(--fr-color-accent-200)] [border-radius:var(--fr-radius-full)] [font-size:var(--fr-text-xs)]">
                +{files.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

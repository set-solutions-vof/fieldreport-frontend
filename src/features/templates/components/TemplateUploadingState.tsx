import { Button } from '@/design-system'
import { translations } from '@/lib/translations'
import { formatFileSize, formatFilesMeta } from '../lib/templateFormatters'
import type { TemplateUploadingStateProps } from '../types/templateView'
import { TemplateIcon } from './TemplateIcon'

export function TemplateUploadingState({
  files,
  actionErrorMessage,
  onAddFiles,
  onRemoveFile,
  onCancel,
  onStartAnalysis,
}: TemplateUploadingStateProps) {
  return (
    <section className="fr-template-uploading">
      <button
        type="button"
        className="fr-template-dropzone"
        onClick={onAddFiles}
      >
        <TemplateIcon name="upload" className="fr-template-dropzone__icon" />
        <span>{translations.template.uploading.dropzone_label}</span>
      </button>
      <div className="fr-template-file-grid">
        {files.map((file) => (
          <div className="fr-template-file" key={`${file.name}-${file.size}`}>
            <TemplateIcon name="document" className="fr-template-file__icon" />
            <span className="fr-template-file__name">{file.name}</span>
            <span className="fr-template-file__size">
              {formatFileSize(file)}
            </span>
            <button
              type="button"
              className="fr-template-file__remove"
              aria-label={`${translations.template.uploading.remove_file_label} ${file.name}`}
              onClick={() => onRemoveFile(file.name)}
            >
              <TemplateIcon
                name="x"
                className="fr-template-file__remove-icon"
              />
            </button>
          </div>
        ))}
      </div>
      {actionErrorMessage !== null && (
        <p className="fr-template-action-error">{actionErrorMessage}</p>
      )}
      <footer className="fr-template-uploading__footer">
        <span>{formatFilesMeta(files)}</span>
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

import { Button } from '@/design-system'
import { translations } from '@/lib/translations'
import { formatFileSize } from '../lib/templateFormatters'
import type { TemplateUploadingStateProps } from '@/types/templateView'
import { TemplateIcon } from './icons/TemplateIcon'
import '../pages/TemplateUploadState.css'

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
    <section className="fr-template-uploading">
      <header className="fr-template-uploading__header">
        <h1>{translations.template.uploading.title}</h1>
        <p>{translations.template.uploading.description}</p>
      </header>
      <button
        type="button"
        className="fr-template-dropzone"
        onClick={onAddFiles}
      >
        <TemplateIcon name="upload" className="fr-template-dropzone__icon" />
        <span className="fr-template-dropzone__copy">
          <strong>
            {translations.template.uploading.dropzone_label}{' '}
            <span>{translations.template.uploading.dropzone_browse_label}</span>
          </strong>
          <small>{translations.template.uploading.dropzone_helper}</small>
        </span>
      </button>
      <div className="fr-template-file-grid">
        {files.map((file) => (
          <div className="fr-template-file" key={`${file.name}-${file.size}`}>
            <TemplateIcon name="document" className="fr-template-file__icon" />
            <span className="fr-template-file__details">
              <span className="fr-template-file__name">{file.name}</span>
              <span className="fr-template-file__size">
                {formatFileSize(file)} · PDF
              </span>
            </span>
            <span className="fr-template-file__status">
              <TemplateIcon
                name="checkCircle"
                className="fr-template-file__status-icon"
              />
              {translations.template.uploading.ready_badge}
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
        <span className="fr-template-uploading__meta">
          <TemplateIcon
            name="checkCircle"
            className="fr-template-uploading__meta-icon"
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

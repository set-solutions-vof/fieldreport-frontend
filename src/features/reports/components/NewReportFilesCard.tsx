import type { ChangeEvent, DragEvent, KeyboardEvent } from 'react'
import { Card, CardHeader, CardTitle } from '@/design-system'
import { translations } from '@/lib/translations'
import type {
  NewReportFilesCardProps,
  NewReportUploadZoneHandlers,
} from '@/types/newReportView'
import { NewReportAudioUploadZone } from './NewReportAudioUploadZone'
import { NewReportPhotosUploadZone } from './NewReportPhotosUploadZone'
import './NewReportFilesCard.css'

export function NewReportFilesCard({
  audioFiles,
  audioInputRef,
  audioError,
  photoFiles,
  photosInputRef,
  onAddAudioFiles,
  onAddPhotoFiles,
  onRemoveAudioFile,
  onRemovePhotoFile,
}: NewReportFilesCardProps) {
  const audioHandlers: NewReportUploadZoneHandlers = {
    onDragOver: handleDragOver,
    onDrop: (event) => {
      event.preventDefault()
      onAddAudioFiles(Array.from(event.dataTransfer.files))
    },
    onKeyDown: (event) => openPickerOnKey(event, openAudioPicker),
    onOpenPicker: openAudioPicker,
  }
  const photoHandlers: NewReportUploadZoneHandlers = {
    onDragOver: handleDragOver,
    onDrop: (event) => {
      event.preventDefault()
      onAddPhotoFiles(Array.from(event.dataTransfer.files))
    },
    onKeyDown: (event) => openPickerOnKey(event, openPhotosPicker),
    onOpenPicker: openPhotosPicker,
  }

  function openAudioPicker(): void {
    audioInputRef.current!.click()
  }

  function openPhotosPicker(): void {
    photosInputRef.current!.click()
  }

  function handleAudioInputChange(event: ChangeEvent<HTMLInputElement>): void {
    onAddAudioFiles(Array.from(event.target.files as FileList))
    event.target.value = ''
  }

  function handlePhotosInputChange(event: ChangeEvent<HTMLInputElement>): void {
    onAddPhotoFiles(Array.from(event.target.files as FileList))
    event.target.value = ''
  }

  function handleDragOver(event: DragEvent<HTMLElement>): void {
    event.preventDefault()
  }

  return (
    <Card padding="lg" className="fr-new-report-card">
      <input
        ref={audioInputRef}
        className="fr-new-report-file-input"
        type="file"
        multiple
        accept=".mp3,.m4a,.wav"
        onChange={handleAudioInputChange}
      />
      <input
        ref={photosInputRef}
        className="fr-new-report-file-input"
        type="file"
        multiple
        accept=".jpg,.jpeg,.png,.heic"
        onChange={handlePhotosInputChange}
      />
      <CardHeader>
        <CardTitle className="fr-new-report-section-title">
          <span className="fr-new-report-section-bar" aria-hidden="true" />
          {translations.new_report.sections.files}
        </CardTitle>
      </CardHeader>
      <div className="fr-new-report-files">
        <NewReportAudioUploadZone
          files={audioFiles}
          error={audioError}
          onRemoveFile={onRemoveAudioFile}
          handlers={audioHandlers}
        />
        <NewReportPhotosUploadZone
          files={photoFiles}
          onRemoveFile={onRemovePhotoFile}
          handlers={photoHandlers}
        />
      </div>
    </Card>
  )
}

function openPickerOnKey(
  event: KeyboardEvent<HTMLDivElement>,
  openPicker: () => void,
): void {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    openPicker()
  }
}

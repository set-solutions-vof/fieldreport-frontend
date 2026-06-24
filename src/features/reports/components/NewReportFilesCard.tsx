import type { ChangeEvent, DragEvent, KeyboardEvent } from 'react'
import { Card, CardHeader, CardTitle } from '@set-solutions-vof/design-system'
import { translations } from '@/lib/translations'
import type {
  NewReportFilesCardProps,
  NewReportUploadZoneHandlers,
} from '@/typing/newReportView'
import { NewReportAudioUploadZone } from './NewReportAudioUploadZone'
import { NewReportPhotosUploadZone } from './NewReportPhotosUploadZone'

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
    <Card padding="lg" className="flex-1 flex flex-col [gap:var(--fr-space-4)]">
      <input
        ref={audioInputRef}
        className="absolute [width:var(--fr-space-0)] [height:var(--fr-space-0)] overflow-hidden [opacity:0] pointer-events-none"
        type="file"
        multiple
        accept=".mp3,.m4a,.wav"
        onChange={handleAudioInputChange}
      />
      <input
        ref={photosInputRef}
        className="absolute [width:var(--fr-space-0)] [height:var(--fr-space-0)] overflow-hidden [opacity:0] pointer-events-none"
        type="file"
        multiple
        accept=".jpg,.jpeg,.png,.heic"
        onChange={handlePhotosInputChange}
      />
      <CardHeader>
        <CardTitle className="flex items-center [gap:var(--fr-space-2)]">
          <span
            className="inline-block [width:calc(var(--fr-space-1)_-_var(--fr-border-width-sm))] [height:calc(var(--fr-space-4)_-_var(--fr-space-1)_/_2)] [border-radius:var(--fr-radius-sm)] [background:var(--fr-accent)] shrink-0"
            aria-hidden="true"
          />
          {translations.new_report.sections.files}
        </CardTitle>
      </CardHeader>
      <div className="flex flex-col flex-1 [gap:var(--fr-space-4)]">
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

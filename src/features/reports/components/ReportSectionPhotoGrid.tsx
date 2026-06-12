import { translations } from '@/lib/translations'
import type {
  PhotoGridSectionEditorProps,
  PhotoGridTile,
  ReportSectionImageProps,
} from '@/types/reportSectionView'
import { contentLines } from '../lib/reportSectionContent'
import { AutoSizedTextarea } from './AutoSizedTextarea'
import { InspectionPhoto } from './InspectionPhoto'

export function PhotoGridSectionEditor({
  section,
  content,
  evidenceItemsById,
  onContentChange,
}: PhotoGridSectionEditorProps) {
  const imageItems = section.evidence_item_ids.flatMap((evidenceItemId) => {
    const evidenceItem = evidenceItemsById[evidenceItemId]

    if (evidenceItem?.storage_key) {
      return [evidenceItem as PhotoGridTile]
    }

    return []
  })
  const captions = contentLines(content)
  const tiles = imageItems.length > 0 ? imageItems : emptyPhotoTiles(captions)

  function updateCaption(captionIndex: number, caption: string): void {
    const nextCaptions = [...captions]
    nextCaptions[captionIndex] = caption
    onContentChange(nextCaptions.join('\n'))
  }

  return (
    <div className="fr-report-section-photo-grid">
      {tiles.map((evidenceItem, tileIndex) => (
        <figure
          className="fr-report-section-photo"
          key={`${evidenceItem.id}-${tileIndex}`}
        >
          <ReportSectionImage evidenceItem={evidenceItem} />
          <AutoSizedTextarea
            aria-label={`Foto ${tileIndex + 1}`}
            className="fr-report-section-photo-caption"
            fieldClassName="fr-report-section-structured-field"
            value={captions[tileIndex] ?? evidenceItem.content_summary}
            onChange={(event) =>
              updateCaption(tileIndex, event.currentTarget.value)
            }
          />
        </figure>
      ))}
    </div>
  )
}

function ReportSectionImage({ evidenceItem }: ReportSectionImageProps) {
  if (!evidenceItem.storage_key) {
    return (
      <div className="fr-report-section-photo-placeholder">
        {translations.report_detail.section.image_label}
      </div>
    )
  }

  return (
    <InspectionPhoto
      storageKey={evidenceItem.storage_key}
      alt={evidenceItem.content_summary}
      className="fr-report-section-photo-image"
    />
  )
}

function emptyPhotoTiles(captions: string[]): PhotoGridTile[] {
  return captions.map((caption, captionIndex) => ({
    id: `photo-placeholder-${captionIndex}`,
    content_summary: caption,
    storage_key: null,
  }))
}

import { translations } from '@/lib/translations'
import type {
  PhotoGridSectionEditorProps,
  PhotoGridTile,
  ReportSectionImageProps,
} from '@/types/reportSectionView'
import { contentLines } from '../lib/reportSectionContent'
import { AutoSizedTextarea } from './AutoSizedTextarea'

export function PhotoGridSectionEditor({
  section,
  content,
  timelineItemsById,
  onContentChange,
}: PhotoGridSectionEditorProps) {
  const imageItems = section.source_item_ids.map(
    (sourceItemId) => timelineItemsById[sourceItemId] as PhotoGridTile,
  )
  const captions = contentLines(content)
  const tiles = imageItems.length > 0 ? imageItems : emptyPhotoTiles(captions)

  function updateCaption(captionIndex: number, caption: string): void {
    const nextCaptions = [...captions]
    nextCaptions[captionIndex] = caption
    onContentChange(nextCaptions.join('\n'))
  }

  return (
    <div className="fr-report-section-photo-grid">
      {tiles.map((timelineItem, tileIndex) => (
        <figure
          className="fr-report-section-photo"
          key={`${timelineItem.id}-${tileIndex}`}
        >
          <ReportSectionImage timelineItem={timelineItem} />
          <AutoSizedTextarea
            aria-label={`Foto ${tileIndex + 1}`}
            className="fr-report-section-photo-caption"
            fieldClassName="fr-report-section-structured-field"
            value={captions[tileIndex] ?? timelineItem.content_summary}
            onChange={(event) =>
              updateCaption(tileIndex, event.currentTarget.value)
            }
          />
        </figure>
      ))}
    </div>
  )
}

function ReportSectionImage({ timelineItem }: ReportSectionImageProps) {
  const imageUrl = timelineItem.thumbnail_url ?? timelineItem.image_url

  if (imageUrl) {
    return (
      <img
        className="fr-report-section-photo-image"
        src={imageUrl}
        alt={timelineItem.content_summary}
      />
    )
  }

  return (
    <div className="fr-report-section-photo-placeholder">
      {translations.report_detail.section.image_label}
    </div>
  )
}

function emptyPhotoTiles(captions: string[]): PhotoGridTile[] {
  return captions.map((caption, captionIndex) => ({
    id: `photo-placeholder-${captionIndex}`,
    content_summary: caption,
    image_url: null,
    thumbnail_url: null,
  }))
}

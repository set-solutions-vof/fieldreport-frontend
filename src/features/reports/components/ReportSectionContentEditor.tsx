import { translations } from '@/lib/translations'
import type { SectionContentEditorProps } from '@/types/reportSectionView'
import { AutoSizedTextarea } from './AutoSizedTextarea'
import { PhotoGridSectionEditor } from './ReportSectionPhotoGrid'
import { GroupedFieldsSectionEditor } from './ReportSectionStructuredEditors'
import './ReportSectionContent.css'

export function SectionContentEditor({
  section,
  content,
  evidenceItemsById,
  onTextChange,
  onStructuredChange,
}: SectionContentEditorProps) {
  if (section.render_type === 'key_value_table') {
    return (
      <GroupedFieldsSectionEditor
        sectionLabel={section.label}
        fields={section.fields!}
        groups={section.groups ?? null}
        content={content}
        onContentChange={onStructuredChange}
      />
    )
  }

  if (section.render_type === 'measurement_table') {
    return (
      <GroupedFieldsSectionEditor
        sectionLabel={section.label}
        fields={section.fields!}
        groups={section.groups ?? null}
        content={content}
        onContentChange={onStructuredChange}
      />
    )
  }

  if (section.render_type === 'photo_grid') {
    return (
      <PhotoGridSectionEditor
        section={section}
        content={content}
        evidenceItemsById={evidenceItemsById}
        onContentChange={onStructuredChange}
      />
    )
  }

  return (
    <AutoSizedTextarea
      aria-label={`${section.label} ${translations.report_detail.section.inspector_text_suffix}`}
      className="fr-report-section-textarea"
      fieldClassName="fr-report-section-field"
      value={content}
      onChange={onTextChange}
    />
  )
}

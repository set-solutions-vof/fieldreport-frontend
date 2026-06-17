import { translations } from '@/lib/translations'
import type { SectionContentEditorProps } from '@/types/reportSectionView'
import { AutoSizedTextarea } from './AutoSizedTextarea'
import { PhotoGridSectionEditor } from './ReportSectionPhotoGrid'
import { GroupedFieldsSectionEditor } from './ReportSectionStructuredEditors'

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
      className="[min-height:var(--fr-control-height-lg)] [padding:var(--fr-space-3)] overflow-hidden [font-size:var(--fr-text-md)] [line-height:var(--fr-leading-relaxed)] bg-transparent [border-color:transparent] [resize:none]"
      fieldClassName="[gap:var(--fr-space-0)]"
      value={content}
      onChange={onTextChange}
    />
  )
}

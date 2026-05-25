import type {
  TemplateKeyValuePreviewProps,
  TemplateSectionGroupListProps,
  TemplateSectionGroupProps,
  TemplateGroupedTablePreviewProps,
  TemplatePreviewContentProps,
} from '@/types/templatePreviewView'
import { TemplateIcon } from './icons/TemplateIcon'
import './TemplatePreviewContent.css'

const placeholderRows = ['first', 'second', 'third']
const photoPreviewIndexes = Array.from(
  { length: 4 },
  (_, photoPreviewIndex) => photoPreviewIndex,
)
const groupedTablePlaceholderRows = ['first', 'second', 'third']

export function TemplatePreviewContent({
  section,
}: TemplatePreviewContentProps) {
  if (section.render_type === 'text_block') {
    return (
      <div className="fr-template-preview-panel__text-lines">
        <span className="fr-template-preview-panel__placeholder-line" />
        <span className="fr-template-preview-panel__placeholder-line fr-template-preview-panel__placeholder-line--wide" />
        <span className="fr-template-preview-panel__placeholder-line fr-template-preview-panel__placeholder-line--short" />
      </div>
    )
  }

  if (section.render_type === 'key_value_table') {
    return <KeyValuePreview fields={section.fields} />
  }

  if (section.render_type === 'measurement_table') {
    return <GroupedTablePreview section={section} />
  }

  return (
    <div className="fr-template-preview-panel__photo-grid">
      {photoPreviewIndexes.map((photoPreviewIndex) => (
        <figure
          className="fr-template-preview-panel__photo-preview"
          key={photoPreviewIndex}
        >
          <div className="fr-template-preview-panel__photo-tile">
            <TemplateIcon
              name="photo"
              className="fr-template-preview-panel__photo-icon"
            />
          </div>
          <figcaption aria-label="Voorbeeld bijschrift">
            <span className="fr-template-preview-panel__photo-caption-line" />
          </figcaption>
        </figure>
      ))}
    </div>
  )
}

function KeyValuePreview({ fields }: TemplateKeyValuePreviewProps) {
  const visibleFields = fields!.slice(0, 8)
  const remainingFieldsCount = fields!.length - visibleFields.length

  if (visibleFields.length === 0) {
    return (
      <table className="fr-template-preview-panel__table fr-template-preview-panel__table--key-value">
        <tbody>
          {placeholderRows.map((placeholderRow) => (
            <tr key={placeholderRow}>
              <td>
                <span className="fr-template-preview-panel__placeholder-line fr-template-preview-panel__placeholder-line--label" />
              </td>
              <td>
                <span className="fr-template-preview-panel__placeholder-line" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  return (
    <table className="fr-template-preview-panel__table fr-template-preview-panel__table--key-value">
      <tbody>
        {visibleFields.map((field) => (
          <tr key={field}>
            <th scope="row">{field}</th>
            <td>
              <span className="fr-template-preview-panel__placeholder-line" />
            </td>
          </tr>
        ))}
        {remainingFieldsCount > 0 && (
          <tr>
            <th scope="row">+ {remainingFieldsCount} meer</th>
            <td>
              <span className="fr-template-preview-panel__placeholder-line fr-template-preview-panel__placeholder-line--short" />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

function GroupedTablePreview({ section }: TemplateGroupedTablePreviewProps) {
  if (section.groups && section.groups.length > 0) {
    return <SectionGroupList groups={section.groups} />
  }

  if (section.fields!.length === 0) {
    return (
      <div className="fr-template-preview-panel__grouped-table">
        <SectionGroupPlaceholder />
      </div>
    )
  }

  return (
    <SectionGroupList
      groups={[
        {
          id: section.id,
          label: section.label,
          fields: section.fields!,
        },
      ]}
    />
  )
}

function SectionGroupList({ groups }: TemplateSectionGroupListProps) {
  return (
    <div className="fr-template-preview-panel__grouped-table">
      {groups.map((group, groupIndex) => (
        <SectionGroupPreview
          title={group.label}
          rows={group.fields}
          key={`${group.id}-${groupIndex}`}
        />
      ))}
    </div>
  )
}

function SectionGroupPreview({ title, rows }: TemplateSectionGroupProps) {
  return (
    <div className="fr-template-preview-panel__section-group">
      <div className="fr-template-preview-panel__section-group-title">
        {title}
      </div>
      {rows.map((row, rowIndex) => (
        <div
          className="fr-template-preview-panel__section-group-row"
          key={`${row}-${rowIndex}`}
        >
          <span className="fr-template-preview-panel__section-group-label">
            {row}
          </span>
          <span className="fr-template-preview-panel__section-group-copy">
            <span className="fr-template-preview-panel__placeholder-line" />
            <span className="fr-template-preview-panel__placeholder-line fr-template-preview-panel__placeholder-line--wide" />
          </span>
        </div>
      ))}
    </div>
  )
}

function SectionGroupPlaceholder() {
  return (
    <div className="fr-template-preview-panel__section-group">
      <div className="fr-template-preview-panel__section-group-title fr-template-preview-panel__section-group-title--placeholder">
        <span className="fr-template-preview-panel__placeholder-line fr-template-preview-panel__placeholder-line--short" />
      </div>
      {groupedTablePlaceholderRows.map((row) => (
        <div className="fr-template-preview-panel__section-group-row" key={row}>
          <span className="fr-template-preview-panel__section-group-label">
            <span className="fr-template-preview-panel__placeholder-line fr-template-preview-panel__placeholder-line--label" />
          </span>
          <span className="fr-template-preview-panel__section-group-copy">
            <span className="fr-template-preview-panel__placeholder-line" />
            <span className="fr-template-preview-panel__placeholder-line fr-template-preview-panel__placeholder-line--wide" />
          </span>
        </div>
      ))}
    </div>
  )
}

import type {
  TemplateKeyValuePreviewProps,
  TemplateGroupedTablePreviewProps,
  TemplateSectionGroupListProps,
  TemplateSectionGroupProps,
} from '@/types/templatePreviewView'

const groupedTablePlaceholderRows = ['first', 'second', 'third']

export function KeyValuePreview({ section }: TemplateKeyValuePreviewProps) {
  const fields = section.fields!

  if (section.groups && section.groups.length > 0) {
    return <SectionGroupList groups={section.groups} compact />
  }

  const visibleFields = fields.slice(0, 8)
  const remainingFieldsCount = fields.length - visibleFields.length

  if (visibleFields.length === 0) {
    return <SectionGroupPlaceholder compact />
  }

  return (
    <SectionGroupList
      compact
      groups={[
        {
          id: section.id,
          label: section.label,
          fields:
            remainingFieldsCount > 0
              ? [...visibleFields, `+ ${remainingFieldsCount} meer`]
              : visibleFields,
        },
      ]}
    />
  )
}

export function GroupedTablePreview({
  section,
}: TemplateGroupedTablePreviewProps) {
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

function SectionGroupList({
  groups,
  compact = false,
}: TemplateSectionGroupListProps) {
  return (
    <div
      className={
        compact
          ? 'fr-template-preview-panel__grouped-table fr-template-preview-panel__grouped-table--compact'
          : 'fr-template-preview-panel__grouped-table'
      }
    >
      {groups.map((group, groupIndex) => (
        <SectionGroupPreview
          title={group.label}
          rows={group.fields}
          compact={compact}
          key={`${group.id}-${groupIndex}`}
        />
      ))}
    </div>
  )
}

function SectionGroupPreview({
  title,
  rows,
  compact = false,
}: TemplateSectionGroupProps) {
  return (
    <div
      className={
        compact
          ? 'fr-template-preview-panel__section-group fr-template-preview-panel__section-group--compact'
          : 'fr-template-preview-panel__section-group'
      }
    >
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

function SectionGroupPlaceholder({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={
        compact
          ? 'fr-template-preview-panel__section-group fr-template-preview-panel__section-group--compact'
          : 'fr-template-preview-panel__section-group'
      }
    >
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

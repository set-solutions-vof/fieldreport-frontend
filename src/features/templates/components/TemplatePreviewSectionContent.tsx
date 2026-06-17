import type {
  TemplateKeyValuePreviewProps,
  TemplateGroupedTablePreviewProps,
  TemplateSectionGroupListProps,
  TemplateSectionGroupProps,
} from '@/typing/templatePreviewView'

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
      <div className="flex flex-col [gap:var(--fr-space-4)]">
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
          ? 'flex flex-col [gap:var(--fr-space-4)] grid [grid-template-columns:repeat(2,_minmax(var(--fr-space-0),_1fr))] [column-gap:var(--fr-space-8)] [row-gap:var(--fr-space-5)]'
          : 'flex flex-col [gap:var(--fr-space-4)]'
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
          ? 'flex flex-col [gap:var(--fr-space-3)] [gap:var(--fr-space-2)]'
          : 'flex flex-col [gap:var(--fr-space-3)]'
      }
    >
      <div className="[padding:var(--fr-space-2)_var(--fr-space-3)] [color:var(--fr-text-primary)] [background:var(--fr-color-neutral-100)] [font-size:var(--fr-text-xs)] [font-weight:var(--fr-weight-bold)] [line-height:var(--fr-leading-snug)] [padding:var(--fr-space-0)] [color:var(--fr-accent)] bg-transparent [font-size:var(--fr-text-sm)]">
        {title}
      </div>
      {rows.map((row, rowIndex) => (
        <div
          className="grid [grid-template-columns:minmax(var(--fr-space-12),_0.34fr)_minmax(_var(--fr-space-0),_1fr_)] [gap:var(--fr-space-4)] [align-items:start] [grid-template-columns:minmax(var(--fr-space-11),_0.45fr)_minmax(_var(--fr-space-0),_1fr_)] [gap:var(--fr-space-3)]"
          key={`${row}-${rowIndex}`}
        >
          <span className="[min-width:var(--fr-space-0)] [color:var(--fr-text-primary)] [font-size:var(--fr-text-xs)] [font-style:italic] [line-height:var(--fr-leading-snug)] [color:var(--fr-accent)] [font-style:normal] [font-weight:var(--fr-weight-medium)] uppercase">
            {row}
          </span>
          <span className="flex [min-width:var(--fr-space-0)] flex-col [gap:var(--fr-space-2)]">
            <span className="block w-full [height:calc(var(--fr-space-3)_-_var(--fr-space-1)_/_2)] [background:var(--fr-color-neutral-100)] [border-radius:var(--fr-radius-md)]" />
            <span className="block w-full [height:calc(var(--fr-space-3)_-_var(--fr-space-1)_/_2)] [background:var(--fr-color-neutral-100)] [border-radius:var(--fr-radius-md)] [width:95%]" />
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
          ? 'flex flex-col [gap:var(--fr-space-3)] [gap:var(--fr-space-2)]'
          : 'flex flex-col [gap:var(--fr-space-3)]'
      }
    >
      <div className="[padding:var(--fr-space-2)_var(--fr-space-3)] [color:var(--fr-text-primary)] [background:var(--fr-color-neutral-100)] [font-size:var(--fr-text-xs)] [font-weight:var(--fr-weight-bold)] [line-height:var(--fr-leading-snug)] [padding:var(--fr-space-0)] [color:var(--fr-accent)] bg-transparent [font-size:var(--fr-text-sm)] flex items-center">
        <span className="block w-full [height:calc(var(--fr-space-3)_-_var(--fr-space-1)_/_2)] [background:var(--fr-color-neutral-100)] [border-radius:var(--fr-radius-md)] [width:60%]" />
      </div>
      {groupedTablePlaceholderRows.map((row) => (
        <div
          className="grid [grid-template-columns:minmax(var(--fr-space-12),_0.34fr)_minmax(_var(--fr-space-0),_1fr_)] [gap:var(--fr-space-4)] [align-items:start] [grid-template-columns:minmax(var(--fr-space-11),_0.45fr)_minmax(_var(--fr-space-0),_1fr_)] [gap:var(--fr-space-3)]"
          key={row}
        >
          <span className="[min-width:var(--fr-space-0)] [color:var(--fr-text-primary)] [font-size:var(--fr-text-xs)] [font-style:italic] [line-height:var(--fr-leading-snug)] [color:var(--fr-accent)] [font-style:normal] [font-weight:var(--fr-weight-medium)] uppercase">
            <span className="block w-full [height:calc(var(--fr-space-3)_-_var(--fr-space-1)_/_2)] [background:var(--fr-color-neutral-100)] [border-radius:var(--fr-radius-md)] [width:75%]" />
          </span>
          <span className="flex [min-width:var(--fr-space-0)] flex-col [gap:var(--fr-space-2)]">
            <span className="block w-full [height:calc(var(--fr-space-3)_-_var(--fr-space-1)_/_2)] [background:var(--fr-color-neutral-100)] [border-radius:var(--fr-radius-md)]" />
            <span className="block w-full [height:calc(var(--fr-space-3)_-_var(--fr-space-1)_/_2)] [background:var(--fr-color-neutral-100)] [border-radius:var(--fr-radius-md)] [width:95%]" />
          </span>
        </div>
      ))}
    </div>
  )
}

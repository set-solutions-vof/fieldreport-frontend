import type { GroupedFieldsSectionEditorProps } from '@/typing/reportSectionView'
import {
  serializeStructuredFields,
  structuredFieldValues,
  updatedValues,
} from '../lib/reportSectionContent'
import { AutoSizedTextarea } from './AutoSizedTextarea'

export function GroupedFieldsSectionEditor({
  sectionLabel,
  fields,
  groups,
  content,
  onContentChange,
}: GroupedFieldsSectionEditorProps) {
  const sectionGroups =
    groups !== null && groups.length > 0
      ? groups
      : [
          {
            id: sectionLabel,
            label: sectionLabel,
            fields,
          },
        ]
  const allFields = sectionGroups.flatMap((group) => group.fields)
  const values = structuredFieldValues(allFields, content)
  const groupFieldOffsets = sectionGroups.map((_, groupIndex) =>
    sectionGroups
      .slice(0, groupIndex)
      .reduce((totalFields, group) => totalFields + group.fields.length, 0),
  )

  function updateFieldValue(fieldIndex: number, value: string): void {
    onContentChange(
      serializeStructuredFields(
        allFields,
        updatedValues(values, fieldIndex, value),
      ),
    )
  }

  return (
    <div className="flex flex-col [gap:var(--fr-space-4)]">
      {sectionGroups.map((group, groupIndex) => {
        const currentFieldOffset = groupFieldOffsets[groupIndex] ?? 0

        return (
          <div
            className="flex flex-col [gap:var(--fr-space-3)]"
            key={`${group.id}-${groupIndex}`}
          >
            <div className="[padding:var(--fr-space-2)_var(--fr-space-3)] [color:var(--fr-text-primary)] [background:var(--fr-color-neutral-100)] [font-size:var(--fr-text-sm)] [font-weight:var(--fr-weight-semibold)] [line-height:var(--fr-leading-snug)]">
              {group.label}
            </div>
            {group.fields.map((field, fieldIndex) => {
              const valueIndex = currentFieldOffset + fieldIndex

              return (
                <div
                  className="grid [grid-template-columns:minmax(var(--fr-space-13),_0.3fr)_minmax(_var(--fr-space-0),_1fr_)] [gap:var(--fr-space-4)] [align-items:start] [&>span]:[color:var(--fr-text-primary)] [&>span]:[font-size:var(--fr-text-sm)] [&>span]:[font-style:italic] [&>span]:[line-height:var(--fr-leading-normal)]"
                  key={`${group.id}-${fieldIndex}`}
                >
                  <span>{field}</span>
                  <AutoSizedTextarea
                    aria-label={field}
                    className="[min-height:var(--fr-control-height-lg)] [padding:var(--fr-space-2)_var(--fr-space-3)] overflow-hidden [font-size:var(--fr-text-sm)] [line-height:var(--fr-leading-normal)] bg-transparent [border-color:transparent] [resize:none]"
                    fieldClassName="[gap:var(--fr-space-0)]"
                    value={values[valueIndex] ?? ''}
                    onChange={(event) =>
                      updateFieldValue(valueIndex, event.currentTarget.value)
                    }
                  />
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

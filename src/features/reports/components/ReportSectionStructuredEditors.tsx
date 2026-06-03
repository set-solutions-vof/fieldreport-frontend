import type { GroupedFieldsSectionEditorProps } from '@/types/reportSectionView'
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
    <div className="fr-report-section-grouped-fields">
      {sectionGroups.map((group, groupIndex) => {
        const currentFieldOffset = groupFieldOffsets[groupIndex] ?? 0

        return (
          <div
            className="fr-report-section-group"
            key={`${group.id}-${groupIndex}`}
          >
            <div className="fr-report-section-group-heading">{group.label}</div>
            {group.fields.map((field, fieldIndex) => {
              const valueIndex = currentFieldOffset + fieldIndex

              return (
                <div
                  className="fr-report-section-group-row"
                  key={`${group.id}-${fieldIndex}`}
                >
                  <span>{field}</span>
                  <AutoSizedTextarea
                    aria-label={field}
                    className="fr-report-section-structured-textarea"
                    fieldClassName="fr-report-section-structured-field"
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

import { useState } from 'react'
import { Button } from '@set-solutions-vof/design-system'
import type { TemplateSectionGroup } from '@/types/template'
import type { TemplateSectionGroupsProps } from '@/types/templateView'
import { TemplateSectionGroupEditor } from './TemplateSectionGroupEditor'
import { TemplateIcon } from './icons/TemplateIcon'

export function TemplateSectionGroups({
  sectionId,
  sectionLabel,
  fields,
  groups,
  readonly,
  onGroupsChange,
}: TemplateSectionGroupsProps) {
  const [collapsedGroupIds, setCollapsedGroupIds] = useState<string[]>([])
  const sectionGroups = groups ?? [
    {
      id: `${sectionId}-group-1`,
      label: sectionLabel,
      fields,
    },
  ]

  function updateGroups(nextGroups: TemplateSectionGroup[]): void {
    onGroupsChange!(sectionId, nextGroups)
  }

  function updateGroupLabel(groupId: string, label: string): void {
    updateGroups(
      sectionGroups.map((group) =>
        group.id === groupId ? { ...group, label } : group,
      ),
    )
  }

  function toggleGroup(groupId: string): void {
    setCollapsedGroupIds((currentGroupIds) =>
      currentGroupIds.includes(groupId)
        ? currentGroupIds.filter((currentGroupId) => currentGroupId !== groupId)
        : [...currentGroupIds, groupId],
    )
  }

  function updateRow(groupId: string, rowIndex: number, field: string): void {
    updateGroups(
      sectionGroups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              fields: group.fields.map((currentField, currentIndex) =>
                currentIndex === rowIndex ? field : currentField,
              ),
            }
          : group,
      ),
    )
  }

  function addRow(groupId: string): void {
    updateGroups(
      sectionGroups.map((group) =>
        group.id === groupId
          ? { ...group, fields: [...group.fields, 'Nieuwe rij'] }
          : group,
      ),
    )
  }

  function removeRow(groupId: string, rowIndex: number): void {
    updateGroups(
      sectionGroups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              fields: group.fields.filter((_, currentIndex) => {
                return currentIndex !== rowIndex
              }),
            }
          : group,
      ),
    )
  }

  function addGroup(): void {
    updateGroups([
      ...sectionGroups,
      {
        id: `${sectionId}-group-${sectionGroups.length + 1}`,
        label: 'Nieuwe groep',
        fields: ['Nieuwe rij'],
      },
    ])
  }

  function removeGroup(groupId: string): void {
    updateGroups(sectionGroups.filter((group) => group.id !== groupId))
  }

  return (
    <div className="flex flex-col [gap:var(--fr-space-3)]">
      {sectionGroups.map((group) => {
        const isGroupCollapsed = collapsedGroupIds.includes(group.id)

        return (
          <TemplateSectionGroupEditor
            key={group.id}
            collapsed={isGroupCollapsed}
            group={group}
            readonly={readonly}
            onAddRow={addRow}
            onRemoveGroup={removeGroup}
            onRemoveRow={removeRow}
            onToggleGroup={toggleGroup}
            onUpdateGroupLabel={updateGroupLabel}
            onUpdateRow={updateRow}
          />
        )
      })}
      {!readonly && (
        <Button
          size="sm"
          variant="secondary"
          leadingIcon={
            <TemplateIcon
              name="plus"
              className="block [width:var(--fr-space-4)] [height:var(--fr-space-4)] [stroke-width:1.6]"
            />
          }
          onClick={addGroup}
        >
          Groep toevoegen
        </Button>
      )}
    </div>
  )
}

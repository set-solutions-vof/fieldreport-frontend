import { useRef, useState } from 'react'
import type { TemplateSectionEditorProps } from '@/typing/templateView'
import { TemplateSectionDetail } from './TemplateSectionDetail'
import { TemplateSectionSidebar } from './TemplateSectionSidebar'

export function TemplateSectionEditor({
  sections,
  readonly = false,
  onLabelChange,
  onDelete,
  onRenderTypeChange,
  onFieldsChange,
  onGroupsChange,
  onReorder,
}: TemplateSectionEditorProps) {
  const dragIndexRef = useRef<number | null>(null)
  const dropIndexRef = useRef<number | null>(null)
  const [selectedSectionId, setSelectedSectionId] = useState(
    () => sections[0]?.id ?? '',
  )
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null)
  const [dropTarget, setDropTarget] = useState<{
    index: number
    position: 'before' | 'after'
  } | null>(null)

  const activeSectionId = sections.some(
    (section) => section.id === selectedSectionId,
  )
    ? selectedSectionId
    : (sections[0]?.id ?? '')

  const selectedIndex = sections.findIndex(
    (section) => section.id === activeSectionId,
  )
  const selectedSection =
    selectedIndex >= 0 ? sections[selectedIndex] : sections[0]

  function clearDragState(): void {
    dragIndexRef.current = null
    dropIndexRef.current = null
    setDraggingIndex(null)
    setDropTarget(null)
  }

  function handleDragStart(index: number): void {
    dragIndexRef.current = index
    setDraggingIndex(index)
  }

  function handleDragOver(index: number, position: 'before' | 'after'): void {
    if (dragIndexRef.current === null) {
      return
    }

    dropIndexRef.current = index
    setDropTarget({ index, position })
  }

  function handleDrop(): void {
    if (dragIndexRef.current !== null && dropIndexRef.current !== null) {
      onReorder?.(dragIndexRef.current, dropIndexRef.current)
    }

    clearDragState()
  }

  if (selectedSection === undefined) {
    return null
  }

  return (
    <div className="flex flex-1 [min-height:var(--fr-space-0)] overflow-hidden [background:var(--fr-background)]">
      <TemplateSectionSidebar
        sections={sections}
        selectedSectionId={activeSectionId}
        readonly={readonly}
        draggingIndex={draggingIndex}
        dropTarget={dropTarget}
        onSelectSection={setSelectedSectionId}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragEnd={clearDragState}
      />
      <TemplateSectionDetail
        section={selectedSection}
        index={selectedIndex >= 0 ? selectedIndex : 0}
        readonly={readonly}
        onLabelChange={onLabelChange}
        onDelete={onDelete}
        onRenderTypeChange={onRenderTypeChange}
        onFieldsChange={onFieldsChange}
        onGroupsChange={onGroupsChange}
      />
    </div>
  )
}

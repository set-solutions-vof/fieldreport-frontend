import { useRef, useState } from 'react'
import type { TemplateSectionGridProps } from '@/types/templateView'
import { templateSectionRenderType } from '../lib/templateSection'
import { TemplateSectionCard } from './TemplateSectionCard'

export function TemplateSectionGrid({
  sections,
  readonly = false,
  onLabelChange,
  onDelete,
  onRenderTypeChange,
  onFieldsChange,
  onGroupsChange,
  onReorder,
}: TemplateSectionGridProps) {
  const dragIndexRef = useRef<number | null>(null)
  const dropIndexRef = useRef<number | null>(null)
  const photoGridCount = sections.filter(
    (section) => templateSectionRenderType(section) === 'photo_grid',
  ).length
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null)
  const [dropTarget, setDropTarget] = useState<{
    index: number
    position: 'before' | 'after'
  } | null>(null)

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

  return (
    <div className="fr-template-section-grid">
      {sections.map((section, index) => {
        const renderType = templateSectionRenderType(section)
        const dropIndicator =
          dropTarget?.index === index ? dropTarget.position : null

        return (
          <TemplateSectionCard
            key={section.id}
            section={section}
            index={index}
            readonly={readonly}
            draggable={!readonly}
            isDuplicatePhotoGrid={
              renderType === 'photo_grid' && photoGridCount > 1
            }
            isDragging={draggingIndex === index}
            dropIndicator={dropIndicator}
            feature={
              renderType === 'key_value_table' ||
              renderType === 'measurement_table'
            }
            onLabelChange={onLabelChange}
            onDelete={onDelete}
            onRenderTypeChange={onRenderTypeChange}
            onFieldsChange={onFieldsChange}
            onGroupsChange={onGroupsChange}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragEnd={clearDragState}
          />
        )
      })}
    </div>
  )
}

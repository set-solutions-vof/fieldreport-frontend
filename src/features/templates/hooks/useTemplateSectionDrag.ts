import type { DragEvent } from 'react'

type UseTemplateSectionDragParameters = {
  sectionId: string
  index: number
  draggable: boolean
  onDragStart?: (index: number) => void
  onDragOver?: (index: number, position: 'before' | 'after') => void
  onDrop?: () => void
  onDragEnd?: () => void
}

export function useTemplateSectionDrag({
  sectionId,
  index,
  draggable,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
}: UseTemplateSectionDragParameters) {
  function handleDragStart(event: DragEvent<HTMLElement>): void {
    event.stopPropagation()
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', sectionId)
    onDragStart?.(index)
  }

  function handleDragOver(event: DragEvent<HTMLElement>): void {
    event.preventDefault()
    event.stopPropagation()

    if (!draggable) {
      return
    }

    const cardBounds = event.currentTarget.getBoundingClientRect()
    const position =
      event.clientY > cardBounds.top + cardBounds.height / 2
        ? 'after'
        : 'before'

    onDragOver?.(index, position)
  }

  function handleDrop(event: DragEvent<HTMLElement>): void {
    event.preventDefault()
    event.stopPropagation()
    onDrop?.()
  }

  function handleDragEnd(event: DragEvent<HTMLElement>): void {
    event.stopPropagation()
    onDragEnd?.()
  }

  return {
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd,
  }
}

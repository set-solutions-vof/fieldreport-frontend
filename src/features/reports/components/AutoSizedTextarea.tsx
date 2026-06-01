import { useLayoutEffect, useRef } from 'react'
import { Textarea } from '@/design-system'
import type { AutoSizedTextareaProps } from '@/types/reportSectionView'

export function AutoSizedTextarea({
  value,
  onChange,
  ...props
}: AutoSizedTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  function resizeTextarea(): void {
    const textarea = textareaRef.current!
    textarea.style.height = 'auto'
    textarea.style.height = `${textarea.scrollHeight}px`
  }

  useLayoutEffect(() => {
    resizeTextarea()
  }, [value])

  return (
    <Textarea
      ref={textareaRef}
      value={value}
      rows={1}
      onChange={(event) => {
        onChange!(event)
        resizeTextarea()
      }}
      {...props}
    />
  )
}

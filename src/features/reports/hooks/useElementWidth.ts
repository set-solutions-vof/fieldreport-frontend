import { useEffect, useRef, useState } from 'react'

export function useElementWidth<TElement extends HTMLElement>() {
  const elementRef = useRef<TElement | null>(null)
  const [elementWidth, setElementWidth] = useState(0)

  useEffect(() => {
    const element = elementRef.current

    if (element === null) {
      return
    }

    setElementWidth(element.clientWidth)

    const resizeObserver = new ResizeObserver(([entry]) => {
      setElementWidth(entry.contentRect.width)
    })

    resizeObserver.observe(element)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  return { elementRef, elementWidth }
}

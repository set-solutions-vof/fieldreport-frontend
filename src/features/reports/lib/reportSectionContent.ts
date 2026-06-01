export function structuredFieldValues(
  fields: string[],
  content: string,
): string[] {
  const lines = contentLines(content)
  let lineOffset = 0

  return fields.map((field) => {
    const matchingLineIndex = lines.findIndex((line, lineIndex) => {
      return lineIndex >= lineOffset && line.startsWith(`${field}:`)
    })

    if (matchingLineIndex === -1) {
      const fallbackValue = lines[lineOffset] ?? ''
      lineOffset += 1
      return fallbackValue
    }

    lineOffset = matchingLineIndex + 1
    return lines[matchingLineIndex]!.slice(field.length + 1).trimStart()
  })
}

export function updatedValues(
  values: string[],
  index: number,
  value: string,
): string[] {
  return values.map((currentValue, currentIndex) =>
    currentIndex === index ? value : currentValue,
  )
}

export function serializeStructuredFields(
  fields: string[],
  values: string[],
): string {
  return fields
    .map((field, fieldIndex) => `${field}: ${values[fieldIndex] ?? ''}`.trim())
    .join('\n')
}

export function contentLines(content: string): string[] {
  return content.split('\n').filter((line) => line.trim() !== '')
}

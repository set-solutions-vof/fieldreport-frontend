export function formatFileSize(file: File): string {
  return `${(file.size / 1024 / 1024).toFixed(1)} MB`
}

export function formatTemplateOrder(index: number): string {
  return String(index + 1).padStart(2, '0')
}

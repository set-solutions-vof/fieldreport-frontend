export function formatFileSize(file: File): string {
  return `${(file.size / 1024 / 1024).toFixed(1)} MB`
}

export function formatFilesMeta(files: File[]): string {
  const totalSize = files.reduce((size, file) => size + file.size, 0)

  return `${files.length} files · ${(totalSize / 1024 / 1024).toFixed(1)} MB total`
}

export function formatTemplateOrder(index: number): string {
  return String(index + 1).padStart(2, '0')
}

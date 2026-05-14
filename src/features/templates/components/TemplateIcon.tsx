export function TemplateIcon({
  name,
  className,
}: {
  name: TemplateIconName
  className?: string
}) {
  if (name === 'upload') {
    return (
      <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
        <path
          {...strokeProps}
          d="M12 3v13M7 8l5-5 5 5M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"
        />
      </svg>
    )
  }

  if (name === 'document') {
    return (
      <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
        <path {...strokeProps} d="M7 3h7l5 5v13H7z" />
        <path {...strokeProps} d="M14 3v5h5" />
      </svg>
    )
  }

  if (name === 'documentDashed') {
    return (
      <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
        <path {...strokeProps} strokeDasharray="3 3" d="M7 3h7l5 5v13H7z" />
        <path {...strokeProps} d="M14 3v5h5" />
      </svg>
    )
  }

  if (name === 'x') {
    return (
      <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
        <path {...strokeProps} d="M5 5l14 14M19 5L5 19" />
      </svg>
    )
  }

  if (name === 'grip') {
    return (
      <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="9" cy="6" r="1" fill="currentColor" />
        <circle cx="9" cy="12" r="1" fill="currentColor" />
        <circle cx="9" cy="18" r="1" fill="currentColor" />
        <circle cx="15" cy="6" r="1" fill="currentColor" />
        <circle cx="15" cy="12" r="1" fill="currentColor" />
        <circle cx="15" cy="18" r="1" fill="currentColor" />
      </svg>
    )
  }

  if (name === 'paragraph') {
    return (
      <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
        <path {...strokeProps} d="M5 6h14M5 10h14M5 14h10M5 18h7" />
      </svg>
    )
  }

  if (name === 'gridKV') {
    return (
      <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
        <rect {...strokeProps} x="4" y="5" width="16" height="14" rx="1" />
        <path {...strokeProps} d="M11 5v14M4 12h16" />
      </svg>
    )
  }

  if (name === 'list') {
    return (
      <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
        <path {...strokeProps} d="M8 6h12M8 12h12M8 18h12" />
        <circle cx="4" cy="6" r="1" fill="currentColor" />
        <circle cx="4" cy="12" r="1" fill="currentColor" />
        <circle cx="4" cy="18" r="1" fill="currentColor" />
      </svg>
    )
  }

  if (name === 'photo') {
    return (
      <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
        <rect {...strokeProps} x="3" y="5" width="18" height="14" rx="1" />
        <circle {...strokeProps} cx="9" cy="11" r="2" />
        <path {...strokeProps} d="M3 17l5-4 4 3 4-3 5 4" />
      </svg>
    )
  }

  if (name === 'checkCircle') {
    return (
      <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
        <circle {...strokeProps} cx="12" cy="12" r="9" />
        <path {...strokeProps} d="M8 12l3 3 5-6" />
      </svg>
    )
  }

  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path {...strokeProps} d="M4 20h4l11-11-4-4L4 16zM14 6l4 4" />
    </svg>
  )
}

export type TemplateIconName =
  | 'upload'
  | 'document'
  | 'documentDashed'
  | 'x'
  | 'grip'
  | 'paragraph'
  | 'gridKV'
  | 'list'
  | 'photo'
  | 'checkCircle'
  | 'edit'

const strokeProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

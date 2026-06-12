import { useEffect, useRef, useState } from 'react'
import { authenticatedFetch } from '@/lib/api/authenticatedFetch'
import { apiBaseUrl } from '@/lib/config'
import { translations } from '@/lib/translations'

type InspectionPhotoProps = {
  storageKey: string
  alt: string
  className?: string
}

export function InspectionPhoto({
  storageKey,
  alt,
  className,
}: InspectionPhotoProps) {
  const [objectUrl, setObjectUrl] = useState<string | null>(null)
  const objectUrlRef = useRef<string | null>(null)

  useEffect(() => {
    let active = true

    void authenticatedFetch(
      `${apiBaseUrl}/api/v1/inspections/photos/${storageKey}`,
    )
      .then((response) => response.blob())
      .then((blob) => {
        if (!active) {
          return
        }

        const nextObjectUrl = URL.createObjectURL(blob)
        objectUrlRef.current = nextObjectUrl
        setObjectUrl(nextObjectUrl)
      })

    return () => {
      active = false

      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current)
        objectUrlRef.current = null
      }
    }
  }, [storageKey])

  if (!objectUrl) {
    return (
      <div className="fr-report-section-photo-placeholder">
        {translations.report_detail.section.image_label}
      </div>
    )
  }

  return <img className={className} src={objectUrl} alt={alt} />
}

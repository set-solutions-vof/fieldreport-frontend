import { useEffect, useState } from 'react'
import { ShellContentError, ShellContentLoader } from '@/components/ShellContentState'
import { getTemplatePdfPreview, getTemplatePdfPreviewUrl } from '@/lib/api/templates'
import type { TemplateConfigurationPageProps } from '@/typing/templateView'

export function TemplateConfigurationPage({}: TemplateConfigurationPageProps) {
  const [iframeUrl, setIframeUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    setIsLoading(true)
    setIsError(false)

    getTemplatePdfPreview()
      .then(() => setIframeUrl(getTemplatePdfPreviewUrl()))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false))
  }, [retryCount])

  if (isLoading) {
    return <ShellContentLoader />
  }

  if (isError) {
    return (
      <ShellContentError
        title="Voorbeeld niet beschikbaar"
        message="Het sjabloonvoorbeeld kon niet worden geladen. Probeer het opnieuw."
        onRetry={() => setRetryCount((c) => c + 1)}
      />
    )
  }

  return (
    <main className="flex [min-height:calc(100dvh_-_var(--fr-space-10))] flex-col [background:var(--fr-background)]">
      {iframeUrl && (
        <iframe
          src={iframeUrl}
          className="[flex:1] [border:none] [width:100%] [min-height:calc(100dvh_-_var(--fr-space-10))]"
          title="Sjabloon voorbeeld"
        />
      )}
    </main>
  )
}

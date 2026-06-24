import { useEffect, useState } from 'react'
import { getTemplatePdfPreview, getTemplatePdfPreviewUrl } from '@/lib/api/templates'

export function Step2TemplatePreview() {
  const [iframeUrl, setIframeUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getTemplatePdfPreview()
      .then(() => setIframeUrl(getTemplatePdfPreviewUrl()))
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Kon voorbeeld niet laden')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return (
    <section className="flex flex-col [gap:var(--fr-space-4)] [padding:var(--fr-space-6)_var(--fr-space-7)] [width:100%] [height:100%]">
      <p className="[margin:var(--fr-space-0)] [font-size:var(--fr-text-sm)] [color:var(--fr-text-secondary)]">
        Zo zien jullie rapporten eruit. Klik op Volgende als dit er goed uitziet.
      </p>
      {isLoading && (
        <div className="flex items-center justify-center [height:100%] [color:var(--fr-text-secondary)]">
          Laden…
        </div>
      )}
      {error && <div className="[color:var(--fr-error)]">{error}</div>}
      {iframeUrl && (
        <iframe
          src={iframeUrl}
          className="[flex:1] [border:none] [width:100%]"
          title="Rapport voorbeeld"
        />
      )}
    </section>
  )
}

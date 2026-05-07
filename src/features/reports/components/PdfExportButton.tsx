import { useState } from 'react'
import { downloadPdf } from '@/lib/api/reports'
import { Button } from '@/components/Button'

type PdfExportButtonProps = {
  reportId: string
  reportApproved: boolean
}

export function PdfExportButton({
  reportId,
  reportApproved,
}: PdfExportButtonProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleDownload() {
    setError(null)
    setLoading(true)
    try {
      const blob = await downloadPdf(reportId)
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `rapport-${reportId}.pdf`
      a.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Download mislukt')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <Button
        variant="secondary"
        onClick={handleDownload}
        loading={loading}
        disabled={!reportApproved}
        title={
          !reportApproved ? 'Rapport moet volledig goedgekeurd zijn' : undefined
        }
      >
        {loading ? 'PDF genereren…' : 'Download rapport als PDF'}
      </Button>
      {!reportApproved && (
        <p className="text-xs text-gray-400">
          Keur alle secties goed om te downloaden
        </p>
      )}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
}

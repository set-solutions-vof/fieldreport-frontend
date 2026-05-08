import { Badge, Button, Card, Spinner, Textarea } from '@/design-system'
import { formatDutchShortDate } from '../lib/formatReportDate'
import { reportStatusLabel } from '../lib/reportLabels'
import { useReport } from '../hooks/useReport'
import type { ReportDetailPageProps } from '@/types/reportView'
import './ReportDetailPage.css'

export function ReportDetailPage({ reportId, onAuthenticationExpired }: ReportDetailPageProps) {
  const { report, isLoading, isError, errorMessage, retry } = useReport({
    reportId,
    onAuthenticationExpired,
  })

  if (isLoading) {
    return (
      <main className="fr-report-detail-page">
        <div className="fr-report-detail-state">
          <Spinner size="lg" />
        </div>
      </main>
    )
  }

  if (isError || report === null) {
    return (
      <main className="fr-report-detail-page">
        <div className="fr-report-detail-state">
          <h1>Rapport laden is mislukt</h1>
          <p>{errorMessage}</p>
          <Button type="button" variant="primary" onClick={retry}>
            Opnieuw proberen
          </Button>
        </div>
      </main>
    )
  }

  return (
    <main className="fr-report-detail-page">
      <header className="fr-report-detail-header">
        <div>
          <p>{formatDutchShortDate(report.inspection_date)}</p>
          <h1>{report.address}</h1>
          <span>{report.client_name}</span>
        </div>
        <Badge variant={report.status}>{reportStatusLabel(report.status)}</Badge>
      </header>

      <section className="fr-report-detail-meta" aria-label="Rapportgegevens">
        <Card padding="md">
          <span>Inspecteur</span>
          <strong>{report.inspector_name}</strong>
        </Card>
        <Card padding="md">
          <span>Secties</span>
          <strong>{report.sections.length}</strong>
        </Card>
        <Card padding="md">
          <span>Goedgekeurd</span>
          <strong>{report.sections.filter((section) => section.is_approved).length}</strong>
        </Card>
      </section>

      <section className="fr-report-detail-sections" aria-label="Rapportsecties">
        {report.sections.length === 0 ? (
          <Card padding="md">
            <p className="fr-report-detail-empty">Dit rapport bevat nog geen secties.</p>
          </Card>
        ) : (
          report.sections.map((section) => (
            <Card className="fr-report-section-card" key={section.id} padding="md">
              <div className="fr-report-section-header">
                <div>
                  <h2>{section.label}</h2>
                  <span>{section.section_key}</span>
                </div>
                <span className="fr-report-section-status">
                  {section.is_approved ? 'Goedgekeurd' : 'In afwachting'}
                </span>
              </div>
              <div className="fr-report-section-grid">
                <Textarea label="AI-concept" value={section.ai_draft} readOnly rows={8} />
                <Textarea
                  label="Inspecteurstekst"
                  value={section.field_expert_content ?? section.ai_draft}
                  readOnly
                  rows={8}
                />
              </div>
              <div className="fr-report-section-sources">
                <h3>Bronnen</h3>
                {section.sources.length === 0 ? (
                  <p>Geen bronnen gekoppeld.</p>
                ) : (
                  <ul>
                    {section.sources.map((source, sourceIndex) => (
                      <li key={`${section.id}-${sourceIndex}`}>
                        <strong>{source.type === 'audio' ? 'Audio' : 'Foto'}</strong>
                        <span>{source.content_summary}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Card>
          ))
        )}
      </section>
    </main>
  )
}

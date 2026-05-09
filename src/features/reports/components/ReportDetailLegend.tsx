export function ReportDetailLegend() {
  return (
    <section className="fr-report-detail-legend" aria-label="Legenda">
      <span>
        <span className="fr-report-detail-legend-dot fr-report-detail-legend-dot--approved" />
        Goedgekeurd
      </span>
      <span>
        <span className="fr-report-detail-legend-dot fr-report-detail-legend-dot--high" />
        Hoge zekerheid
      </span>
      <span>
        <span className="fr-report-detail-legend-dot fr-report-detail-legend-dot--medium" />
        Controleren aanbevolen
      </span>
      <span>
        <span className="fr-report-detail-legend-dot fr-report-detail-legend-dot--low" />
        Lage zekerheid
      </span>
    </section>
  )
}

import { Card } from '@/design-system'
import type { ReportDetailSectionsProps } from '@/types/reportView'
import { ReportSection } from './ReportSection'

export function ReportDetailSections({
  reportId,
  sections,
  onSectionUpdated,
}: ReportDetailSectionsProps) {
  if (sections.length === 0) {
    return (
      <div className="fr-report-detail-sections">
        <Card padding="md">
          <p className="fr-report-detail-empty">
            Dit rapport bevat nog geen secties.
          </p>
        </Card>
      </div>
    )
  }

  return (
    <div className="fr-report-detail-sections">
      {sections.map((section) => (
        <ReportSection
          key={section.id}
          reportId={reportId}
          section={section}
          onSectionUpdated={onSectionUpdated}
        />
      ))}
    </div>
  )
}

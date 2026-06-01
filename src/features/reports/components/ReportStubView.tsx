import { Card } from '@/design-system'
import type { ReportStubViewProps } from '@/types/reportDetailView'
import { reportDetailViewClassName } from '../lib/reportDetailClassNames'

export function ReportStubView({
  activeTab,
  children,
  tab,
}: ReportStubViewProps) {
  return (
    <div
      className={reportDetailViewClassName(activeTab, tab)}
      id={`view-${tab}`}
      role="tabpanel"
    >
      <div className="fr-report-detail-stub">
        <Card padding="md">
          <p>{children}</p>
        </Card>
      </div>
    </div>
  )
}

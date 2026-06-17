import { Card } from '@set-solutions-vof/design-system'
import type { ReportStubViewProps } from '@/typing/reportDetailView'
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
      <div>
        <Card padding="md">
          <p>{children}</p>
        </Card>
      </div>
    </div>
  )
}

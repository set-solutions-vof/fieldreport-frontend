import { useCallback, useState } from 'react'
import type { ReportSection as ReportSectionModel } from '@/types/report'
import type {
  DetailPanelTab,
  ReportDetailContentProps,
} from '@/types/reportView'
import { DashboardShell } from './DashboardShell'
import { ReportDetailHeader } from './ReportDetailHeader'
import { ReportDetailLegend } from './ReportDetailLegend'
import { ReportDetailSections } from './ReportDetailSections'
import { ReportDetailSidePanel } from './ReportDetailSidePanel'

export function ReportDetailContent({
  report,
  currentUser,
  reportsToValidateCount,
  totalReportsCount,
  onBackToDashboard,
}: ReportDetailContentProps) {
  const [sections, setSections] = useState<ReportSectionModel[]>(
    report.sections,
  )
  const [activeTab, setActiveTab] = useState<DetailPanelTab>('timeline')

  const handleSectionUpdated = useCallback(
    (updatedSection: ReportSectionModel): void => {
      setSections((currentSections) =>
        currentSections.map((section) =>
          section.id === updatedSection.id ? updatedSection : section,
        ),
      )
    },
    [],
  )

  return (
    <DashboardShell
      currentUser={currentUser}
      activeNavigationItem="validation"
      breadcrumbItems={['Rapport', report.address]}
      reportsToValidateCount={reportsToValidateCount}
      totalReportsCount={totalReportsCount}
    >
      <ReportDetailHeader
        report={report}
        onBackToDashboard={onBackToDashboard}
      />
      <ReportDetailLegend />
      <section
        className="fr-report-detail-layout"
        aria-label="Rapportvalidatie"
      >
        <ReportDetailSections
          reportId={report.id}
          sections={sections}
          onSectionUpdated={handleSectionUpdated}
        />
        <ReportDetailSidePanel
          activeTab={activeTab}
          sections={sections}
          onActiveTabChange={setActiveTab}
        />
      </section>
    </DashboardShell>
  )
}

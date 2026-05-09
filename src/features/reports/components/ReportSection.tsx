import { useState, type ChangeEvent } from 'react'
import { Button, Card, Textarea } from '@/design-system'
import type { SectionSource } from '@/types/report'
import type { SaveStatus } from '@/types/reportDetail'
import type { ReportSectionProps } from '@/types/reportView'
import { useReportSection } from '../hooks/useReportSection'
import { formatConfidenceScore } from '../lib/formatConfidenceScore'
import { formatSeconds } from '../lib/formatSeconds'
import { confidenceLevelConfig } from '../lib/reportLabels'
import './ReportSection.css'

export function ReportSection({
  section,
  reportId,
  onSectionUpdated,
}: ReportSectionProps) {
  const [content, setContent] = useState(
    section.field_expert_content ?? section.ai_draft,
  )
  const { saveStatus, approve, saveContent } = useReportSection({
    reportId,
    sectionId: section.id,
    onSuccess: onSectionUpdated,
  })
  const confidenceConfig = confidenceLevelConfig[section.confidence_level]

  function handleContentChange(event: ChangeEvent<HTMLTextAreaElement>): void {
    const nextContent = event.currentTarget.value
    setContent(nextContent)
    saveContent(nextContent)
  }

  return (
    <Card
      className={`fr-report-section-card ${confidenceConfig.className}`}
      padding="md"
    >
      <div className="fr-report-section-header">
        <div className="fr-report-section-title-group">
          <div className="fr-report-section-title-row">
            <h2>{section.label}</h2>
            <span className="fr-report-section-confidence">
              {confidenceConfig.label}
            </span>
            <span className="fr-report-section-confidence-score">
              {formatConfidenceScore(section.confidence_score)}
            </span>
          </div>
        </div>
        {section.is_approved && (
          <span className="fr-report-section-approved-label">
            Goedgekeurd
          </span>
        )}
      </div>

      <Textarea
        label="Inspecteurstekst"
        value={content}
        rows={8}
        onChange={handleContentChange}
      />

      <div className="fr-report-section-actions">
        <span
          className={`fr-report-section-save-status fr-report-section-save-status--${saveStatus}`}
          role={saveStatus === 'error' ? 'alert' : undefined}
        >
          {saveStatusText(saveStatus)}
        </span>
        {!section.is_approved && (
          <Button
            type="button"
            variant="primary"
            loading={saveStatus === 'saving'}
            disabled={content.trim() === ''}
            onClick={() => {
              void approve()
            }}
          >
            Goedkeuren
          </Button>
        )}
      </div>

      {section.sources.length > 0 && (
        <div
          className="fr-report-section-source-chips"
          aria-label={`Bronnen voor ${section.label}`}
        >
          {section.sources.map((source, sourceIndex) => (
            <span
              className="fr-report-section-source-chip"
              key={`${section.id}-${sourceIndex}`}
            >
              {sourceChipLabel(source, sourceIndex, section.sources)}
            </span>
          ))}
        </div>
      )}
    </Card>
  )
}

function sourceChipLabel(
  source: SectionSource,
  sourceIndex: number,
  sources: SectionSource[],
): string {
  if (source.type === 'audio') {
    return `⏱ ${formatSeconds(source.timestamp_start!)}`
  }

  const imageNumber = sources
    .slice(0, sourceIndex + 1)
    .filter((sectionSource) => sectionSource.type === 'image').length

  return `Foto ${imageNumber}`
}

function saveStatusText(saveStatus: SaveStatus): string {
  if (saveStatus === 'saving') {
    return 'Opslaan...'
  }

  if (saveStatus === 'saved') {
    return 'Opgeslagen'
  }

  if (saveStatus === 'error') {
    return 'Fout bij opslaan'
  }

  return ''
}

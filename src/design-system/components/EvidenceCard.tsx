import * as React from 'react'
import { AccuracyChip, type AccuracyChipVariant } from './AccuracyChip'
import './EvidenceCard.css'

export type EvidenceCardType = 'audio' | 'image'

export interface EvidenceCardProps extends React.HTMLAttributes<HTMLElement> {
  media: React.ReactNode
  evidenceType: EvidenceCardType
  timestamp: React.ReactNode
  caption: React.ReactNode
  sectionLabel: React.ReactNode
  accuracy: number
  accuracyVariant?: AccuracyChipVariant
}

export const EvidenceCard = React.forwardRef<HTMLElement, EvidenceCardProps>(
  function EvidenceCard(
    {
      media,
      evidenceType,
      timestamp,
      caption,
      sectionLabel,
      accuracy,
      accuracyVariant,
      className,
      ...rest
    },
    ref,
  ) {
    const classNames = ['fr-evidence-card', className].filter(Boolean).join(' ')

    return (
      <article ref={ref} className={classNames} {...rest}>
        <div className="fr-evidence-card__media">{media}</div>
        <div className="fr-evidence-card__body">
          <div className="fr-evidence-card__meta">
            <span className="fr-evidence-card__type">{evidenceType}</span>
            <span className="fr-evidence-card__timestamp">{timestamp}</span>
          </div>
          <div className="fr-evidence-card__caption">{caption}</div>
          <div className="fr-evidence-card__footer">
            <span className="fr-evidence-card__section">→ {sectionLabel}</span>
            <AccuracyChip value={accuracy} variant={accuracyVariant} />
          </div>
        </div>
      </article>
    )
  },
)

EvidenceCard.displayName = 'EvidenceCard'

import * as React from 'react'
import './TranscriptBlock.css'

export interface TranscriptBlockProps extends React.HTMLAttributes<HTMLElement> {
  timestamp: React.ReactNode
  speaker: React.ReactNode
  tags?: React.ReactNode[]
}

export const TranscriptBlock = React.forwardRef<
  HTMLElement,
  TranscriptBlockProps
>(function TranscriptBlock(
  { timestamp, speaker, tags, className, children, ...rest },
  ref,
) {
  const classNames = ['fr-transcript-block', className]
    .filter(Boolean)
    .join(' ')

  return (
    <article ref={ref} className={classNames} {...rest}>
      <div className="fr-transcript-block__time">{timestamp}</div>
      <div className="fr-transcript-block__content">
        <div className="fr-transcript-block__speaker">{speaker}</div>
        <div className="fr-transcript-block__body">{children}</div>
        {tags && tags.length > 0 && (
          <div className="fr-transcript-block__tags">
            {tags.map((tag, tagIndex) => (
              <span key={tagIndex} className="fr-transcript-block__tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  )
})

TranscriptBlock.displayName = 'TranscriptBlock'

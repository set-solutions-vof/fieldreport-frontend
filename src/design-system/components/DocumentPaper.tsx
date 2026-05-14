import * as React from 'react'
import './DocumentPaper.css'

export type DocumentPaperProps = React.HTMLAttributes<HTMLDivElement>

export const DocumentPaper = React.forwardRef<
  HTMLDivElement,
  DocumentPaperProps
>(function DocumentPaper({ className, ...rest }, ref) {
  return (
    <section
      ref={ref}
      className={['fr-document-paper', className].filter(Boolean).join(' ')}
      {...rest}
    />
  )
})

DocumentPaper.displayName = 'DocumentPaper'

export const DocumentPaperHeader: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = ({ className, ...rest }) => (
  <header
    className={['fr-document-paper__header', className]
      .filter(Boolean)
      .join(' ')}
    {...rest}
  />
)

export const DocumentPaperBody: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = ({ className, ...rest }) => (
  <div
    className={['fr-document-paper__body', className].filter(Boolean).join(' ')}
    {...rest}
  />
)

export const DocumentPaperFooter: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = ({ className, ...rest }) => (
  <footer
    className={['fr-document-paper__footer', className]
      .filter(Boolean)
      .join(' ')}
    {...rest}
  />
)

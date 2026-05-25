import type { TemplatePreviewPanelProps } from '@/types/templatePreviewView'
import { TemplatePreviewContent } from './TemplatePreviewContent'
import './TemplatePreviewPanel.css'

export function TemplatePreviewPanel({ sections }: TemplatePreviewPanelProps) {
  return (
    <aside className="fr-template-preview-panel" aria-label="Voorbeeldrapport">
      <div className="fr-template-preview-panel__header">
        <span>VOORBEELDRAPPORT</span>
        <span>Zo ziet een rapport eruit</span>
      </div>
      <article className="fr-template-preview-panel__paper">
        <header className="fr-template-preview-panel__document-header">
          <div>
            <span className="fr-template-preview-panel__eyebrow">
              Uw bedrijf · Inspectie
            </span>
            <h2>Inspectierapport</h2>
          </div>
          <div className="fr-template-preview-panel__dossier">
            <span>Dossier</span>
            <strong>XX-0000-0000</strong>
          </div>
        </header>
        <div className="fr-template-preview-panel__sections">
          {sections.map((section, sectionIndex) => (
            <section
              className="fr-template-preview-panel__section"
              key={section.id}
            >
              <h3>
                <span>{String(sectionIndex + 1).padStart(2, '0')}</span>
                {section.label}
              </h3>
              <div className="fr-template-preview-panel__divider" />
              <TemplatePreviewContent section={section} />
            </section>
          ))}
        </div>
      </article>
    </aside>
  )
}

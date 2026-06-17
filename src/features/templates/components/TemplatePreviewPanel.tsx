import type { TemplatePreviewPanelProps } from '@/typing/templatePreviewView'
import { TemplatePreviewContent } from './TemplatePreviewContent'

export function TemplatePreviewPanel({ sections }: TemplatePreviewPanelProps) {
  return (
    <aside className="flex [min-width:var(--fr-space-0)] flex-col [gap:var(--fr-space-4)] items-center" aria-label="Voorbeeldrapport">
      <div className="flex [width:min(_100%,_calc(var(--fr-space-15)_*_2_+_var(--fr-space-11)_+_var(--fr-space-4))_)] items-center justify-between [gap:var(--fr-space-4)] [color:var(--fr-text-tertiary)] [font-size:var(--fr-text-xs)] [font-weight:var(--fr-weight-medium)] [line-height:var(--fr-leading-snug)]">
        <span>VOORBEELDRAPPORT</span>
        <span>Zo ziet een rapport eruit</span>
      </div>
      <article className="box-border [width:min(_100%,_calc(var(--fr-space-15)_*_2_+_var(--fr-space-11)_+_var(--fr-space-4))_)] [min-height:calc(var(--fr-space-15)_*_3_+_var(--fr-space-12))] [padding:var(--fr-space-8)] [background:var(--fr-surface)] [border:var(--fr-border-width-sm)_solid_var(--fr-border)] [box-shadow:var(--fr-shadow-paper)]">
        <header className="flex items-start justify-between [gap:var(--fr-space-6)] [padding-bottom:var(--fr-space-6)] [border-bottom:var(--fr-border-width-sm)_solid_var(--fr-border)] [&_h2]:[margin:var(--fr-space-0)] [&_h2]:[color:var(--fr-text-primary)] [&_h2]:[font-size:var(--fr-text-2xl)] [&_h2]:[font-weight:var(--fr-weight-bold)] [&_h2]:[line-height:var(--fr-leading-tight)]">
          <div>
            <span className="block [color:var(--fr-text-tertiary)] [font-size:var(--fr-text-xs)] [font-weight:var(--fr-weight-semibold)] [line-height:var(--fr-leading-snug)] [margin-bottom:var(--fr-space-1)] uppercase">
              Uw bedrijf · Inspectie
            </span>
            <h2>Inspectierapport</h2>
          </div>
          <div className="[&_span]:block [&_span]:[color:var(--fr-text-tertiary)] [&_span]:[font-size:var(--fr-text-xs)] [&_span]:[font-weight:var(--fr-weight-semibold)] [&_span]:[line-height:var(--fr-leading-snug)] shrink-0 text-right [&_strong]:block [&_strong]:[margin-top:var(--fr-space-1)] [&_strong]:[color:var(--fr-text-primary)] [&_strong]:[font-size:var(--fr-text-base)] [&_strong]:[font-weight:var(--fr-weight-semibold)] [&_strong]:[line-height:var(--fr-leading-snug)]">
            <span>Dossier</span>
            <strong>XX-0000-0000</strong>
          </div>
        </header>
        <div className="flex flex-col [gap:var(--fr-space-6)] [padding-top:var(--fr-space-6)]">
          {sections.map((section, sectionIndex) => (
            <section
              className="[&_h3]:flex [&_h3]:[align-items:baseline] [&_h3]:[gap:var(--fr-space-3)] [&_h3]:[margin:var(--fr-space-0)] [&_h3]:[color:var(--fr-text-primary)] [&_h3]:[font-size:var(--fr-text-md)] [&_h3]:[font-weight:var(--fr-weight-semibold)] [&_h3]:[line-height:var(--fr-leading-snug)]"
              key={section.id}
            >
              <h3>
                <span>{String(sectionIndex + 1).padStart(2, '0')}</span>
                {section.label}
              </h3>
              <div className="[height:var(--fr-border-width-sm)] [margin:var(--fr-space-3)_var(--fr-space-0)_var(--fr-space-4)] [background:var(--fr-border)]" />
              <TemplatePreviewContent section={section} />
            </section>
          ))}
        </div>
      </article>
    </aside>
  )
}

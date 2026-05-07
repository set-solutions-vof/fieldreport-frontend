import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/Button'
import type { ReportSection } from '@/types'

type SectionCardProps = {
  section: ReportSection
  highlighted: boolean
  onContentChange: (sectionId: string, content: string) => Promise<void>
  onApprove: (sectionId: string) => Promise<void>
  onHighlight: (sectionKey: string | null) => void
}

export function SectionCard({
  section,
  highlighted,
  onContentChange,
  onApprove,
  onHighlight,
}: SectionCardProps) {
  const [content, setContent] = useState(section.field_expert_content)
  const [saving, setSaving] = useState(false)
  const [approving, setApproving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  // Scroll into view when highlighted (e.g. navigating from timeline)
  useEffect(() => {
    if (highlighted) {
      cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [highlighted])

  function handleContentChange(value: string) {
    setContent(value)
    setSaveError(null)
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(async () => {
      setSaving(true)
      try {
        await onContentChange(section.id, value)
      } catch {
        setSaveError('Opslaan mislukt')
      } finally {
        setSaving(false)
      }
    }, 800)
  }

  async function handleApprove() {
    setApproving(true)
    try {
      await onApprove(section.id)
    } catch {
      setSaveError('Goedkeuren mislukt')
    } finally {
      setApproving(false)
    }
  }

  const borderColor = section.is_approved
    ? 'border-green-300'
    : highlighted
      ? 'border-blue-400'
      : 'border-gray-200'

  return (
    <div
      ref={cardRef}
      id={`section-${section.section_key}`}
      onClick={() => onHighlight(section.section_key)}
      className={`rounded-lg border-2 bg-white p-6 shadow-sm transition-colors ${borderColor} ${highlighted ? 'bg-blue-50' : ''}`}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="font-semibold text-gray-900">{section.label}</h3>
        {section.is_approved ? (
          <span className="flex items-center gap-1.5 text-sm font-medium text-green-700">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                clipRule="evenodd"
              />
            </svg>
            Goedgekeurd
          </span>
        ) : (
          <span className="text-xs text-gray-400">In behandeling</span>
        )}
      </div>

      <div className="mb-4 space-y-3">
        <div>
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-400">
            AI concept (referentie)
          </p>
          <p className="rounded-md bg-gray-50 p-3 text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
            {section.ai_draft}
          </p>
        </div>

        <div>
          <label
            htmlFor={`content-${section.id}`}
            className="mb-1 block text-xs font-medium uppercase tracking-wide text-gray-400"
          >
            Uw bevindingen (bewerkbaar)
          </label>
          <textarea
            id={`content-${section.id}`}
            value={content}
            onChange={(e) => handleContentChange(e.target.value)}
            disabled={section.is_approved}
            rows={6}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 leading-relaxed shadow-sm outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed resize-none"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-xs text-gray-400">
          {saving && 'Opslaan…'}
          {saveError && <span className="text-red-600">{saveError}</span>}
        </div>
        {!section.is_approved && (
          <Button
            variant="primary"
            onClick={handleApprove}
            loading={approving}
            disabled={!content.trim()}
          >
            Sectie goedkeuren
          </Button>
        )}
      </div>
    </div>
  )
}

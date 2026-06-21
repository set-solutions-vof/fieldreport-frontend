import { Button } from '@set-solutions-vof/design-system'
import { translations } from '@/lib/translations'
import { formatTemplateOrder } from '../lib/templateFormatters'
import { getTemplateSectionFieldCount } from '../lib/templateSectionFieldCount'
import { useTemplateSectionDrag } from '../hooks/useTemplateSectionDrag'
import type {
  TemplateSectionSidebarItemProps,
  TemplateSectionSidebarProps,
} from '@/typing/templateView'
import { templateSidebarWidthClass } from '../lib/templateLayout'
import { TemplateIcon } from './icons/TemplateIcon'

export function TemplateSectionSidebar({
  sections,
  selectedSectionId,
  readonly = false,
  draggingIndex,
  dropTarget,
  onSelectSection,
  onAddSection,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
}: TemplateSectionSidebarProps) {
  return (
    <aside
      className={`flex shrink-0 flex-col [border-right:var(--fr-border-width-sm)_solid_var(--fr-border)] [background:var(--fr-surface-sunken)] ${templateSidebarWidthClass}`}
    >
      <div className="flex items-center justify-between [padding:var(--fr-space-4)_var(--fr-space-5)_var(--fr-space-3)]">
        <span className="[font-size:var(--fr-text-xs)] [font-weight:var(--fr-weight-semibold)] [line-height:var(--fr-leading-snug)] [letter-spacing:var(--fr-tracking-label)] [color:var(--fr-text-tertiary)] uppercase">
          {translations.template.review.sections_heading}
        </span>
        <span className="[font-size:var(--fr-text-xs)] [font-weight:var(--fr-weight-medium)] [line-height:var(--fr-leading-snug)] [color:var(--fr-text-tertiary)] [font-variant-numeric:tabular-nums]">
          {sections.length}
        </span>
      </div>
      <ol className="flex flex-1 flex-col [gap:var(--fr-space-1)] overflow-y-auto [margin:var(--fr-space-0)] [padding:var(--fr-space-0)_var(--fr-space-3)_var(--fr-space-3)] [list-style:none]">
        {sections.map((section, index) => (
          <TemplateSectionSidebarItem
            key={section.id}
            sectionId={section.id}
            index={index}
            label={section.label}
            fieldCount={getTemplateSectionFieldCount(section)}
            isSelected={section.id === selectedSectionId}
            readonly={readonly}
            isDragging={draggingIndex === index}
            dropIndicator={
              dropTarget?.index === index ? dropTarget.position : null
            }
            onSelect={() => onSelectSection(section.id)}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onDragEnd={onDragEnd}
          />
        ))}
      </ol>
      {!readonly && onAddSection && (
        <div className="shrink-0 [padding:var(--fr-space-0)_var(--fr-space-3)_var(--fr-space-3)]">
          <Button
            size="sm"
            variant="secondary"
            className="[width:100%]"
            leadingIcon={
              <TemplateIcon
                name="plus"
                className="block [width:var(--fr-space-4)] [height:var(--fr-space-4)] [stroke-width:1.6]"
              />
            }
            onClick={onAddSection}
          >
            {translations.template.review.add_section_label}
          </Button>
        </div>
      )}
    </aside>
  )
}

function TemplateSectionSidebarItem({
  sectionId,
  index,
  label,
  fieldCount,
  isSelected,
  readonly,
  isDragging,
  dropIndicator,
  onSelect,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
}: TemplateSectionSidebarItemProps) {
  const draggable = !readonly
  const { handleDragStart, handleDragOver, handleDrop, handleDragEnd } =
    useTemplateSectionDrag({
      sectionId,
      index,
      draggable,
      onDragStart,
      onDragOver,
      onDrop,
      onDragEnd,
    })

  const fieldCountLabel =
    fieldCount === 1
      ? translations.template.review.fields_count_singular.replace(
          '{{count}}',
          String(fieldCount),
        )
      : translations.template.review.fields_count_plural.replace(
          '{{count}}',
          String(fieldCount),
        )

  return (
    <li
      className={[
        'relative',
        dropIndicator === 'before' &&
          "[&::before]:absolute [&::before]:[right:var(--fr-space-2)] [&::before]:[left:var(--fr-space-2)] [&::before]:[height:var(--fr-border-width-sm)] [&::before]:[background:var(--fr-accent)] [&::before]:[border-radius:var(--fr-radius-full)] [&::before]:[content:''] [&::before]:[top:calc(var(--fr-space-1)_*_-1)]",
        dropIndicator === 'after' &&
          "[&::after]:absolute [&::after]:[right:var(--fr-space-2)] [&::after]:[left:var(--fr-space-2)] [&::after]:[height:var(--fr-border-width-sm)] [&::after]:[background:var(--fr-accent)] [&::after]:[border-radius:var(--fr-radius-full)] [&::after]:[content:''] [&::after]:[bottom:calc(var(--fr-space-1)_*_-1)]",
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <button
        type="button"
        draggable={draggable}
        className={[
          'flex [width:100%] items-start [gap:var(--fr-space-2)] [padding:var(--fr-space-2)_var(--fr-space-3)] text-left cursor-pointer border-0 [border-radius:var(--fr-radius-md)] [font:inherit] [transition:var(--fr-transition-fast)]',
          isSelected
            ? '[background:var(--fr-surface)] [box-shadow:inset_3px_0_0_0_var(--fr-accent),var(--fr-shadow-sm)] [color:var(--fr-text-primary)]'
            : '[background:transparent] [color:var(--fr-text-secondary)] hover:[background:color-mix(in_oklch,_var(--fr-surface)_72%,_transparent)]',
          draggable && 'cursor-grab',
          isDragging && 'cursor-grabbing [opacity:0.65]',
        ]
          .filter(Boolean)
          .join(' ')}
        aria-current={isSelected ? 'true' : undefined}
        onClick={onSelect}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragEnd={handleDragEnd}
      >
        <TemplateIcon
          name="grip"
          className={[
            'shrink-0 [width:var(--fr-space-4)] [height:var(--fr-space-4)] [margin-top:calc(var(--fr-space-1)_/_4)] [color:var(--fr-text-tertiary)]',
            readonly && '[opacity:0]',
          ]
            .filter(Boolean)
            .join(' ')}
        />
        <span className="shrink-0 [font-size:var(--fr-text-xs)] [font-weight:var(--fr-weight-semibold)] [line-height:var(--fr-leading-snug)] [color:var(--fr-text-tertiary)] [font-variant-numeric:tabular-nums]">
          {formatTemplateOrder(index)}
        </span>
        <span className="flex [min-width:var(--fr-space-0)] flex-1 flex-col [gap:calc(var(--fr-space-1)_/_2)]">
          <span className="[font-size:var(--fr-text-sm)] [font-weight:var(--fr-weight-medium)] [line-height:var(--fr-leading-snug)]">
            {label}
          </span>
          {fieldCount > 0 ? (
            <span className="[font-size:var(--fr-text-xs)] [line-height:var(--fr-leading-snug)] [color:var(--fr-text-tertiary)]">
              {fieldCountLabel}
            </span>
          ) : null}
        </span>
      </button>
    </li>
  )
}

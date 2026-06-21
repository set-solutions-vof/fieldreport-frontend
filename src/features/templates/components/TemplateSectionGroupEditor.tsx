import { Button, Input } from '@set-solutions-vof/design-system'
import { translations } from '@/lib/translations'
import type { TemplateSectionGroupEditorProps } from '@/typing/templateView'
import { TemplateIcon } from './icons/TemplateIcon'

export function TemplateSectionGroupEditor({
  collapsed,
  group,
  readonly,
  onAddRow,
  onRemoveGroup,
  onRemoveRow,
  onToggleGroup,
  onUpdateGroupLabel,
  onUpdateRow,
}: TemplateSectionGroupEditorProps) {
  return (
    <div className="flex flex-col [gap:var(--fr-space-3)] [padding:var(--fr-space-4)] [background:var(--fr-surface-sunken)] [border:var(--fr-border-width-sm)_solid_var(--fr-border)] [border-radius:var(--fr-radius-lg)]">
      <div className="flex items-end [gap:var(--fr-space-3)]">
        <Input
          inputSize="sm"
          value={group.label}
          disabled={readonly}
          label={translations.template.review.group_header_label}
          fieldClassName="flex-1"
          onChange={(event) => onUpdateGroupLabel(group.id, event.target.value)}
        />
        {!readonly && (
          <Button
            size="sm"
            variant="ghost"
            className="[color:var(--fr-text-tertiary)] hover:[color:var(--fr-destructive)] focus-visible:[color:var(--fr-destructive)]"
            aria-label={`${translations.template.review.remove_group_label}: ${group.label}`}
            leadingIcon={
              <TemplateIcon
                name="trash"
                className="block [width:var(--fr-space-4)] [height:var(--fr-space-4)] [stroke-width:1.6]"
              />
            }
            onClick={() => onRemoveGroup(group.id)}
          >
            {translations.template.review.remove_group_label}
          </Button>
        )}
      </div>
      {!readonly && (
        <button
          type="button"
          className="self-start [padding:var(--fr-space-0)] [color:var(--fr-text-tertiary)] [font:inherit] [font-size:var(--fr-text-xs)] [font-weight:var(--fr-weight-medium)] [line-height:var(--fr-leading-snug)] cursor-pointer bg-transparent border-0 hover:[color:var(--fr-text-primary)] hover:outline-none focus-visible:[color:var(--fr-text-primary)] focus-visible:outline-none"
          onClick={() => onToggleGroup(group.id)}
        >
          {collapsed
            ? translations.template.review.expand_group
            : translations.template.review.collapse_group}
        </button>
      )}
      {!collapsed && (
        <>
          <div className="flex flex-col [gap:var(--fr-space-2)]">
            {group.fields.map((field, fieldIndex) => (
              <div
                key={`${group.id}-${fieldIndex}`}
                className="flex items-center [gap:var(--fr-space-3)] [padding:var(--fr-space-2)_var(--fr-space-3)] [background:var(--fr-surface)] [border:var(--fr-border-width-sm)_solid_var(--fr-border)] [border-radius:var(--fr-radius-md)] [box-shadow:var(--fr-shadow-sm)]"
              >
                <TemplateIcon
                  name="grip"
                  className="shrink-0 [width:var(--fr-space-4)] [height:var(--fr-space-4)] [color:var(--fr-text-tertiary)]"
                />
                <Input
                  inputSize="sm"
                  value={field}
                  disabled={readonly}
                  aria-label={`${translations.template.review.field_input_label} ${fieldIndex + 1}`}
                  fieldClassName="flex-1"
                  onChange={(event) =>
                    onUpdateRow(group.id, fieldIndex, event.target.value)
                  }
                />
                {!readonly && (
                  <button
                    type="button"
                    className="inline-flex items-center justify-center [width:var(--fr-control-height-sm)] [height:var(--fr-control-height-sm)] shrink-0 [padding:var(--fr-space-0)] [color:var(--fr-text-tertiary)] cursor-pointer bg-transparent border-0 [border-radius:var(--fr-radius-md)] hover:[color:var(--fr-destructive)] hover:[background:var(--fr-destructive-subtle)] hover:outline-none focus-visible:[color:var(--fr-destructive)] focus-visible:[background:var(--fr-destructive-subtle)] focus-visible:outline-none"
                    aria-label={`${translations.template.review.remove_field_label}: ${field}`}
                    onClick={() => onRemoveRow(group.id, fieldIndex)}
                  >
                    <TemplateIcon
                      name="x"
                      className="block [width:var(--fr-space-4)] [height:var(--fr-space-4)] [stroke-width:1.6]"
                    />
                  </button>
                )}
              </div>
            ))}
          </div>
          {!readonly && (
            <button
              type="button"
              className="flex [width:100%] items-center justify-center [gap:var(--fr-space-2)] [padding:var(--fr-space-3)] [color:var(--fr-text-tertiary)] [font:inherit] [font-size:var(--fr-text-sm)] [font-weight:var(--fr-weight-medium)] [line-height:var(--fr-leading-snug)] cursor-pointer bg-transparent [border:var(--fr-border-width-sm)_dashed_var(--fr-border-strong)] [border-radius:var(--fr-radius-md)] hover:[color:var(--fr-text-primary)] hover:[border-color:var(--fr-border-focus)] hover:outline-none focus-visible:[color:var(--fr-text-primary)] focus-visible:[border-color:var(--fr-border-focus)] focus-visible:outline-none"
              onClick={() => onAddRow(group.id)}
            >
              <TemplateIcon
                name="plus"
                className="block [width:var(--fr-space-4)] [height:var(--fr-space-4)] [stroke-width:1.6]"
              />
              {translations.template.review.add_field_label}
            </button>
          )}
        </>
      )}
    </div>
  )
}

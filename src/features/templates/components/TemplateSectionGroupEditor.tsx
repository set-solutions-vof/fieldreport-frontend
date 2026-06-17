import { Button, Card, Input } from '@set-solutions-vof/design-system'
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
    <div className="flex flex-col [gap:var(--fr-space-3)]">
      <div className="flex items-end [gap:var(--fr-space-2)]">
        <Input
          inputSize="sm"
          value={group.label}
          disabled={readonly}
          label="Groepkop"
          fieldClassName="flex-1"
          onChange={(event) => onUpdateGroupLabel(group.id, event.target.value)}
        />
        {!readonly && (
          <Button
            size="sm"
            variant="ghost"
            className="[width:var(--fr-control-height-sm)] [gap:var(--fr-space-0)] [padding:var(--fr-space-0)]"
            aria-label={`Groep verwijderen: ${group.label}`}
            leadingIcon={
              <TemplateIcon
                name="trash"
                className="block [width:var(--fr-space-4)] [height:var(--fr-space-4)] [stroke-width:1.6]"
              />
            }
            onClick={() => onRemoveGroup(group.id)}
          >
            Groep verwijderen
          </Button>
        )}
      </div>
      {!readonly && (
        <button
          type="button"
          className="self-start [padding:var(--fr-space-0)] [color:var(--fr-text-tertiary)] [font:inherit] [font-size:var(--fr-text-xs)] [font-weight:var(--fr-weight-medium)] [line-height:var(--fr-leading-snug)] cursor-pointer bg-transparent border-0 hover:[color:var(--fr-text-primary)] hover:outline-none focus-visible:[color:var(--fr-text-primary)] focus-visible:outline-none"
          onClick={() => onToggleGroup(group.id)}
        >
          {collapsed ? 'Uitklappen ↓' : 'Inklappen ↑'}
        </button>
      )}
      {!collapsed && (
        <>
          <div className="flex flex-col [gap:var(--fr-space-2)]">
            {group.fields.map((field, fieldIndex) => (
              <Card
                key={`${group.id}-${fieldIndex}`}
                padding="sm"
                className="flex items-center [gap:var(--fr-space-3)] [box-shadow:var(--fr-shadow-sm)]"
              >
                <TemplateIcon
                  name="grip"
                  className="shrink-0 [width:var(--fr-space-4)] [height:var(--fr-space-4)] [color:var(--fr-text-tertiary)]"
                />
                <Input
                  inputSize="sm"
                  value={field}
                  disabled={readonly}
                  aria-label={`Rij ${fieldIndex + 1}`}
                  fieldClassName="flex-1"
                  onChange={(event) =>
                    onUpdateRow(group.id, fieldIndex, event.target.value)
                  }
                />
                {!readonly && (
                  <button
                    type="button"
                    className="inline-flex items-center justify-center [width:var(--fr-control-height-sm)] [height:var(--fr-control-height-sm)] shrink-0 [padding:var(--fr-space-0)] [color:var(--fr-text-tertiary)] cursor-pointer bg-transparent border-0 [border-radius:var(--fr-radius-md)] hover:[color:var(--fr-destructive)] hover:[background:var(--fr-destructive-subtle)] hover:outline-none focus-visible:[color:var(--fr-destructive)] focus-visible:[background:var(--fr-destructive-subtle)] focus-visible:outline-none"
                    aria-label={`Rij verwijderen: ${field}`}
                    onClick={() => onRemoveRow(group.id, fieldIndex)}
                  >
                    <TemplateIcon
                      name="x"
                      className="block [width:var(--fr-space-4)] [height:var(--fr-space-4)] [stroke-width:1.6]"
                    />
                  </button>
                )}
              </Card>
            ))}
          </div>
          {!readonly && (
            <button
              type="button"
              className="flex [width:100%] items-center justify-center [gap:var(--fr-space-2)] [padding:var(--fr-space-4)] [color:var(--fr-text-tertiary)] [font:inherit] [font-size:var(--fr-text-sm)] [font-weight:var(--fr-weight-medium)] [line-height:var(--fr-leading-snug)] cursor-pointer bg-transparent [border:var(--fr-border-width-sm)_dashed_var(--fr-border)] [border-radius:var(--fr-radius-lg)] hover:[color:var(--fr-text-primary)] hover:[border-color:var(--fr-border-strong)] hover:outline-none focus-visible:[color:var(--fr-text-primary)] focus-visible:[border-color:var(--fr-border-strong)] focus-visible:outline-none"
              onClick={() => onAddRow(group.id)}
            >
              <TemplateIcon
                name="plus"
                className="block [width:var(--fr-space-4)] [height:var(--fr-space-4)] [stroke-width:1.6]"
              />
              Veld toevoegen
            </button>
          )}
        </>
      )}
    </div>
  )
}

import { Button, Input } from '@/design-system'
import type { TemplateSectionGroupEditorProps } from '@/types/templateView'
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
    <div className="fr-template-section-group">
      <div className="fr-template-section-group__header">
        <Input
          inputSize="sm"
          value={group.label}
          disabled={readonly}
          label="Groepkop"
          fieldClassName="fr-template-section-group__label"
          onChange={(event) => onUpdateGroupLabel(group.id, event.target.value)}
        />
        {!readonly && (
          <Button
            size="sm"
            variant="ghost"
            className="fr-template-section-card__icon-button"
            aria-label={`Groep verwijderen: ${group.label}`}
            leadingIcon={
              <TemplateIcon
                name="trash"
                className="fr-template-section-card__button-icon"
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
          className="fr-template-section-group__toggle"
          onClick={() => onToggleGroup(group.id)}
        >
          {collapsed ? 'Uitklappen ↓' : 'Inklappen ↑'}
        </button>
      )}
      {!collapsed && (
        <>
          <div className="fr-template-section-group__rows">
            {group.fields.map((field, fieldIndex) => (
              <div
                className="fr-template-section-group__row"
                key={`${group.id}-${fieldIndex}`}
              >
                <TemplateIcon
                  name="grip"
                  className="fr-template-section-group__grip"
                />
                <Input
                  inputSize="sm"
                  value={field}
                  disabled={readonly}
                  aria-label={`Rij ${fieldIndex + 1}`}
                  fieldClassName="fr-template-section-group__field"
                  onChange={(event) =>
                    onUpdateRow(group.id, fieldIndex, event.target.value)
                  }
                />
                {!readonly && (
                  <button
                    type="button"
                    className="fr-template-section-group__remove-row"
                    aria-label={`Rij verwijderen: ${field}`}
                    onClick={() => onRemoveRow(group.id, fieldIndex)}
                  >
                    <TemplateIcon
                      name="x"
                      className="fr-template-field-chip__icon"
                    />
                  </button>
                )}
              </div>
            ))}
          </div>
          {!readonly && (
            <Button
              size="sm"
              variant="secondary"
              leadingIcon={
                <TemplateIcon
                  name="plus"
                  className="fr-template-section-card__button-icon"
                />
              }
              onClick={() => onAddRow(group.id)}
            >
              Rij toevoegen
            </Button>
          )}
        </>
      )}
    </div>
  )
}

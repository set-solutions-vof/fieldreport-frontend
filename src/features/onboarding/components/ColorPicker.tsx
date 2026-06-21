import type { ChangeEvent } from 'react'
import { Input } from '@set-solutions-vof/design-system'
import { translations } from '@/lib/translations'
import type { ColorPickerProps } from '@/typing/onboardingView'
import { OnboardingIcon } from './icons/OnboardingIcon'

export function ColorPicker({
  value,
  errorMessage,
  onChange,
}: ColorPickerProps) {
  function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
    onChange(event.currentTarget.value)
  }

  return (
    <div className="flex flex-col [gap:var(--fr-space-2)] [&>strong]:[font-size:var(--fr-text-sm)] [&>strong]:[font-weight:var(--fr-weight-semibold)] [&>strong]:[color:var(--fr-text-primary)] [&>span]:[font-size:var(--fr-text-sm)] [&>span]:[line-height:var(--fr-leading-snug)] [&>span]:[color:var(--fr-text-secondary)]">
      <strong>
        {translations.onboarding.company_profile.primary_color_label}
      </strong>
      <div className="flex items-start [gap:var(--fr-space-3)]">
        <div className="flex flex-wrap [gap:var(--fr-space-2)]">
          {presetColors.map((presetColor) => (
            <button
              type="button"
              className={[
                'inline-flex items-center justify-center [width:var(--fr-space-7)] [height:var(--fr-space-7)] [padding:var(--fr-space-0)] [color:var(--fr-text-on-accent)] cursor-pointer [border:var(--fr-border-width-sm)_solid_var(--fr-border)] [border-radius:var(--fr-radius-lg)] focus-visible:outline-none focus-visible:[box-shadow:var(--fr-shadow-focus)]',
                presetColor.toLowerCase() === value.toLowerCase() &&
                  'outline-none [box-shadow:var(--fr-shadow-focus)]',
              ]
                .filter(Boolean)
                .join(' ')}
              key={presetColor}
              style={{ backgroundColor: presetColor }}
              aria-label={translations.onboarding.company_profile.primary_color_aria.replace(
                '{{color}}',
                presetColor,
              )}
              onClick={() => onChange(presetColor)}
            >
              {presetColor.toLowerCase() === value.toLowerCase() && (
                <OnboardingIcon
                  name="check"
                  className="[width:var(--fr-space-4)] [height:var(--fr-space-4)] [stroke-width:2.25] block [width:var(--fr-space-4)] [height:var(--fr-space-4)] shrink-0 [width:var(--fr-space-5)] [height:var(--fr-space-5)]"
                />
              )}
            </button>
          ))}
        </div>
        <div className="relative shrink-0 [width:var(--fr-space-13)]">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute [left:var(--fr-space-3)] [top:calc(var(--fr-space-8)_/_2)] [z-index:1] [width:var(--fr-space-4)] [height:var(--fr-space-4)] [border-radius:var(--fr-radius-md)] [transform:translateY(-50%)]"
            style={{ backgroundColor: value }}
          />
          <Input
            value={value.toUpperCase()}
            error={errorMessage}
            onChange={handleInputChange}
            fieldClassName="[width:100%]"
            style={{
              minHeight: 'var(--fr-space-8)',
              paddingLeft:
                'calc(var(--fr-space-3) + var(--fr-space-4) + var(--fr-space-2))',
              fontWeight: 'var(--fr-weight-semibold)',
            }}
          />
        </div>
      </div>
      <span>
        {translations.onboarding.company_profile.primary_color_helper}
      </span>
    </div>
  )
}

const presetColors = [
  '#406bce',
  '#3f75dc',
  '#428c75',
  '#438f55',
  '#7c3aed',
  '#c8683b',
  '#b8322d',
  '#111827',
]

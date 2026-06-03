import type { ChangeEvent } from 'react'
import { Input } from '@/design-system'
import { translations } from '@/lib/translations'
import type { ColorPickerProps } from '@/types/onboardingView'
import { OnboardingIcon } from './icons/OnboardingIcon'
import './ColorPicker.css'

export function ColorPicker({
  value,
  errorMessage,
  onChange,
}: ColorPickerProps) {
  function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
    onChange(event.currentTarget.value)
  }

  return (
    <div className="fr-onboarding-color-picker">
      <strong>
        {translations.onboarding.company_profile.primary_color_label}
      </strong>
      <div className="fr-onboarding-color-picker__row">
        <div className="fr-onboarding-color-picker__swatches">
          {presetColors.map((presetColor) => (
            <button
              type="button"
              className={[
                'fr-onboarding-color-picker__swatch',
                presetColor.toLowerCase() === value.toLowerCase() &&
                  'fr-onboarding-color-picker__swatch--selected',
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
                  className="fr-onboarding-color-picker__check fr-onboarding-icon"
                />
              )}
            </button>
          ))}
        </div>
        <Input
          value={value.toUpperCase()}
          error={errorMessage}
          onChange={handleInputChange}
          fieldClassName="fr-onboarding-color-picker__input"
        />
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

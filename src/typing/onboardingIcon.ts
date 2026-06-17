export type OnboardingIconName =
  | 'buildingProfile'
  | 'lock'
  | 'photo'
  | 'check'
  | 'chevronRight'
  | 'chevronLeft'
  | 'x'

export type OnboardingIconProps = {
  name: OnboardingIconName
  className?: string
}

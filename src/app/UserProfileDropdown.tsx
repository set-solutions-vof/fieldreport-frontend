import { useEffect, useRef, useState } from 'react'
import { getUserInitials } from '@/features/reports/lib/getUserInitials'
import { translations } from '@/lib/translations'
import { currentUserDisplayName, type CurrentUser } from '@/typing/auth'

type UserProfileDropdownProps = {
  currentUser: CurrentUser
  onOpenProfile: () => void
  onLogout: () => void
}

export function UserProfileDropdown({
  currentUser,
  onOpenProfile,
  onLogout,
}: UserProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const userInitials = getUserInitials(currentUserDisplayName(currentUser))

  useEffect(() => {
    function closeOnOutsideClick(event: MouseEvent): void {
      if (!dropdownRef.current!.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', closeOnOutsideClick)
    return () => document.removeEventListener('mousedown', closeOnOutsideClick)
  }, [])

  function handleOpenProfile(): void {
    setIsOpen(false)
    onOpenProfile()
  }

  function handleLogout(): void {
    setIsOpen(false)
    onLogout()
  }

  return (
    <div
      className="relative [padding:var(--fr-space-3)] [border-top:var(--fr-border-width-sm)_solid_var(--fr-border)]"
      ref={dropdownRef}
    >
      {isOpen && (
        <div
          className="absolute [right:var(--fr-space-3)] [bottom:calc(100%_+_var(--fr-space-2))] [left:var(--fr-space-3)] [z-index:1] flex flex-col [gap:var(--fr-space-1)] [padding:var(--fr-space-2)] [background:var(--fr-surface)] [border:var(--fr-border-width-sm)_solid_var(--fr-border)] [border-radius:var(--fr-radius-lg)]"
          role="menu"
        >
          <button
            className="flex [min-height:var(--fr-control-height-md)] items-center [padding:var(--fr-space-0)_var(--fr-space-2)] [font:inherit] [font-size:var(--fr-text-sm)] [font-weight:var(--fr-weight-medium)] [color:var(--fr-text-primary)] text-left cursor-pointer bg-transparent border-0 [border-radius:var(--fr-radius-lg)] hover:[background:var(--fr-surface-hover)] focus-visible:[background:var(--fr-surface-hover)] focus-visible:outline-none focus-visible:[box-shadow:var(--fr-shadow-focus)]"
            type="button"
            role="menuitem"
            onClick={handleOpenProfile}
          >
            {translations.profile.my_account}
          </button>
          <button
            className="flex [min-height:var(--fr-control-height-md)] items-center [padding:var(--fr-space-0)_var(--fr-space-2)] [font:inherit] [font-size:var(--fr-text-sm)] [font-weight:var(--fr-weight-medium)] [color:var(--fr-text-primary)] text-left cursor-pointer bg-transparent border-0 [border-radius:var(--fr-radius-lg)] hover:[background:var(--fr-surface-hover)] focus-visible:[background:var(--fr-surface-hover)] focus-visible:outline-none focus-visible:[box-shadow:var(--fr-shadow-focus)]"
            type="button"
            role="menuitem"
            onClick={handleLogout}
          >
            {translations.auth.logout_button}
          </button>
        </div>
      )}
      <button
        className="flex w-full [min-height:var(--fr-control-height-lg)] items-center [gap:var(--fr-space-3)] [padding:var(--fr-space-1)_var(--fr-space-2)] [font:inherit] [color:var(--fr-text-primary)] cursor-pointer bg-transparent border-0 [border-radius:var(--fr-radius-lg)] [transition:var(--fr-transition-fast)] hover:[background:var(--fr-surface-hover)] focus-visible:[background:var(--fr-surface-hover)] focus-visible:outline-none focus-visible:[box-shadow:var(--fr-shadow-focus)] [&_strong]:[min-width:var(--fr-space-0)] [&_strong]:flex-1 [&_strong]:overflow-hidden [&_strong]:[font-size:var(--fr-text-base)] [&_strong]:[font-weight:var(--fr-weight-semibold)] [&_strong]:[line-height:var(--fr-leading-snug)] [&_strong]:text-left [&_strong]:text-ellipsis [&_strong]:whitespace-nowrap"
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="inline-flex items-center justify-center [min-width:var(--fr-space-4)] [height:var(--fr-space-4)] [border-radius:var(--fr-radius-full)] [font-size:var(--fr-text-xs)] [font-weight:var(--fr-weight-semibold)] [width:var(--fr-space-8)] [height:var(--fr-space-8)] [color:var(--fr-text-on-accent)] [background:var(--fr-accent)]">
          {userInitials}
        </span>
        <strong>{currentUserDisplayName(currentUser)}</strong>
        <span
          className={[
            '[width:var(--fr-space-2)] [height:var(--fr-space-2)] flex-none [border-right:var(--fr-border-width-sm)_solid_currentColor] [border-bottom:var(--fr-border-width-sm)_solid_currentColor] [color:var(--fr-text-secondary)] [transform:rotate(45deg)] [transition:var(--fr-transition-fast)]',
            isOpen && '[transform:rotate(225deg)]',
          ]
            .filter(Boolean)
            .join(' ')}
          aria-hidden="true"
        />
      </button>
    </div>
  )
}

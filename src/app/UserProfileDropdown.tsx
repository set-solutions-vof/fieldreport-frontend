import { useEffect, useRef, useState } from 'react'
import { getUserInitials } from '@/features/reports/lib/getUserInitials'
import type { CurrentUser } from '@/types/auth'
import './UserProfileDropdown.css'

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
  const userInitials = getUserInitials(currentUser.name)

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
    <div className="fr-user-profile-dropdown" ref={dropdownRef}>
      {isOpen && (
        <div className="fr-user-profile-dropdown__menu" role="menu">
          <button
            className="fr-user-profile-dropdown__menu-item"
            type="button"
            role="menuitem"
            onClick={handleOpenProfile}
          >
            Mijn account
          </button>
          <button
            className="fr-user-profile-dropdown__menu-item"
            type="button"
            role="menuitem"
            onClick={handleLogout}
          >
            Uitloggen
          </button>
        </div>
      )}
      <button
        className="fr-user-profile-dropdown__trigger"
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="fr-dashboard-avatar">{userInitials}</span>
        <strong>{currentUser.name}</strong>
        <span
          className={[
            'fr-user-profile-dropdown__chevron',
            isOpen && 'fr-user-profile-dropdown__chevron--open',
          ]
            .filter(Boolean)
            .join(' ')}
          aria-hidden="true"
        />
      </button>
    </div>
  )
}

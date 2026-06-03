import { useEffect, useRef, useState } from 'react'
import {
  updateOnboardingCompany,
  uploadOnboardingCompanyLogo,
} from '@/lib/api/onboarding'
import { AuthenticationExpiredError } from '@/lib/api/authenticatedFetch'
import { translations } from '@/lib/translations'
import type { UseCompanyBrandingParameters } from '@/types/onboardingView'

export function useCompanyBranding({
  initialCompany,
  onAuthenticationExpired,
}: UseCompanyBrandingParameters) {
  const [company, setCompany] = useState(initialCompany)
  const [primaryColor, setPrimaryColor] = useState(
    initialCompany.primary_color ?? '#406bce',
  )
  const [logoUploadError, setLogoUploadError] = useState<string | null>(null)
  const [colorSaveError, setColorSaveError] = useState<string | null>(null)
  const [isUploadingLogo, setIsUploadingLogo] = useState(false)
  const hasSkippedInitialColorSave = useRef(false)

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--fr-onboarding-company-color',
      primaryColor,
    )
  }, [primaryColor])

  useEffect(() => {
    if (!hasSkippedInitialColorSave.current) {
      hasSkippedInitialColorSave.current = true
      return
    }

    const colorSaveTimer = window.setTimeout(() => {
      setColorSaveError(null)
      void updateOnboardingCompany({ primary_color: primaryColor })
        .then((updatedCompany) => setCompany(updatedCompany))
        .catch((error: unknown) => {
          if (error instanceof AuthenticationExpiredError) {
            onAuthenticationExpired()
            return
          }

          setColorSaveError(
            translations.onboarding.company_profile.color_save_failed,
          )
        })
    }, 500)

    return () => window.clearTimeout(colorSaveTimer)
  }, [onAuthenticationExpired, primaryColor])

  async function uploadLogo(file: File): Promise<void> {
    setIsUploadingLogo(true)
    setLogoUploadError(null)

    try {
      const updatedCompany = await uploadOnboardingCompanyLogo(file)
      setCompany(updatedCompany)
    } catch (error) {
      if (error instanceof AuthenticationExpiredError) {
        onAuthenticationExpired()
        return
      }

      setLogoUploadError(
        translations.onboarding.company_profile.logo_save_failed,
      )
    } finally {
      setIsUploadingLogo(false)
    }
  }

  return {
    company,
    primaryColor,
    logoUrl: company.logo_url,
    logoUploadError,
    colorSaveError,
    isUploadingLogo,
    setPrimaryColor,
    uploadLogo,
  }
}

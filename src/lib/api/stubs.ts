// STUB RESPONSES
// All stub data lives here. To swap in real API calls, set VITE_USE_STUBS=false.
// None of this file is imported at runtime when stubs are disabled.

import type { LoginResponse, Report, User } from '@/types'

// Simulates network latency for realism
function delay(ms = 400): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function stubLogin(
  email: string,
  password: string,
): Promise<LoginResponse> {
  await delay()
  if (!email.includes('@') || !password) {
    throw new Error('Ongeldige inloggegevens')
  }
  return {
    access_token: 'stub-access-token',
    refresh_token: 'stub-refresh-token',
    token_type: 'bearer',
  }
}

export async function stubGetMe(): Promise<User> {
  await delay(200)
  return {
    id: 'user-1',
    role: 'inspector',
    company_id: 'company-1',
  }
}

const STUB_REPORTS: Report[] = [
  {
    id: 'report-1',
    status: 'draft',
    client_name: 'Woningcorporatie De Linde',
    address: 'Kerkstraat 14, 3512 AB Utrecht',
    inspection_date: '2026-05-05',
    inspector_name: 'Jan de Vries',
    sections: [
      {
        id: 'sec-1a',
        section_key: 'bevindingen',
        label: 'Bevindingen',
        ai_draft:
          'Tijdens de inspectie zijn er diverse vochtplekken aangetroffen op de noordgevel. De kozijnen vertonen houtrot op meerdere plaatsen. De dakgoot aan de achterzijde is verstopt met bladeren en vertoont lekkage.',
        field_expert_content:
          'Tijdens de inspectie zijn er diverse vochtplekken aangetroffen op de noordgevel. De kozijnen vertonen houtrot op meerdere plaatsen. De dakgoot aan de achterzijde is verstopt met bladeren en vertoont lekkage.',
        is_approved: false,
        sources: [
          {
            type: 'audio',
            timestamp_start: 0,
            timestamp_end: 45,
            content_summary:
              'Inspector beschrijft vochtplekken op de noordgevel, zichtbaar op circa 1,5 meter hoogte.',
          },
          {
            type: 'image',
            capture_time: '2026-05-05T09:12:00Z',
            content_summary:
              'Foto van houtrot aan kozijn voordeur, linkerzijde.',
          },
        ],
      },
      {
        id: 'sec-1b',
        section_key: 'conclusie',
        label: 'Conclusie',
        ai_draft:
          'Het pand verkeert in matige staat van onderhoud. Directe actie is vereist voor de lekkende dakgoot en het aangetaste houtwerk om verdere schade te voorkomen.',
        field_expert_content:
          'Het pand verkeert in matige staat van onderhoud. Directe actie is vereist voor de lekkende dakgoot en het aangetaste houtwerk om verdere schade te voorkomen.',
        is_approved: false,
        sources: [
          {
            type: 'audio',
            timestamp_start: 120,
            timestamp_end: 155,
            content_summary:
              'Inspector geeft samenvatting: dakgoot prioriteit 1, kozijnen prioriteit 2.',
          },
        ],
      },
      {
        id: 'sec-1c',
        section_key: 'aanbevelingen',
        label: 'Aanbevelingen',
        ai_draft:
          'Aanbevolen wordt om binnen 3 maanden de dakgoot te reinigen en te repareren. De kozijnen dienen binnen 6 maanden vervangen of uitgebreid hersteld te worden. Een vervolgcontrole is gewenst na afronding van de werkzaamheden.',
        field_expert_content:
          'Aanbevolen wordt om binnen 3 maanden de dakgoot te reinigen en te repareren. De kozijnen dienen binnen 6 maanden vervangen of uitgebreid hersteld te worden. Een vervolgcontrole is gewenst na afronding van de werkzaamheden.',
        is_approved: false,
        sources: [
          {
            type: 'image',
            capture_time: '2026-05-05T09:35:00Z',
            content_summary:
              'Overzichtsfoto dakgoot achterzijde met zichtbaar bladafval en lekkage.',
          },
          {
            type: 'audio',
            timestamp_start: 200,
            timestamp_end: 240,
            content_summary:
              'Inspector dicteert tijdsplan voor herstelwerkzaamheden.',
          },
        ],
      },
    ],
  },
  {
    id: 'report-2',
    status: 'approved',
    client_name: 'Particulier: M. Bakker',
    address: 'Hooiweg 7, 9765 TA Paterswolde',
    inspection_date: '2026-04-28',
    inspector_name: 'Jan de Vries',
    sections: [
      {
        id: 'sec-2a',
        section_key: 'bevindingen',
        label: 'Bevindingen',
        ai_draft:
          'Het dak is in goede staat. Geen noemenswaardige gebreken aangetroffen.',
        field_expert_content:
          'Het dak is in goede staat. Geen noemenswaardige gebreken aangetroffen. Kleine scheur in de nok is opgemerkt en gedocumenteerd.',
        is_approved: true,
        sources: [
          {
            type: 'image',
            capture_time: '2026-04-28T10:00:00Z',
            content_summary:
              'Overzichtsfoto van het dak, geen zichtbare beschadigingen.',
          },
        ],
      },
      {
        id: 'sec-2b',
        section_key: 'conclusie',
        label: 'Conclusie',
        ai_draft:
          'Pand is in goede staat. Geen acute herstelwerkzaamheden nodig.',
        field_expert_content:
          'Pand is in goede staat. Geen acute herstelwerkzaamheden nodig.',
        is_approved: true,
        sources: [],
      },
    ],
  },
  {
    id: 'report-3',
    status: 'generating',
    client_name: 'Vastgoed Partners BV',
    address: 'Industrieweg 88, 5627 BS Eindhoven',
    inspection_date: '2026-05-07',
    inspector_name: 'Jan de Vries',
    sections: [],
  },
  {
    id: 'report-4',
    status: 'failed',
    client_name: 'Stichting Woonkracht',
    address: 'Parallelweg 3, 2914 LN Nieuwerkerk',
    inspection_date: '2026-05-06',
    inspector_name: 'Jan de Vries',
    sections: [],
  },
]

export async function stubGetReports(): Promise<Report[]> {
  await delay()
  return STUB_REPORTS
}

export async function stubGetReport(id: string): Promise<Report> {
  await delay()
  const report = STUB_REPORTS.find((r) => r.id === id)
  if (!report) throw new Error(`Rapport ${id} niet gevonden`)
  return structuredClone(report)
}

export async function stubPatchSection(
  _reportId: string,
  sectionId: string,
  payload: { field_expert_content?: string; is_approved?: boolean },
): Promise<void> {
  await delay(300)
  for (const report of STUB_REPORTS) {
    const section = report.sections.find((s) => s.id === sectionId)
    if (section) {
      if (payload.field_expert_content !== undefined) {
        section.field_expert_content = payload.field_expert_content
      }
      if (payload.is_approved !== undefined) {
        section.is_approved = payload.is_approved
      }
      // Update report status when all sections are approved
      if (
        report.sections.length > 0 &&
        report.sections.every((s) => s.is_approved)
      ) {
        report.status = 'approved'
      } else if (report.status === 'approved') {
        report.status = 'draft'
      }
      return
    }
  }
}

export async function stubDownloadPdf(reportId: string): Promise<Blob> {
  await delay(1500)
  // Returns a minimal valid PDF blob for testing the download flow
  const pdfContent = `%PDF-1.4\n% stub pdf for report ${reportId}\n1 0 obj<</Type /Catalog /Pages 2 0 R>>endobj 2 0 obj<</Type /Pages /Kids [3 0 R] /Count 1>>endobj 3 0 obj<</Type /Page /MediaBox [0 0 612 792] /Parent 2 0 R>>endobj\nxref\n0 4\n0000000000 65535 f\n0000000009 00000 n\n0000000058 00000 n\n0000000115 00000 n\ntrailer<</Size 4 /Root 1 0 R>>\nstartxref\n190\n%%EOF`
  return new Blob([pdfContent], { type: 'application/pdf' })
}

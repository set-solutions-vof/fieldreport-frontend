export const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'

// Set VITE_USE_STUBS=false to switch to real API calls.
// Defaults to true so the UI runs without a backend.
export const useStubs = import.meta.env.VITE_USE_STUBS !== 'false'

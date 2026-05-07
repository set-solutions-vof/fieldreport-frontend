type InputProps = {
  label: string
  error?: string
  hint?: string
} & React.InputHTMLAttributes<HTMLInputElement>

export function Input({
  label,
  error,
  hint,
  id,
  className = '',
  ...rest
}: InputProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-')
  const errorId = `${inputId}-error`
  const hintId = `${inputId}-hint`

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={inputId}
        aria-describedby={
          [error ? errorId : null, hint ? hintId : null]
            .filter(Boolean)
            .join(' ') || undefined
        }
        aria-invalid={error ? true : undefined}
        className={`rounded-md border px-3 py-2 text-sm text-gray-900 shadow-sm outline-none transition-colors placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${error ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'} disabled:bg-gray-100 disabled:cursor-not-allowed ${className}`}
        {...rest}
      />
      {hint && !error && (
        <p id={hintId} className="text-xs text-gray-500">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}

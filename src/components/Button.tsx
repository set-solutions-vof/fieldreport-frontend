import { Spinner } from '@/components/Spinner'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'

type ButtonProps = {
  variant?: ButtonVariant
  loading?: boolean
  children: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300 focus-visible:ring-blue-500',
  secondary:
    'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 disabled:opacity-50 focus-visible:ring-gray-400',
  ghost:
    'bg-transparent text-gray-700 hover:bg-gray-100 disabled:opacity-50 focus-visible:ring-gray-400',
  danger:
    'bg-red-600 text-white hover:bg-red-700 disabled:bg-red-300 focus-visible:ring-red-500',
}

export function Button({
  variant = 'primary',
  loading = false,
  disabled,
  children,
  className = '',
  ...rest
}: ButtonProps) {
  return (
    <button
      disabled={disabled ?? loading}
      className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {loading && <Spinner size="sm" />}
      {children}
    </button>
  )
}

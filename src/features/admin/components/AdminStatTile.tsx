import type { AdminStatTileProps } from '@/typing/adminHomeView'

export function AdminStatTile({
  title,
  value,
  hint,
  children,
}: AdminStatTileProps) {
  return (
    <div
      className="flex flex-col [padding:var(--fr-space-5)] [background:var(--fr-surface)] [border:var(--fr-border-width-sm)_solid_var(--fr-border)] [border-radius:var(--fr-radius-md)]"
      aria-label={hint}
    >
      <h2 className="[margin:var(--fr-space-0)] [font-size:var(--fr-text-sm)] [font-weight:var(--fr-weight-semibold)] [line-height:var(--fr-leading-snug)] [color:var(--fr-text-primary)]">
        {title}
      </h2>
      <strong className="tabular-nums [margin-top:var(--fr-space-2)] [font-size:var(--fr-text-3xl)] [font-weight:var(--fr-weight-bold)] [line-height:var(--fr-leading-tight)] [color:var(--fr-text-primary)]">
        {value}
      </strong>
      {children}
    </div>
  )
}
